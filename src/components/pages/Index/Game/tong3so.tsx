import { useMemo } from "react";

import { TGameDetailData, TStartGame } from "@/@types/game";
import { GameDetail } from "@/components/pages/Index/Game/Detail";
import { useSystemSetting } from "@/hooks/useSystemSetting";
import { useUser } from "@/hooks/useUser";

export const GameTong3So = ({ startGame }: { startGame: TStartGame }) => {
  const { isLogined } = useUser();
  const {
    settings: {
      games: {
        tong3so: { S: tong3so },
      },
    },
  } = useSystemSetting();

  const headerTable: Array<string> = useMemo(() => {
    const data = ["Nội dung", "Tổng 3 số cuối", "Tỉ lệ"];
    if (isLogined) {
      data.push("");
    }
    return data;
  }, [isLogined]);

  const gameData = useMemo(() => {
    const data: TGameDetailData = [];
    Object.keys(tong3so).map((gameKey: string) => {
      data.push({
        key: "S",
        ends: tong3so[gameKey].sum3end,
        ratio: tong3so[gameKey].ratio,
      });
    });
    return data;
  }, [tong3so]);

  return (
    <GameDetail
      startGame={startGame}
      headers={headerTable}
      data={gameData}
      group="Tổng 3 số"
    />
  );
};
