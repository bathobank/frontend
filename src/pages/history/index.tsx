import { TSystemSetting } from "@/@types/system-setting";
import { GlobalLayout } from "@/components/layouts/GlobalLayout";
import { History } from "@/components/pages/Index/History";
import { serverSideGetSystemSetting } from "@/hooks/serverSideGetSystemSetting";
import { useUserHistories } from "@/queries/histories";

export default function HistoryPage({
  systemSettings,
}: {
  systemSettings: TSystemSetting;
}) {
  const historyQuery = useUserHistories(20);

  return (
    <GlobalLayout
      showHeader={false}
      title="Lịch sử chơi"
      systemSettings={systemSettings}
    >
      <History historyQuery={historyQuery} title="LỊCH SỬ CHƠI CỦA BẠN" />
    </GlobalLayout>
  );
}

export const getServerSideProps = serverSideGetSystemSetting;
