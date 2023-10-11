import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {LinkUI} from "@/components/ui/Link";
import {Text} from "@/components/ui/Text";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export const History = () => {
  return (
    <Box className='rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal'>
      <Flex className="px-3 py-5 border-b border-b-[#ffffff0d]">
        <AccessTimeIcon className="text-[#ff55a5]" />
        <Text custom={true} className="ml-2 text-white">LỊCH SỬ CHƠI GẦN ĐÂY</Text>
      </Flex>
      <Box className="px-3 py-5">
        <Text align="center" size="sm">ĐỂ LẤY THÔNG TIN BANK CHUYỂN KHOẢN, VUI LÒNG <LinkUI href='/auth/login' className="text-[#ff55a5]">ĐĂNG NHẬP</LinkUI> HOẶC <LinkUI href="/auth/register" className="text-[#ff55a5]">ĐĂNG KÝ NHANH</LinkUI></Text>
      </Box>
    </Box>
  );
}
