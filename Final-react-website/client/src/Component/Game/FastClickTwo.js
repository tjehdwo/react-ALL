// src/App.js

import React, { useState, useEffect } from 'react';

const App = () => {
  const [numbers, setNumbers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    fetchGame();
  }, []);

  const fetchGame = () => {
    const newNumbers = Array.from({ length: 50 }, (_, index) => index + 1).sort(
      () => Math.random() - 0.5
    );
    setNumbers(newNumbers);
    setScore(0);
    setGameOver(false);
  };

  const mouseClick = (number) => {
    if (!gameOver && number === score + 1) {
      setScore(score + 1);
      if (score + 1 === 20) {
        setGameOver(true);
      }
    }
  };

  return (
    <div className="App">
      <h1>1 to 50 게임</h1>
      {gameOver ? (
        <div>
          <p>게임 종료! 최종 점수: {score}</p>
          <button onClick={fetchGame}>게임 재시작</button>
        </div>
      ) : (
        <div>
          <p>현재 점수: {score}</p>
          <div className="numbers-container">
            {numbers.map((number) => (
              <div
                key={number}
                className="number"
                onClick={() => mouseClick(number)}
              >
                {number}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;