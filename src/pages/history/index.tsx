import { TPageProp } from "@/@types/page-prop";
import { GlobalLayout } from "@/components/layouts/GlobalLayout";
import { History } from "@/components/pages/Index/History";
import { serverSideGetSystemSetting } from "@/hooks/serverSideGetSystemSetting";
import { useSystemSetting } from "@/hooks/useSystemSetting";
import { useUser } from "@/hooks/useUser";
import { useUserHistories } from "@/queries/histories";

export default function HistoryPage({ systemSettings, user }: TPageProp) {
  useSystemSetting(systemSettings);
  useUser(user);

  const historyQuery = useUserHistories(20);

  return (
    <GlobalLayout>
      <History historyQuery={historyQuery} title="LỊCH SỬ CHƠI CỦA BẠN" />
    </GlobalLayout>
  );
}

export const getServerSideProps = serverSideGetSystemSetting;
