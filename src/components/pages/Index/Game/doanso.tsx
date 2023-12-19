import { useMemo } from "react";

import { TGameDetailData, TStartGame } from "@/@types/game";
import { GameDetail } from "@/components/pages/Index/Game/Detail";
import { useSystemSetting } from "@/hooks/useSystemSetting";
import { useUser } from "@/hooks/useUser";

export const GameDoanSo = ({ startGame }: { startGame: TStartGame }) => {
  const { isLogined } = useUser();
  const {
    settings: {
      games: { doanso },
    },
  } = useSystemSetting();

  const headerTable: Array<string> = useMemo(() => {
    const data = ["Nội dung", "Số cuối", "Tỉ lệ"];
    if (isLogined) {
      data.push("");
    }
    return data;
  }, [isLogined]);

  const gameData = useMemo(() => {
    const data: TGameDetailData = [];
    Object.keys(doanso).map((gameKey: string) => {
      data.push({
        key: gameKey,
        ends: doanso[gameKey].end,
        ratio: doanso[gameKey].ratio,
      });
    });
    return data;
  }, [doanso]);

  return (
    <GameDetail
      startGame={startGame}
      headers={headerTable}
      data={gameData}
      group="Đoán số"
    />
  );
};
