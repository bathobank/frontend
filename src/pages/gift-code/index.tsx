import CardGiftcardRoundedIcon from "@mui/icons-material/CardGiftcardRounded";

import { TSystemSetting } from "@/@types/system-setting";
import { GlobalLayout } from "@/components/layouts/GlobalLayout";
import { GiftCodeGuest } from "@/components/pages/GiftCode/Guest";
import { GiftCodeUser } from "@/components/pages/GiftCode/User";
import { Box } from "@/components/ui/Box";
import { Flex } from "@/components/ui/Flex";
import { Text } from "@/components/ui/Text";
import { serverSideGetSystemSetting } from "@/hooks/serverSideGetSystemSetting";
import { useUser } from "@/hooks/useUser";

export default function GiftCode({
  systemSettings,
}: {
  systemSettings: TSystemSetting;
}) {
  const { isLogined } = useUser();

  return (
    <GlobalLayout
      showHeader={false}
      title="Giftcode"
      systemSettings={systemSettings}
    >
      <Box className="rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal mt-5 px-3">
        <Flex justify="center" className="border-b border-[#ffffff0d] py-3">
          <CardGiftcardRoundedIcon className="text-[#ff55a5] mr-3" />
          <Text custom={true}>NHẬN GIFTCODE</Text>
        </Flex>
        <Box className="py-5">
          {isLogined ? <GiftCodeUser /> : <GiftCodeGuest />}
        </Box>
      </Box>
    </GlobalLayout>
  );
}

export const getServerSideProps = serverSideGetSystemSetting;
