import { useState } from 'react';
import './App.css'
import Menu from './components/Menu';
import Game from './components/Game';

const App: React.FC = () => {
  const [screen, setScreen] = useState<'menu' | 'board'>('menu');
  const [isXFirst, setIsXFirst] = useState<boolean>(true);
  const [vsCpu, setVsCpu] = useState<boolean>(false);
  const [playerOneWins, setPlayerOneWins] = useState<number>(0);
  const [playerTwoWins, setPlayerTwoWins] = useState<number>(0);
  const [ties, setTies] = useState<number>(0);

  const updateScore = (result: 'playerOne' | 'playerTwo' | 'tie') => {
    if (result === 'playerOne') setPlayerOneWins(prevPlayerOneWins => prevPlayerOneWins + 1);
    else if (result === 'playerTwo') setPlayerTwoWins(prevPlayerTwoWins => prevPlayerTwoWins + 1);
    else setTies(prevTies => prevTies + 1);
  };

  const resetScores = () => {
    setPlayerOneWins(0);
    setPlayerTwoWins(0);
    setTies(0);
  };

  const handleGameStart = (isXFirst: boolean, cpuGame: boolean) => {
    setIsXFirst(isXFirst);
    setScreen('board');
    setVsCpu(cpuGame);
  };

  const handleQuit = () => {
    setScreen('menu');
    resetScores();
  };

  return (
    <>
      {screen === 'menu' ? (
        <Menu onGameStart={handleGameStart} />
      ) : (
        <Game
          isXFirst={isXFirst}
          handleQuit={handleQuit}
          vsCpu={vsCpu}
          playerOneWins={playerOneWins}
          playerTwoWins={playerTwoWins}
          ties={ties}
          updateScore={updateScore}
        />
      )}
    </>
  )
}

export default App;
