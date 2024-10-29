import { useState } from "react";

const Menu: React.FC = () => {
  const [xStarts, setXStarts] = useState<boolean>(false);

  const handleChoice = () => {
    setXStarts(!xStarts);
  };

  return (
    <div className="max-w-[460px]">
      <div className="flex justify-center mb-10 logo">
        <img src="/assets/images/logo.svg" alt="" />
      </div>
      <div className="flex flex-col justify-center menu-items bg-dark-navi-500 p-6 pb-[30px] rounded-[15px] mb-10 menu-shadow">
        <div className="m-auto">
          <h1 className="font-bold uppercase text-heading-xs text-silver-400">
            Pick Player 1's Mark
          </h1>
        </div>
        <div className="flex justify-center pick mt-6 mb-[17px] bg-dark-navi-400 rounded-[10px]">
          <div className={xStarts ? "choice w-[198px] my-[9px] flex justify-center bg-dark-navi-400 rounded-[10px]" : "choice w-[198px] my-[9px] flex justify-center bg-silver-400 rounded-[10px]"}>
            <label htmlFor="playerX" className={xStarts ? "text-silver-400 py-5" : "text-dark-navi-400 py-5"}>X</label>
            <input type="radio" name="choice" id="playerX" className="hidden" onClick={handleChoice} />
          </div>

          <div className={!xStarts ? "choice w-[198px] my-[9px] flex justify-center bg-dark-navi-400 rounded-[10px]" : "choice w-[198px] my-[9px] flex justify-center bg-silver-400 rounded-[10px]"}>
            <label htmlFor="playerO" className={!xStarts ? "text-silver-400 py-5" : "text-dark-navi-400 py-5"}>O</label>
            <input type="radio" name="choice" id="playerO" className="hidden" onClick={handleChoice} />
          </div>
        </div>
        <div className="mx-auto info">
          <p className="uppercase text-silver-400 text-body">
            Remember: player goes first
          </p>
        </div>

      </div>

      <button
        id="option-one"
        className="uppercase rounded-[15px] bg-light-yellow-400 pt-[17px] pb-[25px] px-[122.5px] font-bold text-heading-sm w-full btn-primary-shadow"
      >
        New Game (vs CPU)
      </button>
      <button
        id="option-two"
        className="mt-5 uppercase rounded-[15px] bg-light-blue-400 pt-[17px] pb-[25px] px-[122.5px] font-bold text-heading-sm w-full btn-secondary-shadow"
      >
        New Game (vs Player)
      </button>
    </div>
  );
};

export default Menu;