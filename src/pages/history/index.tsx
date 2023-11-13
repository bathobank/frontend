import {GlobalLayout} from "@/components/layouts/GlobalLayout";
import {History} from "@/components/pages/Index/History";
import {useUserHistories} from "@/queries/histories";
import {serverSideGetSystemSetting} from "@/hooks/serverSideGetSystemSetting";
import {TSystemSetting} from "@/@types/system-setting";

export default function HistoryPage({systemSettings}: {systemSettings: TSystemSetting}){
  const historyQuery = useUserHistories(20);

  return (
    <GlobalLayout showHeader={false} title="Lịch sử chơi" systemSettings={systemSettings}>
      <History historyQuery={historyQuery} title="LỊCH SỬ CHƠI CỦA BẠN" />
    </GlobalLayout>
  );
}

export const getServerSideProps = serverSideGetSystemSetting;
