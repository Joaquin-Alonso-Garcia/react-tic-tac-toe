import { useState } from 'react';
import Board from './Board';
import Menu from './Menu';

interface GameProps {
  isXFirst: boolean;
  handleQuit: () => void;
  handleNextRound: () => void;
}

const Game: React.FC<GameProps> = ({ isXFirst, handleQuit, handleNextRound }) => {
  const [history, setHistory] = useState<(string | null)[][]>(Array(9).fill(null));
  const [currentMove, setCurrentMove] = useState<number>(isXFirst ? 0 : 1);
  const xIsNext: boolean = currentMove % 2 === 0;
  const currentSquares = history[currentMove] || Array(9).fill(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpToPastMove() {
    if (currentMove > 0) {
      setHistory(history.slice(0, currentMove));

      setCurrentMove(currentMove - 1);
    }
  }

  // function handleQuit() {
  //   setShowMenu(true);
  //   setHistory([Array(9).fill(null)]);
  //   setIsEndgame(false);
  // }

  // function handleNextRound() {
  //   setHistory(Array(9).fill(null));
  //   setCurrentMove(isXFirst ? 0 : 1);
  //   setIsEndgame(false);
  // }

  if(showMenu) {
    return <Menu onGameStarts={setShowMenu} />;
  }

  return (
    <div className="game-container w-[460px]">
      {showMenu ? (
        <Menu onGameStarts={() => setShowMenu(false)} />
      ) : (
        <>
          <div className="flex items-center justify-between mb-4 game-header">
            <img src="/assets/images/logo.svg" className="w-[72px] h-8" alt="logo" width="72" height="32" />
            <div className="uppercase turn-info pt-[13px] pb-[19px] px-[30px] bg-dark-navi-500 rounded-[10px] turn-shadow w-[140px] mr-5 text-center">
              <p className="text-silver-400 text-heading-xs">
                {xIsNext ? 'X' : 'O'} turn
              </p>
            </div>
            <button className="p-4 back-button bg-silver-400 rounded-[10px]" onClick={() => jumpToPastMove()}>
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.524 0h-1.88a.476.476 0 0 0-.476.499l.159 3.284A9.81 9.81 0 0 0 9.835.317C4.415.317-.004 4.743 0 10.167.004 15.597 4.406 20 9.835 20a9.796 9.796 0 0 0 6.59-2.536.476.476 0 0 0 .019-.692l-1.348-1.349a.476.476 0 0 0-.65-.022 6.976 6.976 0 0 1-9.85-.63 6.987 6.987 0 0 1 .63-9.857 6.976 6.976 0 0 1 10.403 1.348l-4.027-.193a.476.476 0 0 0-.498.476v1.881c0 .263.213.476.476.476h7.944A.476.476 0 0 0 20 8.426V.476A.476.476 0 0 0 19.524 0Z" fill="#1F3641" />
              </svg>
            </button>
          </div>

          <Board
            isXFirst={isXFirst}
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            handleQuit={handleQuit}
            handleNextRound={handleNextRound}
          />
        </>
      )}
    </div>
  );
};

export default Game;