const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

const oracledb = require('oracledb');
const dbConfig = {
  user: 'khk1',
  password: 'kh1234',
  connectString: 'localhost:1521/XE',
};

let connection;

async function createWeatherTable() {
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT table_name FROM all_tables WHERE table_name = 'WEATHER_DATA' AND owner = :owner`,
      { owner: 'khk1' }
    );

    if (result.rows.length === 0) {
      await connection.execute(`
          CREATE TABLE WEATHER_DATA (
            ID NUMBER GENERATED ALWAYS AS IDENTITY,
            CITY_NAME VARCHAR2(255),
            TEMP NUMBER,
            RH NUMBER,
            DESCRIPTION VARCHAR2(255),
            PRIMARY KEY (ID)
          )
        `);

      console.log('WEATHER_DATA 테이블이 생성되었습니다.');
    } else {
      console.log(
        'WEATHER_DATA 테이블이 이미 존재합니다. 테이블을 생성하지 않습니다.'
      );
    }
  } catch (error) {
    console.error('테이블 생성 중 오류 발생:', error);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('데이터베이스 연결을 닫는 도중 오류 발생:', err);
      }
    }
  }
}

createWeatherTable();

app.post('/api/saveWeatherData', async (req, res) => {
  const { city_name, temp, rh, description } = req.body;
  console.log('데이터확인:', { city_name, temp, rh, description });

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `INSERT INTO WEATHER_DATA (CITY_NAME, TEMP, RH, DESCRIPTION) VALUES (:city_name, :temp, :rh, :description)`,
      { city_name, temp, rh, description },
      { autoCommit: true }
    );
    await connection.commit();
    console.log('날씨 데이터가 데이터베이스에 저장되었습니다:', result);
    res.status(200).send('날씨 데이터가 데이터베이스에 저장되었습니다');
  } catch (error) {
    console.error(
      '날씨 데이터를 데이터베이스에 저장하는 도중 오류 발생:',
      error
    );
    res.status(500).send('내부 서버 오류');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('데이터베이스 연결을 닫는 도중 오류 발생:', err);
      }
    }
  }
});

app.listen(PORT, () => {
  console.log(`서버 포트 ${PORT} 실행 중`);
});