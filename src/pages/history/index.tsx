import {GlobalLayout} from "@/components/layouts/GlobalLayout";
import {History} from "@/components/pages/Index/History";
import {useUserHistories} from "@/queries/histories";
import {useEffect} from "react";
import {useLoading} from "@/hooks/useLoading";

export default function HistoryPage(){
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
    <GlobalLayout showHeader={false} title="Lịch sử chơi">
      <History historyQuery={historyQuery} title="LỊCH SỬ CHƠI CỦA BẠN" />
    </GlobalLayout>
  );
}
