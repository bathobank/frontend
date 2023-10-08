import {GlobalLayout} from "@/components/layouts/GlobalLayout";
import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {Text} from "@/components/ui/Text";
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';

export default function History(){
  return (
    <GlobalLayout showHeader={false}>
      <Box className='rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal mt-5 px-3'>
        <Flex justify="center" className="border-b border-[#ffffff0d] py-3">
          <HistoryRoundedIcon className="text-[#ff55a5] mr-3" />
          <Text custom={true}>LỊCH SỬ CHƠI CỦA BẠN</Text>
        </Flex>
        <Box className="py-3">
          <Text align="center">Chức năng đang được phát triển</Text>
        </Box>
      </Box>
    </GlobalLayout>
  );
}
