interface EndGameProps {
  winner: string | null;
  playerWins: boolean;
  handleNextRound: () => void;
  handleQuit: () => void;
}

const EndGame: React.FC<EndGameProps> = ({ winner, playerWins, handleNextRound, handleQuit }) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="info-stripe bg-dark-navi-500 h-[266px] w-full z-20 flex justify-center items-center flex-col">
        <p className="mb-4 uppercase text-silver-400 text-heading-xs">
          {playerWins ? 'Player 1 Wins!' : 'Player 2 Wins'}
        </p>
        <div className="flex gap-6">
          <img src="" alt="" />
          <p className={`uppercase text-heading-lg mb-6 ${winner === 'X' ? 'text-silver-400' : 'text-light-yellow-400'}`}>
            Takes the round
          </p>
        </div>
        <div className="flex gap-6 buttons">
          <button
            onClick={handleQuit}
            className="text-dark-navi-400 text-heading-xs pt-[15px] pb-[17px] px-[17px] bg-silver-400 rounded-[10px] btn-endgame-secondary-shadow">
            Quit
          </button>
          <button
            onClick={handleNextRound}
            className="text-dark-navi-400 text-heading-xs pt-[15px] pb-[17px] px-[17px] bg-light-yellow-400 rounded-[10px] btn-endgame-primary-shadow">
            Next Round
          </button>
        </div>
      </div>
      <div className="absolute inset-0 overlay opacity-60"></div>
    </div>
  )
}

export default EndGame;