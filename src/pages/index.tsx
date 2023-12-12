import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { TSystemSetting } from "@/@types/system-setting";
import { TUser } from "@/@types/user";
import { GameMenu } from "@/components/layouts/GameMenu";
import { GlobalLayout } from "@/components/layouts/GlobalLayout";
import { AlertEnterBank } from "@/components/modals/AlertEnterBank";
import { AlertNotification } from "@/components/modals/AlertNotification";
import { BankList } from "@/components/pages/Index/BankList";
import { GameGroup } from "@/components/pages/Index/GameGroup";
import { History } from "@/components/pages/Index/History";
import { GameRule } from "@/components/pages/Index/TopWeekAndRule/GameRule";
import { TopWeek } from "@/components/pages/Index/TopWeekAndRule/TopWeek";
import { serverSideGetSystemSetting } from "@/hooks/serverSideGetSystemSetting";
import { useSystemSetting } from "@/hooks/useSystemSetting";
import { useUser } from "@/hooks/useUser";
import { useHasOrderWaitQuery } from "@/queries/has-order-wait";
import { useHistoryWin } from "@/queries/histories/win";
import { getGameOpen } from "@/stores/slices/game";

export default function Home({
  systemSettings,
  user: userDefault,
}: {
  systemSettings: TSystemSetting;
  user?: TUser;
}) {
  useSystemSetting(systemSettings);
  useUser(userDefault);

  const [hasOrderWait, setHasOrderWait] = useState<boolean>(false);
  const [isOpenModalNotif, setOpenModalNotif] = useState<boolean>(false);
  const gameOpen: string = useSelector(getGameOpen);
  const hasOrderWaitQuery = useHasOrderWaitQuery();
  const historyWin = useHistoryWin();

  const openModalEnterBank = useCallback(() => {
    if (hasOrderWaitQuery) {
      setTimeout(() => {
        setHasOrderWait(hasOrderWaitQuery.data.has_order_wait);
      }, 10);
    }
  }, [hasOrderWaitQuery]);

  const openModalNotification = useCallback(() => {
    if (systemSettings.notification !== "") {
      setTimeout(() => {
        setOpenModalNotif(true);
      }, 500);
    }
  }, [systemSettings.notification]);

  useEffect(
    () => {
      if (systemSettings.notification === "") {
        openModalEnterBank();
      } else {
        openModalNotification();
      }
    },
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [systemSettings.notification, hasOrderWaitQuery],
  );

  const title: string | undefined = useMemo(() => {
    if (gameOpen === "cltx") return "Chẵn lẻ - Tài xỉu";
    if (gameOpen === "cltx2") return "Chẵn lẻ - Tài xỉu - Cộng 2 số";
    if (gameOpen === "gap3") return "Gấp 3";
    if (gameOpen === "tong3so") return "Tổng 3 số";
    if (gameOpen === "1phan3") return "Một phần 3";
    if (gameOpen === "xien") return "Xiên số";
    if (gameOpen === "doanso") return "Đoán số";
    return gameOpen;
  }, [gameOpen]);

  return (
    <GlobalLayout title={title}>
      <div className="app-container">
        <div className="row mb-5">
          <div className="col-xl-6">
            <div className="card h-100">
              <div className="card-body p-0">
                <div className="d-flex">
                  <div
                    className="menu-left d-flex flex-column p-3 gap-2"
                    style={{
                      width: "150px",
                      borderRight: "1px solid #ffffff0d",
                    }}
                  >
                    <GameMenu />
                  </div>
                  <div
                    className="menu-right p-3"
                    style={{
                      width: "calc(100% - 150px)",
                    }}
                  >
                    <GameGroup
                      gameOpen={gameOpen}
                      gameData={systemSettings.games}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="card h-100">
              <div className="card-body p-0">
                <BankList />
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <History
                  historyQuery={historyWin}
                  title="LỊCH SỬ CHƠI GẦN ĐÂY"
                  showContent={false}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-body p-0">
                <TopWeek />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-body p-0">
                <GameRule />
              </div>
            </div>
          </div>
        </div>
      </div>

      <AlertEnterBank
        isOpen={hasOrderWait}
        onClose={() => setHasOrderWait(false)}
      />

      {systemSettings.notification !== "" && (
        <AlertNotification
          isOpen={isOpenModalNotif}
          onClose={() => {
            setOpenModalNotif(false);
            openModalEnterBank();
          }}
          notification={systemSettings.notification}
        />
      )}
    </GlobalLayout>
  );
}

export const getServerSideProps = serverSideGetSystemSetting;
