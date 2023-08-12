import React, { createContext, useState } from "react";
import "./App.css";
import resetBtn from "./images/power-reset_1.svg";
export const modeContext = createContext(null);

function Square({ value, onSquareClick }) {
  return (
    <div className="square" onClick={onSquareClick}>
      {value}
    </div>
  );
}

function Status({ who, winner }) {
  if (winner) {
    return (
      <div className="status">
        The Player <span>{winner}</span> is the Winner{" "}
      </div>
    );
  } else {
    return (
      <div className="status">
        Next Player is <span>{!who ? "O" : "X"}</span>{" "}
      </div>
    );
  }
}

function ResetBtn({ Reset }) {
  return (
    <div className="reset" onClick={Reset}>
      <img src={resetBtn} alt="reset"></img>
    </div>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [who, setWho] = useState(true);
  const winner = isWinner(squares);

  function isWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
  function handleClick(i) {
    if (squares[i] || isWinner(squares)) return null;
    let nextSquares = squares.slice();
    if (who) {
      nextSquares[i] = "X";
      setWho(!who);
    } else {
      nextSquares[i] = "O";
      setWho(!who);
    }
    setSquares(nextSquares);
  }

  function reset() {
    const newSquares = Array(9).fill(null);
    setSquares(newSquares);
    setWho(true);
  }

  return (
    <section>
      <Status winner={winner} who={who} />
      <div className="board">
        <Square
          value={squares[0]}
          Who={who}
          onSquareClick={() => handleClick(0)}
        />
        <Square
          value={squares[1]}
          Who={who}
          onSquareClick={() => handleClick(1)}
        />
        <Square
          value={squares[2]}
          Who={who}
          onSquareClick={() => handleClick(2)}
        />
        <Square
          value={squares[3]}
          Who={who}
          onSquareClick={() => handleClick(3)}
        />
        <Square
          value={squares[4]}
          Who={who}
          onSquareClick={() => handleClick(4)}
        />
        <Square
          value={squares[5]}
          Who={who}
          onSquareClick={() => handleClick(5)}
        />
        <Square
          value={squares[6]}
          Who={who}
          onSquareClick={() => handleClick(6)}
        />
        <Square
          value={squares[7]}
          Who={who}
          onSquareClick={() => handleClick(7)}
        />
        <Square
          value={squares[8]}
          Who={who}
          onSquareClick={() => handleClick(8)}
        />
      </div>
      <ResetBtn Reset={reset} />
    </section>
  );
}
function App() {
  return <Board />;
}

export default App;
