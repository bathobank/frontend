import { useMemo } from "react";

import { TGameDetailData, TStartGame } from "@/@types/game";
import { GameDetail } from "@/components/pages/Index/Game/Detail";
import { useSystemSetting } from "@/hooks/useSystemSetting";
import { useUser } from "@/hooks/useUser";

export const GameCltx2 = ({ startGame }: { startGame: TStartGame }) => {
  const { isLogined } = useUser();
  const {
    settings: {
      games: { cltx2 },
    },
  } = useSystemSetting();

  const headerTable: Array<string> = useMemo(() => {
    const data = ["Nội dung", "Tổng 2 số cuối", "Tỉ lệ"];
    if (isLogined) {
      data.push("");
    }
    return data;
  }, [isLogined]);

  const gameData = useMemo(() => {
    const data: TGameDetailData = [];
    Object.keys(cltx2).map((gameKey: string) => {
      data.push({
        key: gameKey,
        ends: cltx2[gameKey].sum2end,
        ratio: cltx2[gameKey].ratio,
      });
    });
    return data;
  }, [cltx2]);

  return (
    <GameDetail
      startGame={startGame}
      headers={headerTable}
      data={gameData}
      group="cltx2"
    />
  );
};
