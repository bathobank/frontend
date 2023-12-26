import { Box } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

import { StartGameModal } from "@/components/modals/StartGame";
import { Game1Phan3 } from "@/components/pages/Index/Game/1phan3";
import { GameCltx } from "@/components/pages/Index/Game/cltx";
import { GameCltx2 } from "@/components/pages/Index/Game/cltx2";
import { GameDoanSo } from "@/components/pages/Index/Game/doanso";
import { GameGap3 } from "@/components/pages/Index/Game/gap3";
import { GameHieu3 } from "@/components/pages/Index/Game/hieu3";
import { GameTong3So } from "@/components/pages/Index/Game/tong3so";
import { GameXien } from "@/components/pages/Index/Game/xien";
import { getGameOpen } from "@/stores/slices/game";

type TGameSelected = {
  type: string;
  group: string;
};

export const GameGroup = () => {
  const gameOpen = useSelector(getGameOpen);
  const [openModalStartGame, setOpenModalStartGame] = useState<boolean>(false);
  const [gameSelected, setGameSelected] = useState<TGameSelected>({
    group: "",
    type: "",
  });

  const startGame = (gameGroup: string, gameType: string) => {
    setGameSelected({
      group: gameGroup,
      type: gameType,
    });
    setOpenModalStartGame(true);
  };

  const endGame = () => {
    setOpenModalStartGame(false);
    setGameSelected({
      group: "",
      type: "",
    });
  };

  return (
    <>
      <Box>
        {gameOpen === "cltx" && <GameCltx startGame={startGame} />}
        {gameOpen === "cltx2" && <GameCltx2 startGame={startGame} />}
        {gameOpen === "gap3" && <GameGap3 startGame={startGame} />}
        {gameOpen === "tong3so" && <GameTong3So startGame={startGame} />}
        {gameOpen === "1phan3" && <Game1Phan3 startGame={startGame} />}
        {gameOpen === "xien" && <GameXien startGame={startGame} />}
        {gameOpen === "doanso" && <GameDoanSo startGame={startGame} />}
        {gameOpen === "hieu3" && <GameHieu3 startGame={startGame} />}
      </Box>
      <StartGameModal
        isOpen={openModalStartGame}
        gameType={gameSelected.type}
        gameGroup={gameSelected.group}
        onClose={endGame}
      />
    </>
  );
};
