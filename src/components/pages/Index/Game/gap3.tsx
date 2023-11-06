import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {Text} from "@/components/ui/Text";
import {useToast} from "@/hooks/useToast";
import {useUser} from "@/hooks/useUser";
import {copyContent} from "@/utils/helper";
import {cn} from "@/utils/ui";
import CasinoRoundedIcon from '@mui/icons-material/CasinoRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import {TStartGame} from "@/@types/game";

const ConfigGame: {key: string; calculation: string; end: string; ratio: string}[] = [
  {key: 'G3', calculation: '2 số cuối', end: '02,13,17,19,21,29,35,37,47,49,51,54,57,63,64,74,83,91,95,96', ratio: 'x3'},
  {key: 'G3', calculation: '2 số cuối', end: '66,99', ratio: 'x4'},
  {key: 'G3', calculation: '3 số cuối', end: '123,234,456,678,789', ratio: 'x5'}
]

export const GameGap3 = ({startGame}: {startGame: TStartGame}) => {
  const toast = useToast();
  const {user} = useUser();

  const triggerCopyContent = (content: string) => {
    copyContent(content, () => {
      toast.success('Copy nội dung thành công!', { autoClose: 2000 });
    });
  }

  return (
    <Box>
      <Flex className="px-3 py-5 border-b border-b-[#ffffff0d]">
        <CasinoRoundedIcon className="text-[#ff55a5]" />
        <Text custom={true} className="ml-2 text-white">GẤP 3</Text>
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
              {user && (
                <th scope="col" className="py-3"></th>
              )}
            </tr>
          </thead>
          <tbody>
            {ConfigGame.map((config, index) => (
              <tr key={`tr-game-cltx-${index}`} className={cn(index > 0 ? "border-t border-t-[#ffffff0d]" : '')}>
                <td className="py-3 w-[100px] sm:w-[150px]">
                  <Flex className="cursor-pointer select-none" onClick={() => triggerCopyContent(`${user?.nickname ?? 'nickname'} ${config.key}`)}>
                    <Text custom={true} className="mr-1">{user?.nickname ?? 'nickname'} {config.key}</Text>
                    <ContentCopyRoundedIcon className="!text-[18px] text-[#ff55a5]" />
                  </Flex>
                </td>
                <td className="py-3 w-[80px]">
                  <Text>{config.calculation}</Text>
                </td>
                <td className="py-3">
                  <Flex wrap="wrap" justify="center" className="gap-2">
                    {config.end.split(',').map((end, i) => (
                      <Text
                        key={`td-key-cltx-${i}`}
                        className="text-[12px] px-2 py-1 bg-[#ff55a51a] rounded select-none">
                        {end}
                      </Text>
                    ))}
                  </Flex>
                </td>
                <td className="min-w-[50px] text-center">
                  <Text>{config.ratio}</Text>
                </td>
                {user && (
                  <td className="min-w-[50px] text-center">
                    <Text className="cursor-pointer hover:underline text-[#ff55a5] select-none" onClick={() => startGame('gap3', config.key)}>Chơi</Text>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <Box className="py-5">
          <Text className="italic text-[12px] text-center">
            KẾT QUẢ TÍNH BẰNG SỐ CUỐI CỦA <span className="text-[#ff55a5]">MÃ GIAO DỊCH BANK</span> KHI CHUYỂN KHOẢN VÀO BANK NHẬN CỦA WEB
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
