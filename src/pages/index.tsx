import { Box, Stack } from "@mui/material";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { TPageProp } from "@/@types/page-prop";
import { GlobalLayout } from "@/components/layouts/GlobalLayout";
import { AlertNotification } from "@/components/modals/AlertNotification";
import { BankList } from "@/components/pages/Index/BankList";
import { GameGroup } from "@/components/pages/Index/GameGroup";
import { GameList } from "@/components/pages/Index/GameList";
import { History } from "@/components/pages/Index/History";
import { TopWeek } from "@/components/pages/Index/TopWeekAndRule/TopWeek";
import { Card } from "@/components/ui/Card";
import { DangerAlert } from "@/components/ui/DangerAlert";
import { DangerButton } from "@/components/ui/DangerButton";
import { InfoButton } from "@/components/ui/InfoButton";
import { SuccessButton } from "@/components/ui/SuccessButton";
import { WarningAlert } from "@/components/ui/WarningAlert";
import { WarningButton } from "@/components/ui/WarningButton";
import { serverSideGetSystemSetting } from "@/hooks/serverSideGetSystemSetting";
import { useSystemSetting } from "@/hooks/useSystemSetting";
import { useUser } from "@/hooks/useUser";
import { useUserHistories } from "@/queries/histories";
import { useHistoryWin } from "@/queries/histories/win";

export default function Home({ systemSettings, user }: TPageProp) {
  useSystemSetting(systemSettings);
  useUser(user);

  const [isOpenModalNotif, setOpenModalNotif] = useState<boolean>(false);
  const historyQuery = useUserHistories(20);
  const historyWin = useHistoryWin();

  const openModalNotification = useCallback(() => {
    if (systemSettings.notification !== "") {
      setTimeout(() => {
        setOpenModalNotif(true);
      }, 10);
    }
  }, [systemSettings.notification]);

  useEffect(() => {
    openModalNotification();
  }, [openModalNotification]);

  return (
    <>
      <GlobalLayout>
        <GameList />
        <Stack
          gap={1}
          direction="row"
          m="auto"
          flexWrap="wrap"
          justifyContent="center"
        >
          <Link href="/gift-code">
            <DangerButton>Giftcode</DangerButton>
          </Link>
          <Link href="/daily-mission">
            <DangerButton>Nhiệm vụ ngày</DangerButton>
          </Link>
          <DangerButton disabled={true}>Kênh phát code</DangerButton>
        </Stack>
        <Stack
          gap={1}
          direction="row"
          m="auto"
          flexWrap="wrap"
          justifyContent="center"
        >
          <SuccessButton onClick={() => openModalNotification()}>
            THÔNG BÁO
          </SuccessButton>
          <InfoButton>BOX TELEGRAM</InfoButton>
          <WarningButton>Hướng Dẫn</WarningButton>
        </Stack>
        <Card title="CÁCH CHƠI">
          <Stack gap={2}>
            <WarningAlert>
              <b>Chú ý 🔞: Vui lòng đọc kỹ QUY ĐỊNH trước khi chơi!</b>
            </WarningAlert>
            <Box>
              <p>Chuyển tiền vào 1 trong các tài khoản ngân hàng sau:</p>
              <BankList />
            </Box>
            <Box>
              <p>Nội dung chuyển:</p>
              <GameGroup />
            </Box>
            <Box>
              <DangerAlert className="flex flex-col gap-[.5rem]">
                <p>
                  Nên chuyển cùng ngân hàng để được xứ lý nhanh nhất, khác ngân
                  hàng có nguy cơ không được trả thưởng
                </p>
                <p>
                  Dùng ngân hàng khác chuyển đến VCB sẽ tính số giao dịch của
                  VCB
                </p>
                <p>
                  Vui lòng chuyển đúng nội dung, Sai nội dung sẽ không được hoàn
                  tiền.
                </p>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  gap={1}
                >
                  <SuccessButton className="btn-ui-sm !font-bold">
                    Tiền nhận
                  </SuccessButton>
                  <b>=</b>
                  <DangerButton className="btn-ui-sm !font-bold">
                    Tiền cược
                  </DangerButton>
                  <b>X</b>
                  <DangerButton className="btn-ui-sm !font-bold">
                    Tỉ lệ
                  </DangerButton>
                </Stack>
              </DangerAlert>
            </Box>
          </Stack>
        </Card>
        <History title="LỊCH SỬ CHƠI CỦA BẠN" historyQuery={historyQuery} />
        <History
          title="LỊCH SỬ THẮNG"
          historyQuery={historyWin}
          isPersonal={false}
        />
        <TopWeek />
      </GlobalLayout>
      <AlertNotification
        isOpen={isOpenModalNotif}
        onClose={() => {
          setOpenModalNotif(false);
        }}
      />
    </>
  );
}

export const getServerSideProps = serverSideGetSystemSetting;
