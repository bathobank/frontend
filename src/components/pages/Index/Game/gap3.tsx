import { Stack } from "@mui/material";
import { useMemo } from "react";

import { TGameGap3Data, TStartGame } from "@/@types/game";
import { SuccessButton } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { useSystemSetting } from "@/hooks/useSystemSetting";
import { useUser } from "@/hooks/useUser";
import { uuidv4 } from "@/utils/helper";

export const GameGap3 = ({ startGame }: { startGame: TStartGame }) => {
  const { user } = useUser();
  const {
    settings: {
      games: {
        gap3: { G3: gap3 },
      },
    },
  } = useSystemSetting();

  const nickname = useMemo(() => {
    return user?.nickname ?? "nickname";
  }, [user]);

  const headerTable: Array<string> = useMemo(() => {
    const data = ["Nội dung", "Cách tính", "Số", "Tỉ lệ"];
    if (user) {
      data.push("");
    }
    return data;
  }, [user]);

  const gameData = useMemo(() => {
    const data: TGameGap3Data = [];
    Object.keys(gap3).map((gameKey: string) => {
      const type = Number(gameKey.split("so")[0]);
      data.push({
        type: type,
        ends: gap3[gameKey].end,
        ratio: gap3[gameKey].ratio,
      });
    });
    return data;
  }, [gap3]);

  return (
    <Table headers={headerTable}>
      {gameData.map(({ ends, ratio, type }) => {
        return (
          <tr key={"tr-game-" + uuidv4()}>
            <td className="py-[8px] px-[4px] border border-[#ddd] text-center min-w-[100px]">
              <b className="text-[#6d2f0f]">{nickname} G3</b>
            </td>
            <td className="py-[8px] px-[4px] border border-[#ddd] min-w-[150px]">
              <Stack
                flexWrap="wrap"
                direction="row"
                justifyContent="center"
                gap={1}
              >
                {ends.map((end) => (
                  <code key={"td-game" + uuidv4()} className="select-none">
                    {end}
                  </code>
                ))}
              </Stack>
            </td>
            <td className="py-[8px] px-[4px] border border-[#ddd] text-center min-w-[80px]">
              <b>{type}</b> số cuối
            </td>
            <td className="py-[8px] px-[4px] border border-[#ddd] text-center min-w-[60px]">
              <b className="text-[#6d2f0f]">{ratio}</b>
            </td>
            {user && (
              <td className="py-[8px] px-[4px] border border-[#ddd] text-center">
                <SuccessButton onClick={() => startGame("Gấp 3", "G3")}>
                  Chơi
                </SuccessButton>
              </td>
            )}
          </tr>
        );
      })}
    </Table>
  );
};
