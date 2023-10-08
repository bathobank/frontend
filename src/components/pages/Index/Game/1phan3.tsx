import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {Text} from "@/components/ui/Text";
import {useToast} from "@/hooks/useToast";
import {copyContent} from "@/utils/helper";
import {cn} from "@/utils/ui";
import CasinoRoundedIcon from '@mui/icons-material/CasinoRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

const ConfigGame: {key: string; end: string; ratio: string}[] = [
  {key: 'vietdau N1', end: '1,5,7', ratio: 'x2.8'},
  {key: 'vietdau N2', end: '2,4,8', ratio: 'x2.8'},
  {key: 'vietdau N3', end: '3,6,9', ratio: 'x2.8'}
]

export const Game1Phan3 = () => {
  const toast = useToast();

  const triggerCopyContent = (content: string) => {
    copyContent(content, () => {
      toast.success('Copy nội dung thành công!', { autoClose: 2000 });
    });
  }

  return (
    <Box>
      <Flex className="px-3 py-5 border-b border-b-[#ffffff0d]">
        <CasinoRoundedIcon className="text-[#ff55a5]" />
        <Text custom={true} className="ml-2 text-white">MỘT PHẦN 3</Text>
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
                  <Flex className="cursor-pointer select-none" onClick={() => triggerCopyContent(config.key)}>
                    <Text custom={true} className="mr-1">{config.key}</Text>
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
          <Text className="italic text-[12px] text-center mb-3">
            TỶ LỆ CƯỢC ĐỐI VỚI GIAO DỊCH TRÊN 1TR GIẢM 0.1 VÀ ĐỐI VỚI GIAO DỊCH TRÊN 2TR GIẢM 0.2.
          </Text>
          <Text className="italic text-[12px] text-center">
            KẾT QUẢ TÍNH BẰNG SỐ CUỐI CỦA <span className="text-[#ff55a5]">MÃ GIAO DỊCH BANK</span> KHI CHUYỂN KHOẢN VÀO BANK NHẬN CỦA WEB
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
