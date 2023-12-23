import { useMemo } from "react";

import { TGameDetailData, TStartGame } from "@/@types/game";
import { GameDetail } from "@/components/pages/Index/Game/Detail";
import { useSystemSetting } from "@/hooks/useSystemSetting";

export const GameCltx = ({ startGame }: { startGame: TStartGame }) => {
  const {
    settings: {
      games: { cltx },
    },
  } = useSystemSetting();

  const gameData = useMemo(() => {
    const data: TGameDetailData = [];
    Object.keys(cltx).map((gameKey: string) => {
      data.push({
        key: gameKey,
        ends: cltx[gameKey].end,
        ratio: cltx[gameKey].ratio,
      });
    });
    return data;
  }, [cltx]);

  return (
    <GameDetail
      startGame={startGame}
      headers={["Nội dung", "Số cuối", "Tỉ lệ", ""]}
      data={gameData}
      group="cltx"
    />
  );
};
