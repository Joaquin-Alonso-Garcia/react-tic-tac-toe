import { useState } from "react";

const Menu: React.FC<{ onGameStart: (isXFirst: boolean, cpuGame: boolean) => void}> = ({ onGameStart }) => {
  const [xStarts, setXStarts] = useState<boolean>(true);
  const vsCPU = true;
  const vsPlayer = false;

  const handleChoice = () => {
    setXStarts(!xStarts);
  };

  return (
    <div className="menu-container w-[460px]">
      <div className="flex justify-center mb-10 logo">
        <img src="/assets/images/logo.svg" alt="logo" />
      </div>
      <div className="flex flex-col justify-center menu-items bg-dark-navi-500 p-6 pb-[30px] rounded-[15px] mb-10 menu-shadow">
        <div className="m-auto">
          <h1 className="font-bold uppercase text-heading-xs text-silver-400">
            Pick Player 1's Mark
          </h1>
        </div>
        <div className="flex justify-center pick mt-6 mb-[17px] bg-dark-navi-400 rounded-[10px]">
          <div className={`choice w-[198px] my-[9px] flex justify-center rounded-[10px] ${xStarts ? 'bg-silver-400': 'bg-dark-navi-400'}`}>
            <label htmlFor="playerX" className={`cursor-pointer ${xStarts ? "text-dark-navi-400" : "text-dark-navi-400"}`}>
              {xStarts ? (
                <svg className="scale-50" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#1A2A33" fillRule="evenodd"/>
                </svg>
              ): (
                <svg className="scale-50" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#A8BFC9" fillRule="evenodd"/>
                </svg>
              )}
            </label>
            <input type="radio" name="choice" id="playerX" className="hidden" onClick={handleChoice} />
          </div>

          <div className={`choice w-[198px] my-[9px] flex justify-center rounded-[10px] ${!xStarts ? 'bg-silver-400': 'bg-dark-navi-400'}`}>
            <label htmlFor="playerO" className={`cursor-pointer ${!xStarts ? "text-silver-400" : "text-dark-navi-400"}`}>
              {!xStarts ? (
                <svg className="scale-50" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#1A2A33"/>
                </svg>
              ): (
                <svg className="scale-50" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#A8BFC9"/>
                </svg>
              )}
            </label>
            <input type="radio" name="choice" id="playerO" className="hidden" onClick={handleChoice} />
          </div>
        </div>
        <div className="mx-auto info">
          <p className="uppercase text-silver-400 text-body">
            Remember: {xStarts ? 'X' : 'O'} goes first
          </p>
        </div>

      </div>

      <button
        id="option-one"
        className="uppercase rounded-[15px] bg-light-yellow-400 pt-[17px] pb-[25px] px-[122.5px] font-bold text-heading-sm w-full btn-primary-shadow"
        onClick={() => onGameStart(xStarts, vsCPU)}
      >
        New Game (vs CPU)
      </button>
      <button
        id="option-two"
        className="mt-5 uppercase rounded-[15px] bg-light-blue-400 pt-[17px] pb-[25px] px-[100px] font-bold text-heading-sm w-full btn-secondary-shadow"
        onClick={() => onGameStart(xStarts, vsPlayer)}
      >
        New Game (vs Player)
      </button>
    </div>
  );
};

export default Menu;