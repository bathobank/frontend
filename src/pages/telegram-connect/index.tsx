import {GlobalLayout} from "@/components/layouts/GlobalLayout";
import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {Text} from "@/components/ui/Text";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {useUser} from "@/hooks/useUser";
import {LinkUI} from "@/components/ui/Link";
import {Button} from "@/components/ui/Button";

export default function TelegramConnect() {
  const {user} = useUser();

  return (
    <GlobalLayout showHeader={false} title="Liên kết">
      <Box className='rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal mt-5 px-3'>
        <Flex justify="center" className="border-b border-[#ffffff0d] py-3">
          <SendRoundedIcon className="text-[#ff55a5] mr-3"/>
          <Text custom={true}>LIÊN KẾT TELEGRAM</Text>
        </Flex>
        {user && (
          <Box className="py-6">
            {user.telegram_id ? (
              <Box className="text-center">
                <Text size="sm">
                  Tài khoản của bạn đã được liên kết Telegram. Truy cập <LinkUI href="https://t.me/bat_ho_bank_bot" target="_blank">@bat_ho_bank</LinkUI> ngay!
                </Text>
              </Box>
            ) : (
              <Box className="text-center">
                <Text size="sm" className="mb-4">TÀI KHOẢN CỦA BẠN CHƯA ĐƯỢC LIÊN KẾT TELEGRAM</Text>
                <LinkUI href={`https://t.me/bat_ho_bank_bot/?start=${user.uuid}`} target="_blank">
                  <Button variant="theme">Liên kết ngay</Button>
                </LinkUI>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </GlobalLayout>
  );
}
