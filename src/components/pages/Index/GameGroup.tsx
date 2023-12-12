import { useState } from "react";

import { TGame } from "@/@types/game";
import { StartGameModal } from "@/components/modals/StartGame";
import { Game1Phan3 } from "@/components/pages/Index/Game/1phan3";
import { GameCltx } from "@/components/pages/Index/Game/cltx";
import { GameCltx2 } from "@/components/pages/Index/Game/cltx2";
import { GameDoanSo } from "@/components/pages/Index/Game/doanso";
import { GameGap3 } from "@/components/pages/Index/Game/gap3";
import { GameTong3So } from "@/components/pages/Index/Game/tong3so";
import { GameXien } from "@/components/pages/Index/Game/xien";

export const GameGroup = ({
  gameOpen,
  gameData,
}: {
  gameOpen: string;
  gameData: TGame;
}) => {
  const [openModalStartGame, setOpenModalStartGame] = useState<boolean>(false);
  const [gameTypeSelected, setGameTypeSelected] = useState<string>("");
  const [gameGroupSelected, setGameGroupSelected] = useState<string>("");

  const startGame = (gameGroup: string, gameType: string) => {
    setGameGroupSelected(gameGroup);
    setGameTypeSelected(gameType);
    setOpenModalStartGame(true);
  };

  const endGame = () => {
    setGameTypeSelected("");
    setOpenModalStartGame(false);
  };

  return (
    <>
      {gameOpen === "cltx" && (
        <GameCltx startGame={startGame} gameData={gameData.cltx} />
      )}
      {gameOpen === "cltx2" && (
        <GameCltx2 startGame={startGame} gameData={gameData.cltx2} />
      )}
      {gameOpen === "gap3" && (
        <GameGap3 startGame={startGame} gameData={gameData.gap3} />
      )}
      {gameOpen === "tong3so" && (
        <GameTong3So startGame={startGame} gameData={gameData.tong3so} />
      )}
      {gameOpen === "1phan3" && (
        <Game1Phan3 startGame={startGame} gameData={gameData["1phan3"]} />
      )}
      {gameOpen === "xien" && (
        <GameXien startGame={startGame} gameData={gameData.xien} />
      )}
      {gameOpen === "doanso" && (
        <GameDoanSo startGame={startGame} gameData={gameData.doanso} />
      )}
      <StartGameModal
        isOpen={openModalStartGame}
        gameType={gameTypeSelected}
        gameGroup={gameGroupSelected}
        onClose={endGame}
      />
    </>
  );
};
