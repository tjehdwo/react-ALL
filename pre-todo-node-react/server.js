// react와 연결해줄 파일 생성
const express = require('express');
const oracledb = require('oracledb');

// 가지고온 express 활용하기 위한 app 생성
const app = express();
const PORT = 5007;

// 현재 도메인에서 포트번호를 5010만 사용하는 것이 아니라
// 리액트에서 가지고 온 포트번호도 사용할 것이기 때문에 cors를 사용
const cors = require('cors');

// 어떤 경로든 백엔드에 오는 요청을 사용할 수 있도록 허용
app.use(cors());

// oracle 연결정보
const dbConfig = {
    user : 'khcafe',
    password : 'kh1234',
    connectString : 'localhost:1521/XE'
}

// db에 연결을 도ㅗ아줄 express에서 json파일로 db를 보여주는 것을 허락해서 json 형식으로 보여줄수 있도록 설정

app.use(express.json());

async function runQuery(sql, binds = [], options = {}){
    // String connection = null;
    let connection;

    try{
    // 2줄 추가로 
    // 1. 데이터베이스 연결 가지고오기
        connection = await oracledb.getConnection(dbConfig);
    // 2. 가지고온 결과를 return을 활용해서 전달하기
        const result = await connection.execute(sql,binds,options);
        return result.rows;
    }catch (error) {
        console.error(error);
    }
}

// api endpoint 사용해서 backend 연결 설정
app.get('/',(request,response) => {
    response.send('백엔드에 오신걸 환영합니다.');
});

// 데이터베이스와 제대로 연결
app.get('/api/todos',async(request,response)=>{
    const todos = await runQuery('SELECT * FROM todos');
    response.json(todos);
})

// 서바가 제대로 실행되는지 확인하기 위해
app.listen(`서바가 시작되었스빈다. : http://localhost:${PORT}`);