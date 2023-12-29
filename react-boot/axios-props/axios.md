axios
javascript 나 react 에서 http 요청을 수행하기 위한 라이브러리

주로 웹서버와 통신, API 호출,데이터 가져오기 작업에 사용

사용법
npm install axios

yarn install axios
axios.get로 데이터를 가져오는데 성공한다면
then 을 사용해서 응답받을 데이터를 처리한다
응답을 받을때는 response로 서버에서 받은 응답을 표시
response가 실제로 요청에 관한 정보와 서버에서 실제로 반환된 데이터를 보여줌
.then(response => {setData(response.data);})

만약 데이터를 가져오는데 실패 catch문을 활용해서 에러를 표시
//에러를 표기할 때는 console.log 를 활용해서 개발자들 간에 보여질 수 있도록 표기 error는 변수명일 뿐
error가 아닌 err,aaa 이런 변수명으로 받고 싶다면 변수명을 변경해서 표기해도 좋음
.catch(error => {("",error)});