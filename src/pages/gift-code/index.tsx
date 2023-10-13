import {GlobalLayout} from "@/components/layouts/GlobalLayout";
import {GiftCodeGuest} from "@/components/pages/GiftCode/Guest";
import {GiftCodeUser} from "@/components/pages/GiftCode/User";
import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {Text} from "@/components/ui/Text";
import {useUser} from "@/hooks/useUser";
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';

export default function GiftCode(){
  const {isLogined} = useUser();

  return (
    <GlobalLayout showHeader={false} title="Giftcode">
      <Box className='rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal mt-5 px-3'>
        <Flex justify="center" className="border-b border-[#ffffff0d] py-3">
          <CardGiftcardRoundedIcon className="text-[#ff55a5] mr-3" />
          <Text custom={true}>NHẬN GIFTCODE</Text>
        </Flex>
        <Box className="py-5">
          {isLogined ? (
            <GiftCodeUser />
          ) : (
            <GiftCodeGuest />
          )}
        </Box>
      </Box>
    </GlobalLayout>
  );
}
