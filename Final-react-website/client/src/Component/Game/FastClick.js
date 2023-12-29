//FastClick.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const FastClick = () => {
  const [numbers, setNumbers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGamOver] = useState(false);

  useEffect(() => {
    fetchGame();
  }, []);
  //마우스 클릭 함수
  const mouseClick = (number) => {
    if (!gameOver && number === score + 1) {
      setScore(score + 1);
      if (score + 1 === 10) {
        setGamOver(true);
      }
    }
  };

  //게임 초기화
  const fetchGame = () => {
    //새로운 번호를 생성하는데 번호가 랜덤으로 자리에 들어갈 수 있도록 설정
    // Array.from({ length: 10 }, (_, index) => index + 1)
    // 길이가 10인 배열을 만들고 각 숫자가 0부터 시작하기 때문에
    // 1부터 시작할 수 있도록 + 1을 해준것

    //.sort(() => Math.random() - 0.5
    //sort는 정렬해주는 값 정렬을 할 때 랜덤으로 정렬할 수 있도록 Math.random()
    //을 이용해줌
    //sort 를 이용할 때 0 정렬 방향이 되기 때문에 0이 아니라 -0.5 를 해주면서
    //무작위로 정렬을 될 수 있도록 해주는 것

    const newNumbers = Array.from({ length: 10 }, (_, index) => index + 1).sort(
      () => Math.random() - 0.5
    );
    //게임 재시작할 경우 새로운 번호 생성 점수0으로 초기화 게임 오버를 아님으로 설정
    setNumbers(newNumbers);
    setScore(0);
    setGamOver(false);
  };
  return (
    <Container className="mt-5">
      <h1>1부터 10까지 숫자 맞추기</h1>
      {gameOver ? (
        <div>
          <Alert variant="success">
            <p className="lead">게임종료! 최종점수 : {score}</p>
            <Button variant="primary" size="lg" block onClick={fetchGame}>
              게임 재시작
            </Button>
          </Alert>
        </div>
      ) : (
        <div>
          <p className="lead text-center">현재 게임 점수 : {score}</p>
          <Row className="justify-content-center">
            {numbers.map((number) => (
              <Col key={number} className="mb-3">
                <Button
                  variant="light"
                  size="lg"
                  block
                  onClick={() => mouseClick(number)}
                >
                  {number}
                </Button>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
};

export default FastClick;