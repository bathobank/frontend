import { useEffect, useState } from "react";

import { TTopWeek } from "@/@types/top-week";
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

  return (
    <div className="p-3 h-100">
      <div
        style={{ border: "1px solid #ffffff0d" }}
        className="rounded-3 h-100"
      >
        <div className="d-flex align-items-center p-3 game-header">
          <i className="!hl-text bi bi-currency-dollar fs-2x"></i>
          <h5 className="mb-0 ms-2 text-white">ĐẠI GIA TUẦN</h5>
        </div>
        <div className="overflow-auto">
          <table className="w-100">
            <thead>
              <tr style={{ borderBottom: "1px solid #ffffff0d" }}>
                <th scope="col" className="text-center py-3">
                  <span className="fs-xl" style={{ color: "#B5B7C8" }}>
                    Hạng
                  </span>
                </th>
                <th scope="col" className="text-center py-3">
                  <span className="fs-xl" style={{ color: "#B5B7C8" }}>
                    Nickname
                  </span>
                </th>
                <th scope="col" className="text-center py-3">
                  <span className="fs-xl" style={{ color: "#B5B7C8" }}>
                    Tổng cược
                  </span>
                </th>
                <th scope="col" className="text-center py-3">
                  <span className="fs-xl" style={{ color: "#B5B7C8" }}>
                    Phần thưởng
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {topWeek.map((top, index) => (
                <tr className="text-center" key={`top-week-${index}`}>
                  <td style={{ minWidth: "80px" }} className="text-center py-3">
                    <span>NO{index + 1}</span>
                  </td>
                  <td
                    style={{ minWidth: "150px" }}
                    className="text-center py-3"
                  >
                    <span>{hiddenText(top.nickname)}</span>
                  </td>
                  <td
                    style={{ minWidth: "150px" }}
                    className="text-center py-3"
                  >
                    <span>{formatMoney(top.money)}</span>
                  </td>
                  <td
                    style={{ minWidth: "150px" }}
                    className="text-center py-3"
                  >
                    <span>{formatMoney(top.reward)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="py-5">
          <p className="italic fs-md text-center">
            PHẦN THƯỞNG TOP SẼ ĐƯỢC TRAO VÀO{" "}
            <span className="hl-text">00:00</span> THỨ{" "}
            <span className="hl-text">2</span> TUẦN TIẾP THEO.
          </p>
        </div>
      </div>
    </div>
  );
};
