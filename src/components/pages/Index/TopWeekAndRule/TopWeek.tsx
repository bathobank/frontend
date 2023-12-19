import { Box } from "@mui/material";
import { useEffect, useState } from "react";

import { TTopWeek } from "@/@types/top-week";
import { Table } from "@/components/ui/Table";
import { useTopWeekQuery } from "@/queries/top-week";
import { formatMoney, hiddenText } from "@/utils/helper";

export const TopWeek = () => {
  const [topWeek, setTopWeek] = useState<TTopWeek[]>([]);
  const topWeekQuery = useTopWeekQuery();

  useEffect(() => {
    if (topWeekQuery) {
      setTopWeek(topWeekQuery.data.top_week);
    }
  }, [topWeekQuery]);

  const headerTable = ["HẠNG", "NICKNAME", "TỔNG CƯỢC", "PHẦN THƯỞNG"];

  return (
    <Box>
      <h3 className="mb-2 text-center">TOP ĐẠI GIA TUẦN</h3>
      <Table headers={headerTable}>
        {topWeek.map((top, index) => (
          <tr className="text-center" key={`top-week-${index}`}>
            <td className="py-[8px] px-[4px] border border-[#ddd] text-center">
              NO{index + 1}
            </td>
            <td className="py-[8px] px-[4px] border border-[#ddd] text-center">
              {hiddenText(top.nickname)}
            </td>
            <td className="py-[8px] px-[4px] border border-[#ddd] text-center">
              {formatMoney(top.money)}
            </td>
            <td className="py-[8px] px-[4px] border border-[#ddd] text-center">
              {formatMoney(top.reward)}
            </td>
          </tr>
        ))}
      </Table>
      <Box className="py-5 text-center">
        <b className="text-[#a94442]">
          Phần thưởng TOP sẽ được trao vào 0:00 Thứ hai.
        </b>
      </Box>
    </Box>
  );
};
