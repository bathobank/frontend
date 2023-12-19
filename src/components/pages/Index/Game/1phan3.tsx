import { useMemo } from "react";

import { TGameDetailData, TStartGame } from "@/@types/game";
import { GameDetail } from "@/components/pages/Index/Game/Detail";
import { useSystemSetting } from "@/hooks/useSystemSetting";
import { useUser } from "@/hooks/useUser";

export const Game1Phan3 = ({ startGame }: { startGame: TStartGame }) => {
  const { isLogined } = useUser();
  const {
    settings: { games },
  } = useSystemSetting();

  const headerTable: Array<string> = useMemo(() => {
    const data = ["Nội dung", "Số cuối", "Tỉ lệ"];
    if (isLogined) {
      data.push("");
    }
    return data;
  }, [isLogined]);

  const gameData = useMemo(() => {
    const game = games["1phan3"];
    const data: TGameDetailData = [];
    Object.keys(game).map((gameKey: string) => {
      data.push({
        key: gameKey,
        ends: game[gameKey].end,
        ratio: game[gameKey].ratio,
      });
    });
    return data;
  }, [games]);

  return (
    <GameDetail
      startGame={startGame}
      headers={headerTable}
      data={gameData}
      group="1 Phần 3"
    />
  );
};
