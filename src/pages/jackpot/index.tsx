import { useEffect, useState } from "react";

import { TSystemSetting } from "@/@types/system-setting";
import { TUser } from "@/@types/user";
import { GlobalLayout } from "@/components/layouts/GlobalLayout";
import { Button } from "@/components/ui/Button";
import { serverSideGetSystemSetting } from "@/hooks/serverSideGetSystemSetting";
import { useSystemSetting } from "@/hooks/useSystemSetting";
import { useUser } from "@/hooks/useUser";
import { useJackpotQuery } from "@/queries/jackpot";

export default function Jackpot({
  systemSettings,
  user: userDefault,
}: {
  systemSettings: TSystemSetting;
  user?: TUser;
}) {
  useSystemSetting(systemSettings);
  useUser(userDefault);

  const [jackpot, setJackpot] = useState<string>("00000000");
  const jackpotQuery = useJackpotQuery();

  useEffect(() => {
    if (!jackpotQuery) return;
    const jackpotData = jackpotQuery.data.jackpot;
    if (jackpotData >= 1000000) {
      setJackpot(String(jackpotData));
      return;
    }
    const prefix = Array(8 - String(jackpotData).length)
      .fill("0")
      .join("");
    setJackpot(prefix + jackpotData);
  }, [jackpotQuery]);

  return (
    <GlobalLayout title="Nổ hũ">
      <div className="app-container container-xxl">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header justify-content-center">
                <h4 className="card-title">
                  <i className="bi bi-joystick fs-2x !hl-text"></i>
                  <span className="ms-2">NỔ HŨ - JACKPOT</span>
                </h4>
              </div>
              <div className="card-body p-0">
                <div className="p-5 text-center">
                  <p className="fs-xl text-center mb-5">
                    SỐ TIỀN HIỆN TẠI TRONG HŨ ĐANG CHỜ BẠN!
                  </p>
                  <div className="d-flex justify-content-center gap-3 mb-5">
                    {jackpot.split("").map((str, index) => (
                      <span
                        key={`td-jackpot-money-${index}`}
                        className="badge py-3 px-4 fs-7 badge-light-warning"
                      >
                        {str}
                      </span>
                    ))}
                  </div>
                  <div className="mb-5">
                    <Button variant="light">QUAY MIỄN PHÍ NGAY</Button>
                  </div>
                  <div className="fs-xl">
                    <p className="mb-2">
                      <span className="hl-text">JACKPOT</span> là phần quà dành
                      cho những người chơi{" "}
                      <span className="hl-text">may mắn</span>.
                    </p>
                    <p className="mb-2">
                      Bạn hoàn toàn có thể sở hữu{" "}
                      <span className="hl-text">MIỄN PHÍ</span> thông qua việc
                      quay Slot trên <span className="hl-text">Telegram</span>{" "}
                      của <span className="hl-text">ABC.NET</span>
                    </p>
                    <p className="mb-2">CHÚC BẠN MAY MẮN!!!!</p>
                  </div>
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
