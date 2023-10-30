import {GlobalLayout} from "@/components/layouts/GlobalLayout";
import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {Text} from "@/components/ui/Text";
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import {History} from "@/components/pages/Index/History";

export default function HistoryPage(){
  return (
    <GlobalLayout showHeader={false} title="Lịch sử chơi">
      <Box className='rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal mt-5 px-3'>
        <Flex justify="center" className="border-b border-[#ffffff0d] py-3">
          <HistoryRoundedIcon className="text-[#ff55a5] mr-3" />
          <Text custom={true}>LỊCH SỬ CHƠI CỦA BẠN</Text>
        </Flex>
        <Box className="py-3">
          <History isFull={true} />
        </Box>
      </Box>
    </GlobalLayout>
  );
}
