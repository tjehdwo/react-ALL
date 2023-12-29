// 백엔드 js를 실행하기 위한 파일을 생성해준 것이며 파일명은 굳이 server.js를 사용하지 않아도 됨
// (리액트처럼)함수를 사용하지 않음 (리액트처럼)컴포넌트 사용 x => 사용할 일이 없다는 의미

// oracledb를 연동하기위해 oracledb 요청하는 함수 작성
// 중간에 역할해주는 (jdbc와 같은 역할을 하는) express를 요청하는 함수 작성

// 만약에 추후 다른도메인에서 요청이 들어올 경우
const cors = require('cors');



const oracledb = require('oracledb');
const express = require('express');

const app = express();
const PORT = 5001;

// 모든 경로에서 백엔드 오는 요청을 사용할 수 있도록 허용
app.use(cors());

// db 연결 정보
const dbConfig = {
    user: 'khcafe',
    password: 'kh1234',
    connectString : 'localhost:1521/XE',
};

//oracle 연결하기 위한 connection 과 sql 쿼리 실행 함수
// sql 쿼리와 쿼리로 인해 발생한 변수,추가옵션을 지정해서 데이터베이스와 상호작용
// async를 이용해서 비동기 작업을 수행

async function runQuery(sql,binds = [], options = {}) {
    let connection;

    // try {} cath(err) {} finally{}
    // try 안에서 데이터베이스 연결을 실행하고,쿼리도 실행 만약에 오류가 발생하면 catch를 사용해서 콘솔에 에러를 출력할 수 있게 설정
    // finally 만약에 데이터베이스를 닫고 싶다면 연결을 닫을 수 있도록 설정

    try {
        // 
        connection = await oracledb.getConnection(dbConfig);

        // 
        const result = await connection.execute(sql,binds,options);
        
        //쿼리 실행 결과에서 행 정보를 모두 반환 하겠다 표기 
        return result.rows;
    } catch (err){
        console.error(err);
    } finally {
        if(connection){
            try{
                await connection.close();
            } catch (err) {
                close.error(err);
            }
        }
    }
}

app.get('/',(request, response) => {
    response.send('백엔드 연결 성공!');
});

// api 를 활용해서 db query에 작성한 내용 갖고오기
app.get('/api/todos',async (request,response) => {
    const todos = await runQuery('SELECT * FROM todos');
    response.json(todos);
});

// 우리가 연결한 PORT에 정상적으로 연결되었는지 확인하기 위한 console문 출력
app.listen(PORT, () => {
    console.log(`서버 시작 : http://localhost:${PORT}`);
});