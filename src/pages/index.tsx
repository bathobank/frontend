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
import { DangerAlert, WarningAlert } from "@/components/ui/Alert";
import {
  DangerButton,
  InfoButton,
  SuccessButton,
  WarningButton,
} from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
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
          gap="2px"
          direction="row"
          m="auto"
          flexWrap="wrap"
          justifyContent="center"
        >
          <Link href="/gift-code">
            <DangerButton>Giftcode</DangerButton>
          </Link>
          <Link href={systemSettings["box-giftcode-link"]} target="_blank">
            <DangerButton>Kênh phát code</DangerButton>
          </Link>
        </Stack>
        <Stack
          gap="2px"
          direction="row"
          m="auto"
          flexWrap="wrap"
          justifyContent="center"
        >
          <SuccessButton onClick={() => openModalNotification()}>
            THÔNG BÁO
          </SuccessButton>
          <Link href={systemSettings["box-chat-link"]} target="_blank">
            <InfoButton>BOX TELEGRAM</InfoButton>
          </Link>
          <Link href={systemSettings["guide-link"]} target="_blank">
            <WarningButton>Hướng Dẫn</WarningButton>
          </Link>
        </Stack>
        <Card title="CÁCH CHƠI">
          <Stack gap={2}>
            <WarningAlert>
              <b>Chú ý 🔞: Vui lòng đọc kỹ QUY ĐỊNH trước khi chơi!</b>
            </WarningAlert>
            <Box>
              <p>
                Chuyển tiền vào 1 trong các tài khoản <b>ZaloPay</b> sau:
              </p>
              <BankList />
            </Box>
            <Box>
              <p>Nội dung chuyển:</p>
              <GameGroup />
            </Box>
            <Box>
              <DangerAlert className="flex flex-col gap-[.5rem]">
                <p className="text-center">
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
        <History
          title="LỊCH SỬ THẮNG"
          historyQuery={historyWin}
          isPersonal={false}
        />
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
