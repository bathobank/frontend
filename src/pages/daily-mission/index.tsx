import Link from "next/link";
import { useEffect, useState } from "react";

import { TMission } from "@/@types/mission";
import { TSystemSetting } from "@/@types/system-setting";
import { TUser } from "@/@types/user";
import { GlobalLayout } from "@/components/layouts/GlobalLayout";
import { serverSideGetSystemSetting } from "@/hooks/serverSideGetSystemSetting";
import { useSystemSetting } from "@/hooks/useSystemSetting";
import { useUser } from "@/hooks/useUser";
import { useMissionQuery } from "@/queries/mission/all";
import { formatMoney } from "@/utils/helper";

export default function DailyMission({
  systemSettings,
  user: userDefault,
}: {
  systemSettings: TSystemSetting;
  user?: TUser;
}) {
  useSystemSetting(systemSettings);
  const { isLogined, user } = useUser(userDefault);

  const [missions, setMissions] = useState<TMission[]>([]);
  const missionQuery = useMissionQuery();

  useEffect(() => {
    if (missionQuery) {
      setMissions(missionQuery.data.missions);
    }
  }, [missionQuery]);

  return (
    <GlobalLayout title="Nhiệm vụ ngày">
      <div className="app-container container-lg">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header justify-content-center">
                <h4 className="card-title">
                  <i className="bi bi-ticket-detailed fs-2x !hl-text"></i>
                  <span className="ms-2">NHIỆM VỤ NGÀY</span>
                </h4>
              </div>
              <div className="card-body p-0">
                <div className="p-5">
                  <div className="text-center mb-5">
                    {isLogined ? (
                      <p className="fs-xl mb-0">
                        Tổng chơi trong ngày:{" "}
                        <span className="hl-text">
                          {formatMoney(user?.money_daily ?? 0)}
                        </span>
                      </p>
                    ) : (
                      <p className="fs-lg mb-0">
                        VUI LÒNG{" "}
                        <Link href="/auth/login" className="hl-text">
                          ĐĂNG NHẬP
                        </Link>{" "}
                        HOẶC{" "}
                        <Link href="/auth/register" className="hl-text">
                          ĐĂNG KÝ NHANH
                        </Link>{" "}
                        ĐỂ NHẬN THƯỞNG
                      </p>
                    )}
                  </div>
                  <div className="text-center">
                    <div
                      className="w-100 mw-450px m-auto rounded-3"
                      style={{ border: "1px solid #ffffff0d" }}
                    >
                      <table className="w-100">
                        <thead>
                          <tr style={{ borderBottom: "1px solid #ffffff0d" }}>
                            <th scope="col" className="py-3">
                              <span style={{ color: "#808290" }}>MỐC CHƠI</span>
                            </th>
                            <th scope="col" className="py-3">
                              <span style={{ color: "#808290" }}>THƯỞNG</span>
                            </th>
                            <th scope="col" className="py-3">
                              <span style={{ color: "#808290" }}>
                                TRẠNG THÁI
                              </span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {missions.map((mission, index) => (
                            <tr
                              style={{
                                textAlign: "center",
                                ...(index > 0 && {
                                  borderTop: "1px solid #ffffff0d",
                                }),
                              }}
                              key={`mission-list-${index}`}
                            >
                              <td className="py-3">
                                <span style={{ color: "#808290" }}>
                                  {formatMoney(mission.milestone)}
                                </span>
                              </td>
                              <td className="py-3">
                                <span style={{ color: "#808290" }}>
                                  {formatMoney(mission.bonus)}
                                </span>
                              </td>
                              <td className="py-3">
                                {mission.is_done === 0 ? (
                                  <span className="badge py-3 px-4 fs-7 badge-light-warning">
                                    Chưa đạt
                                  </span>
                                ) : (
                                  <span className="badge py-3 px-4 fs-7 badge-light-success">
                                    Đã đạt
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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
