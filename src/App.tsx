import { useState } from 'react';
import './App.css'
import Menu from './components/Menu';
import Game from './components/Game';

const App: React.FC = () => {
  const [screen, setScreen] = useState<'menu' | 'board'>('menu');
  const [isXFirst, setIsXFirst] = useState<boolean>(true);

  const handleGameStarts = (isXFirst: boolean) => {
    setIsXFirst(isXFirst);
    setScreen('board');
  };

  const handleQuit = () => {
    setScreen('menu');
  };

  return (
    <>
      {screen === 'menu' ? (
        <Menu onGameStarts={handleGameStarts} />
      ) : (
        <Game isXFirst={isXFirst} handleQuit={handleQuit} />
      )}
    </>
  )
}

export default App;
