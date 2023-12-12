import Link from "next/link";

import { TSystemSetting } from "@/@types/system-setting";
import { TUser } from "@/@types/user";
import { GlobalLayout } from "@/components/layouts/GlobalLayout";
import { Button } from "@/components/ui/Button";
import { serverSideGetSystemSetting } from "@/hooks/serverSideGetSystemSetting";
import { useSystemSetting } from "@/hooks/useSystemSetting";
import { useUser } from "@/hooks/useUser";

export default function TelegramConnect({
  systemSettings,
  user: userDefault,
}: {
  systemSettings: TSystemSetting;
  user?: TUser;
}) {
  useSystemSetting(systemSettings);
  const { user } = useUser(userDefault);

  return (
    <GlobalLayout title="Liên kết">
      <div className="app-container container-lg">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header justify-content-center">
                <h4 className="card-title">
                  <i className="bi bi-shield-lock fs-2x !hl-text"></i>
                  <span className="ms-2">LIÊN KẾT TELEGRAM</span>
                </h4>
              </div>
              <div className="card-body p-5">
                <div className="m-auto w-100 mw-550px">
                  {user && (
                    <div className="py-6">
                      {user.telegram_id ? (
                        <div className="text-center">
                          <p className="fs-lg">
                            Tài khoản của bạn đã được liên kết Telegram. Truy
                            cập{" "}
                            <Link
                              href="https://t.me/bat_ho_bank_bot"
                              target="_blank"
                            >
                              @bat_ho_bank
                            </Link>{" "}
                            ngay!
                          </p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <p className="fs-lg mb-3">
                            TÀI KHOẢN CỦA BẠN CHƯA ĐƯỢC LIÊN KẾT TELEGRAM
                          </p>
                          <Link
                            href={`https://t.me/bat_ho_bank_bot/?start=${user.uuid}`}
                            target="_blank"
                          >
                            <Button variant="light">Liên kết ngay</Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}

export const getServerSideProps = serverSideGetSystemSetting;
