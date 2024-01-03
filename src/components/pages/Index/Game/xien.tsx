import { useMemo } from "react";

import { TGameDetailData, TStartGame } from "@/@types/game";
import { GameDetail } from "@/components/pages/Index/Game/Detail";
import { useSystemSetting } from "@/hooks/useSystemSetting";
import { useUser } from "@/hooks/useUser";

export const GameXien = ({ startGame }: { startGame: TStartGame }) => {
  const { isLogined } = useUser();
  const {
    settings: {
      games: { xien },
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
    Object.keys(xien).map((gameKey: string) => {
      data.push({
        key: gameKey,
        ends: xien[gameKey].sum2end,
        ratio: xien[gameKey].ratio,
      });
    });
    return data;
  }, [xien]);

  return (
    <GameDetail
      startGame={startGame}
      headers={headerTable}
      data={gameData}
      group="Xiên"
    />
  );
};
