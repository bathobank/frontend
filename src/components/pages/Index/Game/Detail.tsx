import { Stack } from "@mui/material";
import { useMemo } from "react";

import { TGameDetailData, TStartGame } from "@/@types/game";
import { SuccessButton } from "@/components/ui/SuccessButton";
import { Table } from "@/components/ui/Table";
import { useUser } from "@/hooks/useUser";
import { uuidv4 } from "@/utils/helper";

type Props = {
  headers: Array<string>;
  data: TGameDetailData;
  startGame: TStartGame;
  group: string;
};

export const GameDetail = ({ headers, data, startGame, group }: Props) => {
  const { user } = useUser();

  const nickname = useMemo(() => {
    return user?.nickname ?? "nickname";
  }, [user]);

  return (
    <Table headers={headers}>
      {data.map(({ ends, ratio, key }) => {
        return (
          <tr key={"tr-game-" + uuidv4()}>
            <td className="py-[8px] px-[4px] border border-[#ddd] text-center min-w-[100px]">
              <b className="text-[#6d2f0f]">
                {nickname} {key}
              </b>
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
            <td className="py-[8px] px-[4px] border border-[#ddd] text-center min-w-[60px]">
              <b className="text-[#6d2f0f]">{ratio}</b>
            </td>
            {user && (
              <td className="py-[8px] px-[4px] border border-[#ddd] text-center">
                <SuccessButton onClick={() => startGame(group, key)}>
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