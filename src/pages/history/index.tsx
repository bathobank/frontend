import { TSystemSetting } from "@/@types/system-setting";
import { TUser } from "@/@types/user";
import { GlobalLayout } from "@/components/layouts/GlobalLayout";
import { History } from "@/components/pages/Index/History";
import { serverSideGetSystemSetting } from "@/hooks/serverSideGetSystemSetting";
import { useSystemSetting } from "@/hooks/useSystemSetting";
import { useUser } from "@/hooks/useUser";
import { useUserHistories } from "@/queries/histories";

export default function HistoryPage({
  systemSettings,
  user: userDefault,
}: {
  systemSettings: TSystemSetting;
  user?: TUser;
}) {
  useSystemSetting(systemSettings);
  useUser(userDefault);
  const historyQuery = useUserHistories(20);

  return (
    <GlobalLayout title="Lịch sử chơi">
      <div className="app-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body p-5">
                <History
                  historyQuery={historyQuery}
                  title="LỊCH SỬ CHƠI CỦA BẠN"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}

export const getServerSideProps = serverSideGetSystemSetting;
