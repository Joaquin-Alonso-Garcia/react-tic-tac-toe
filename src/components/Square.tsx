interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
  isWinningSquare: boolean;
  winner: string | null;
}

const Square: React.FC<SquareProps> = ({ value, onSquareClick, isWinningSquare, winner }) => {
  const winningColor = winner === 'X' ? 'bg-light-blue-400' : 'bg-light-yellow-400';
  const markSrc = value === 'X'
    ? (isWinningSquare ? '/assets/images/icon-x-black.svg' : '/assets/images/icon-x.svg')
    : (isWinningSquare ? '/assets/images/icon-o-black.svg' : '/assets/images/icon-o.svg');

  return (
    <button
      className={`square rounded-[15px] h-[140px] bg-dark-navi-500 grid place-items-center
        ${isWinningSquare ? winningColor : ''}`}
      onClick={onSquareClick}
    >
      {value && <img src={markSrc} alt={`${value} mark`} />}
    </button>
  );
};

export default Square;