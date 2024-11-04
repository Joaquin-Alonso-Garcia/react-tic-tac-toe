import { useEffect, useState } from "react";
import Square from "./Square";
import EndGame from "./EndGame";

interface BoardProps {
  isXFirst: boolean;
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (nextSquares: (string | null)[]) => void;
  handleNextRound: () => void;
  handleQuit: () => void;
}

const Board: React.FC<BoardProps> = ({ isXFirst, xIsNext, squares, onPlay, handleQuit, handleNextRound }) => {
  const [isEndgame, setIsEndGame] = useState<boolean>(false);
  const [winnerMark, setWinnerMark] = useState<string | null>(null);
  const [isPlayerOneWins, setIsPlayerOneWins] = useState<boolean>(false);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  useEffect(() => {
    const result = calculateWinner(squares);

    if (result) {
      setWinnerMark(result.mark)
      setWinningLine(result.line)
      setIsEndGame(true);
      setIsPlayerOneWins(result.mark === 'X' ? isXFirst : !isXFirst);
    }
  }, [squares, isXFirst]);

  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares: (string | null)[] = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  return (
    <>
      <div className="grid board">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onSquareClick={() => handleClick(index)}
            isWinningSquare={winningLine?.includes(index) || false}
            winner={winnerMark}
          />
        ))}
      </div>

      {isEndgame && (
        <EndGame
          winner={winnerMark}
          playerWins={isPlayerOneWins}
          handleQuit={handleQuit}
          handleNextRound={handleNextRound}
        />
      )}
    </>
  )
};

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { mark: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

export default Board;