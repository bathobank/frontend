import {GlobalLayout} from "@/components/layouts/GlobalLayout";
import {Box} from "@/components/ui/Box";
import {Button} from "@/components/ui/Button";
import {Flex} from "@/components/ui/Flex";
import {Text} from "@/components/ui/Text";
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import {useEffect, useState} from "react";
import {useJackpotQuery} from "@/queries/jackpot";

export default function Jackpot(){
  const [jackpot, setJackpot] = useState<string>('0000000');
  const jackpotQuery = useJackpotQuery();

  useEffect(() => {
    if (!jackpotQuery) return;
    const jackpotData = jackpotQuery.data.jackpot;
    if (jackpotData >= 1000000) {
      setJackpot(String(jackpotData));
      return;
    }
    const prefix = Array(7 - String(jackpotData).length).fill('0').join('');
    setJackpot(prefix + jackpotData);
  }, [jackpotQuery]);

  return (
    <GlobalLayout showHeader={false}>
      <Box className='rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal mt-5 px-3'>
        <Flex justify="center" className="border-b border-[#ffffff0d] py-3">
          <EmojiEventsRoundedIcon className="text-[#ff55a5] mr-3" />
          <Text custom={true}>NỔ HŨ - JACKPOT</Text>
        </Flex>
        <Box className="py-5">
          <Box className="mb-5">
            <Text align="center" size="xs">SỐ TIỀN HIỆN TẠI TRONG HŨ ĐANG CHỜ BẠN!</Text>
          </Box>
          <Flex justify="center" className="space-x-3 mb-5">
            {jackpot.split('').map((str, index) => (
              <Text
                key={`td-jackpot-money-${index}`}
                className="text-[14px] px-3 py-1 bg-[#ff55a51a] rounded select-none">
                {str}
              </Text>
            ))}
          </Flex>
          <Box className="text-center mb-5">
            <Button variant="theme">QUAY MIỄN PHÍ NGAY</Button>
          </Box>
          <Box className="space-y-3 text-center">
            <Text size="sm"><span className="text-[#ff55a5]">JACKPOT</span> là phần quà dành cho những người chơi <span className="text-[#ff55a5]">may mắn</span>.</Text>
            <Text size="sm">Bạn hoàn toàn có thể sở hữu <span className="text-[#ff55a5]">MIỄN PHÍ</span> thông qua việc quay Slot trên <span className="text-[#ff55a5]">Telegram</span> của <span className="text-[#ff55a5]">ABC.NET</span></Text>
            <Text size="sm">Bạn có thể nhận được lượt quay <span className="text-[#ff55a5]">MIỄN PHÍ</span> khi chơi game trên <span className="text-[#ff55a5]">ABC.NET</span></Text>
            <Text size="sm" className="text-[#ff55a5]">CHÚC BẠN MAY MẮN!!!!</Text>
          </Box>
        </Box>
      </Box>
    </GlobalLayout>
  );
}
