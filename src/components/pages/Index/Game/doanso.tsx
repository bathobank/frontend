import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {Text} from "@/components/ui/Text";
import {useToast} from "@/hooks/useToast";
import {useUser} from "@/hooks/useUser";
import {copyContent} from "@/utils/helper";
import {cn} from "@/utils/ui";
import CasinoRoundedIcon from '@mui/icons-material/CasinoRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

const ConfigGame: {key: string; end: string; ratio: string}[] = [
  {key: 'D0', end: '0', ratio: 'x5'},
  {key: 'D1', end: '1', ratio: 'x7'},
  {key: 'D2', end: '2', ratio: 'x7'},
  {key: 'D3', end: '3', ratio: 'x7'},
  {key: 'D4', end: '4', ratio: 'x7'},
  {key: 'D5', end: '5', ratio: 'x7'},
  {key: 'D6', end: '6', ratio: 'x7'},
  {key: 'D7', end: '7', ratio: 'x7'},
  {key: 'D8', end: '8', ratio: 'x7'},
  {key: 'D9', end: '9', ratio: 'x7'}
]

export const GameDoanSo = () => {
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
        <Text custom={true} className="ml-2 text-white">ĐOÁN SỐ</Text>
      </Flex>
      <Box className="p-3">
        <table className="w-full">
          <thead>
            <tr className="border-b border-b-[#ffffff0d]">
              <th scope="col" className="text-left py-3">
                <Text className="text-[#c7c7c7]">Nội dung</Text>
              </th>
              <th scope="col" className="py-3">
                <Text className="text-[#c7c7c7]">Số cuối</Text>
              </th>
              <th scope="col" className="py-3">
                <Text className="text-[#c7c7c7]">Tỉ lệ</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {ConfigGame.map((config, index) => (
              <tr key={`tr-game-cltx-${index}`} className={cn(index > 0 ? "border-t border-t-[#ffffff0d]" : '')}>
                <td className="py-3 w-[150px]">
                  <Flex className="cursor-pointer select-none" onClick={() => triggerCopyContent(`${user?.nickname ?? 'nickname'} ${config.key}`)}>
                    <Text custom={true} className="mr-1">{user?.nickname ?? 'nickname'} {config.key}</Text>
                    <ContentCopyRoundedIcon className="!text-[18px] text-[#ff55a5]" />
                  </Flex>
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
