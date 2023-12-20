import { Box } from "@mui/material";
import Link from "next/link";

import { TPageProp } from "@/@types/page-prop";
import { GlobalLayout } from "@/components/layouts/GlobalLayout";
import { SuccessButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { serverSideGetSystemSetting } from "@/hooks/serverSideGetSystemSetting";
import { useSystemSetting } from "@/hooks/useSystemSetting";
import { useUser } from "@/hooks/useUser";

export default function TelegramConnect({ systemSettings, user }: TPageProp) {
  useSystemSetting(systemSettings);
  useUser(user);

  return (
    <GlobalLayout>
      <Card title="LIÊN KẾT TELEGRAM">
        {user && (
          <Box className="pt-5">
            {user.telegram_id ? (
              <Box className="text-center">
                <h4>
                  Tài khoản của bạn đã được liên kết Telegram. Truy cập{" "}
                  <Link href="https://t.me/bat_ho_bank_bot" target="_blank">
                    @bat_ho_bank
                  </Link>{" "}
                  ngay!
                </h4>
              </Box>
            ) : (
              <Box className="text-center">
                <h4 className="text-center mb-3">
                  TÀI KHOẢN CỦA BẠN CHƯA ĐƯỢC LIÊN KẾT TELEGRAM
                </h4>
                <Link
                  href={`https://t.me/bat_ho_bank_bot/?start=${user.uuid}`}
                  target="_blank"
                >
                  <SuccessButton>Liên kết ngay</SuccessButton>
                </Link>
              </Box>
            )}
          </Box>
        )}
      </Card>
    </GlobalLayout>
  );
}

export const getServerSideProps = serverSideGetSystemSetting;
