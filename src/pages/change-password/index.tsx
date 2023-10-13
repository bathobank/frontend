import {GlobalLayout} from "@/components/layouts/GlobalLayout";
import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {Text} from "@/components/ui/Text";
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';

export default function ChangePassword(){
  return (
    <GlobalLayout showHeader={false} title="Đổi mật khẩu">
      <Box className='rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal mt-5 px-3'>
        <Flex justify="center" className="border-b border-[#ffffff0d] py-3">
          <ManageAccountsRoundedIcon className="text-[#ff55a5] mr-3" />
          <Text custom={true}>ĐỔI MẬT KHẨU</Text>
        </Flex>
        <Box className="py-3">
          <Text align="center">Chức năng đang được phát triển</Text>
        </Box>
      </Box>
    </GlobalLayout>
  );
}
