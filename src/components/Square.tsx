interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onSquareClick }) => {
  return (
    <button className="square rounded-[15px] h-[140px] bg-dark-navi-500" onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default Square;