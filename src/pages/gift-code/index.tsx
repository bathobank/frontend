import { TPageProp } from "@/@types/page-prop";
import { GlobalLayout } from "@/components/layouts/GlobalLayout";
import { GiftCodeGuest } from "@/components/pages/GiftCode/Guest";
import { GiftCodeUser } from "@/components/pages/GiftCode/User";
import { serverSideGetSystemSetting } from "@/hooks/serverSideGetSystemSetting";
import { useSystemSetting } from "@/hooks/useSystemSetting";
import { useUser } from "@/hooks/useUser";

export default function GiftCode({ systemSettings, user }: TPageProp) {
  useSystemSetting(systemSettings);
  const { isLogined } = useUser(user);

  return (
    <GlobalLayout>
      {isLogined ? <GiftCodeUser /> : <GiftCodeGuest />}
    </GlobalLayout>
  );
}

export const getServerSideProps = serverSideGetSystemSetting;
