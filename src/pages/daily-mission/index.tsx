import { Box } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

import { TMission } from "@/@types/mission";
import { TPageProp } from "@/@types/page-prop";
import { GlobalLayout } from "@/components/layouts/GlobalLayout";
import { Card } from "@/components/ui/Card";
import { DangerAlert } from "@/components/ui/DangerAlert";
import { Table } from "@/components/ui/Table";
import { Text } from "@/components/ui/Text";
import { serverSideGetSystemSetting } from "@/hooks/serverSideGetSystemSetting";
import { useSystemSetting } from "@/hooks/useSystemSetting";
import { useUser } from "@/hooks/useUser";
import { useMissionQuery } from "@/queries/mission/all";
import { formatMoney } from "@/utils/helper";
import { cn } from "@/utils/ui";

export default function DailyMission({
  systemSettings,
  user: userDefault,
}: TPageProp) {
  useSystemSetting(systemSettings);

  const [missions, setMissions] = useState<TMission[]>([]);
  const missionQuery = useMissionQuery();
  const { isLogined, user } = useUser(userDefault);

  useEffect(() => {
    if (missionQuery) {
      setMissions(missionQuery.data.missions);
    }
  }, [missionQuery]);

  const headerTable = ["MỐC CHƠI", "THƯỞNG", "TRẠNG THÁI"];

  return (
    <GlobalLayout>
      <Box className="w-full max-w-[550px] m-auto">
        <Card title="NHIỆM VỤ NGÀY">
          <Box className="text-center">
            {isLogined ? (
              <Box py={2} fontSize="16px">
                Tổng chơi trong ngày:{" "}
                <span className="text-[#ff55a5] font-bold">
                  {formatMoney(user?.money_daily ?? 0)}
                </span>
              </Box>
            ) : (
              <DangerAlert className="text-center !rounded-t-[0px] !mb-3">
                ĐỂ NHẬN THƯỞNG, VUI LÒNG{" "}
                <Link href="/auth/login">ĐĂNG NHẬP</Link> HOẶC{" "}
                <Link href="/auth/register">ĐĂNG KÝ</Link> NHANH
              </DangerAlert>
            )}
          </Box>
          <Table headers={headerTable}>
            {missions.map((mission, index) => (
              <tr
                className={cn(
                  "text-center",
                  index > 0 ? "border-t border-t-[#ffffff0d]" : "",
                )}
                key={`mission-list-${index}`}
              >
                <td className="py-[8px] px-[4px] border border-[#ddd] text-center">
                  <Text size="sm">{formatMoney(mission.milestone)}</Text>
                </td>
                <td className="py-[8px] px-[4px] border border-[#ddd] text-center">
                  <Text size="sm">{formatMoney(mission.bonus)}</Text>
                </td>
                <td className="py-[8px] px-[4px] border border-[#ddd] text-center">
                  {mission.is_done === 0 ? (
                    <span className="text-[12px] px-2 py-1 bg-[#d9534f] rounded select-none text-white">
                      Chưa đạt
                    </span>
                  ) : (
                    <span className="text-[12px] px-2 py-1 bg-[#5cb85c] rounded select-none text-white">
                      Đã đạt
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </Table>
        </Card>
      </Box>
    </GlobalLayout>
  );
}

export const getServerSideProps = serverSideGetSystemSetting;
