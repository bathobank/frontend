import { TPageProp } from "@/@types/page-prop";
import { GlobalLayout } from "@/components/layouts/GlobalLayout";
import { GiftCodeUser } from "@/components/pages/GiftCode/User";
import { serverSideGetSystemSetting } from "@/hooks/serverSideGetSystemSetting";
import { useSystemSetting } from "@/hooks/useSystemSetting";

export default function GiftCode({ systemSettings }: TPageProp) {
  useSystemSetting(systemSettings);

  return (
    <GlobalLayout>
      <GiftCodeUser />
    </GlobalLayout>
  );
}

export const getServerSideProps = serverSideGetSystemSetting;
