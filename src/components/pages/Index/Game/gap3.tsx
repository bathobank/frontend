import CasinoRoundedIcon from "@mui/icons-material/CasinoRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";

import { TGame, TStartGame } from "@/@types/game";
import { Box } from "@/components/ui/Box";
import { Flex } from "@/components/ui/Flex";
import { Text } from "@/components/ui/Text";
import { useToast } from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import { copyContent } from "@/utils/helper";
import { cn } from "@/utils/ui";

export const GameGap3 = ({
  startGame,
  gameData,
}: {
  startGame: TStartGame;
  gameData: TGame["gap3"];
}) => {
  const toast = useToast();
  const { user } = useUser();

  const triggerCopyContent = (content: string) => {
    copyContent(content, () => {
      toast.success("Copy nội dung thành công!", { autoClose: 2000 });
    });
  };

  return (
    <Box>
      <Flex className="px-3 py-5 border-b border-b-[#ffffff0d]">
        <CasinoRoundedIcon className="text-[#ff55a5]" />
        <Text custom={true} className="ml-2 text-white">
          GẤP 3
        </Text>
      </Flex>
      <Box className="p-3">
        <table className="w-full">
          <thead>
            <tr className="border-b border-b-[#ffffff0d]">
              <th scope="col" className="text-left py-3">
                <Text className="text-[#c7c7c7]">Nội dung</Text>
              </th>
              <th scope="col" className="py-3">
                <Text className="text-[#c7c7c7]">Cách tính</Text>
              </th>
              <th scope="col" className="py-3">
                <Text className="text-[#c7c7c7]">Số</Text>
              </th>
              <th scope="col" className="py-3">
                <Text className="text-[#c7c7c7]">Tỉ lệ</Text>
              </th>
              {user && <th scope="col" className="py-3"></th>}
            </tr>
          </thead>
          <tbody>
            {Object.keys(gameData.G3).map((key, index) => {
              const game = gameData.G3[key];
              const type = key.split("so")[0];

              return (
                <tr
                  key={`tr-game-cltx-${index}`}
                  className={cn(
                    index > 0 ? "border-t border-t-[#ffffff0d]" : "",
                  )}
                >
                  <td className="py-3 w-[100px] sm:w-[150px]">
                    <Flex
                      className="cursor-pointer select-none"
                      onClick={() =>
                        triggerCopyContent(`${user?.nickname ?? "nickname"} G3`)
                      }
                    >
                      <Text custom={true} className="mr-1">
                        {user?.nickname ?? "nickname"} G3
                      </Text>
                      <ContentCopyRoundedIcon className="!text-[18px] text-[#ff55a5]" />
                    </Flex>
                  </td>
                  <td className="py-3 w-[80px]">
                    <Text>{type} số cuối</Text>
                  </td>
                  <td className="py-3">
                    <Flex wrap="wrap" justify="center" className="gap-2">
                      {game.end.map((end, i) => (
                        <Text
                          key={`td-key-cltx-${i}`}
                          className="text-[12px] px-2 py-1 bg-[#ff55a51a] rounded select-none"
                        >
                          {end}
                        </Text>
                      ))}
                    </Flex>
                  </td>
                  <td className="min-w-[50px] text-center">
                    <Text>x{game.ratio}</Text>
                  </td>
                  {user && (
                    <td className="min-w-[50px] text-center">
                      <Text
                        className="cursor-pointer hover:underline text-[#ff55a5] select-none"
                        onClick={() => startGame("gap3", "G3")}
                      >
                        Chơi
                      </Text>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        <Box className="py-5">
          <Text className="italic text-[12px] text-center">
            KẾT QUẢ TÍNH BẰNG{" "}
            <span className="text-[#ff55a5]">2 HOẶC 3 SỐ CUỐI</span> CỦA{" "}
            <span className="text-[#ff55a5]">MÃ GIAO DỊCH BANK</span> KHI CHUYỂN
            KHOẢN VÀO BANK NHẬN CỦA WEB
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
