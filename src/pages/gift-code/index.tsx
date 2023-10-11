import {GlobalLayout} from "@/components/layouts/GlobalLayout";
import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {LinkUI} from "@/components/ui/Link";
import {Text} from "@/components/ui/Text";
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';

export default function GiftCode(){
  return (
    <GlobalLayout showHeader={false}>
      <Box className='rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal mt-5 px-3'>
        <Flex justify="center" className="border-b border-[#ffffff0d] py-3">
          <CardGiftcardRoundedIcon className="text-[#ff55a5] mr-3" />
          <Text custom={true}>NHẬN GIFTCODE</Text>
        </Flex>
        <Box className="py-5">
          <Box className="text-center">
            <Box className="mb-3">
              <Text><span className="text-[#ff55a5]">GIFTCODE</span> là món quà mà chúng tôi gửi tặng tới những người chơi để tri ân.</Text>
              <Text>Người chơi có thể nhận được thông qua việc tham gia các sự kiện trên <span className="text-[#ff55a5]">Website</span> hoặc <span className="text-[#ff55a5]">Group Telegram</span> do chúng tôi tổ chức.</Text>
            </Box>
            <Text size="sm">VUI LÒNG <LinkUI href='/auth/login' className="text-[#ff55a5]">ĐĂNG NHẬP</LinkUI> HOẶC <LinkUI href="/auth/register" className="text-[#ff55a5]">ĐĂNG KÝ NHANH</LinkUI> ĐỂ NHẬN THƯỞNG</Text>
          </Box>
        </Box>
      </Box>
    </GlobalLayout>
  );
}
