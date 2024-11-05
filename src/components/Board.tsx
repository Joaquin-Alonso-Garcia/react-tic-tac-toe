import { useCallback, useEffect, useState } from "react";
import Square from "./Square";
import EndGame from "./EndGame";

interface BoardProps {
  isXFirst: boolean;
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (nextSquares: (string | null)[]) => void;
  handleNextRound: () => void;
  handleQuit: () => void;
  vsCpu: boolean;
  playerOneWins: number;
  playerTwoWins: number;
  ties: number;
  updateScore: (result: 'playerOne' | 'playerTwo' | 'tie') => void;
}

const Board: React.FC<BoardProps> = ({ isXFirst, xIsNext, squares, vsCpu, onPlay, handleQuit, handleNextRound, playerOneWins, playerTwoWins, ties, updateScore }) => {
  const [isEndgame, setIsEndGame] = useState<boolean>(false);
  const [winnerMark, setWinnerMark] = useState<string | null>(null);
  const [isPlayerOneWins, setIsPlayerOneWins] = useState<boolean>(false);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [isTie, setIsTie] = useState<boolean>(false);
  const [firstMove, setFirstMove] = useState<boolean>(false);

  const makeCpuMove = useCallback(() => {
    const emptySquares = squares
      .map((value, index) => (value === null ? index : null))
      .filter(index => index !== null) as number[];

    if (emptySquares.length > 0 && !isEndgame) {
      const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
      const nextSquares = squares.slice();
      nextSquares[randomIndex] = isXFirst ? 'O' : 'X';
      onPlay(nextSquares);
    }
  }, [squares, isXFirst, onPlay, isEndgame]);

  useEffect(() => {
    const result = calculateWinner(squares);

    if (result && !isEndgame) {
      setWinnerMark(result.mark)
      setWinningLine(result.line)
      setIsEndGame(true);
      setIsPlayerOneWins(result.mark === 'X' ? isXFirst : !isXFirst);

      if ((result.mark === 'X' && isXFirst) || (result.mark === 'O' && !isXFirst)) {
        updateScore('playerOne');
      } else {
        updateScore('playerTwo');
      }
    } else if (!isEndgame && squares.every(square => square !== null)) {
      setIsTie(true);
      setIsEndGame(true);
      updateScore('tie')
    }
  }, [squares, isXFirst, updateScore, isEndgame]);

  useEffect(() => {
    if(vsCpu && !isXFirst && !firstMove && !isEndgame) return;

    if (vsCpu && !isEndgame && (isXFirst && !xIsNext) || (!isXFirst && xIsNext)) {
      const cpuMoveTimeout = setTimeout(() => makeCpuMove(), 1000);
      return () => clearTimeout(cpuMoveTimeout);
    }
  }, [vsCpu, isXFirst, xIsNext, isEndgame, firstMove, makeCpuMove]);

  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares: (string | null)[] = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
    setFirstMove(true);
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

      <div className="flex justify-between counters mt-[19px]">
        <div className="w-[140px] h-[72px]]player-one-wins pt-[13px] px-[42px] pb-[11px] bg-light-blue-400 rounded-[15px] flex items-center flex-col">
          <p className="text-sm uppercase font-primary">{vsCpu ? 'X (You)' : 'X'}</p>
          <span className="text-2xl font-bold font-primary">
            {playerOneWins}
          </span>
        </div>
        <div className="w-[140px] h-[72px]]ties pt-[13px] px-[42px] pb-[11px] bg-silver-400 rounded-[15px] flex items-center flex-col">
          <p className="text-sm uppercase font-primary">Ties</p>
          <span className="text-2xl font-bold font-primary">
            {ties}
          </span>
        </div>
        <div className="w-[140px] h-[72px]]player-two-wins pt-[13px] px-[42px] pb-[11px] bg-light-yellow-400 rounded-[15px] flex items-center flex-col">
          <p className="text-sm uppercase font-primary">{vsCpu ? 'O (Cpu)' : 'O'}</p>
          <span className="text-2xl font-bold font-primary">
            {playerTwoWins}
          </span>
        </div>
      </div>

      {isEndgame && (
        <EndGame
          winner={winnerMark}
          playerWins={isPlayerOneWins}
          handleQuit={handleQuit}
          handleNextRound={handleNextRound}
          isTie={isTie}
        />
      )}
    </>
  );
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