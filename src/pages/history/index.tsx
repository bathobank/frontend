import {GlobalLayout} from "@/components/layouts/GlobalLayout";
import {History} from "@/components/pages/Index/History";
import {useUserHistories} from "@/queries/histories";
import {useEffect} from "react";
import {useLoading} from "@/hooks/useLoading";
import {serverSideGetSystemSetting} from "@/hooks/serverSideGetSystemSetting";
import {TSystemSetting} from "@/@types/system-setting";

export default function HistoryPage({systemSettings}: {systemSettings: TSystemSetting}){
  const historyQuery = useUserHistories(20);
  const loading = useLoading();

  useEffect(() => {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    let timeoutClearLoading: any = null;
    timeoutClearLoading = setTimeout(loading.hide, 500);

    return () => {
      clearTimeout(timeoutClearLoading);
    }
  },
  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  []
  );

  return (
    <GlobalLayout showHeader={false} title="Lịch sử chơi" systemSettings={systemSettings}>
      <History historyQuery={historyQuery} title="LỊCH SỬ CHƠI CỦA BẠN" />
    </GlobalLayout>
  );
}

export const getServerSideProps = serverSideGetSystemSetting;
