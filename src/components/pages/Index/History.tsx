import { useEffect, useState } from "react";

import { THistories, THistoriesQuery } from "@/@types/history";
import { SaoKeModal } from "@/components/modals/SaoKe";
import { Button } from "@/components/ui/Button";
import { formatMoney } from "@/utils/helper";

export const History = ({
  historyQuery,
  title,
  showContent = true,
}: {
  historyQuery: THistoriesQuery | undefined;
  title: string;
  showContent?: boolean;
}) => {
  const [histories, setHistories] = useState<THistories>([]);
  const [isOpenModalSaoKe, setOpenModalSaoKe] = useState<boolean>(false);
  const [contentSaoKe, setContentSaoKe] = useState<
    Record<string, string | object>
  >({});

  useEffect(() => {
    if (historyQuery) {
      setHistories(historyQuery.data.histories);
    } else {
      setHistories([]);
    }
  }, [historyQuery]);

  const openModalSaoKe = (content: Record<string, string | object>) => {
    setContentSaoKe(content);
    setOpenModalSaoKe(true);
  };

  return (
    <>
      <div className="p-3">
        <div style={{ border: "1px solid #ffffff0d" }} className="rounded-3">
          <div className="d-flex align-items-center p-3 game-header">
            <i className="!hl-text bi bi-clock-history fs-2x"></i>
            <h5 className="mb-0 ms-2 text-white">{title}</h5>
          </div>
          <div className="p-3 overflow-x-auto">
            <table className="w-100">
              <thead>
                <tr style={{ borderBottom: "1px solid #ffffff0d" }}>
                  <th scope="col" className="py-3 px-1 text-center">
                    <span className="fs-xl" style={{ color: "#B5B7C8" }}>
                      Trò chơi
                    </span>
                  </th>
                  <th scope="col" className="py-3 px-1 text-center">
                    <span className="fs-xl" style={{ color: "#B5B7C8" }}>
                      Đã chọn
                    </span>
                  </th>
                  <th scope="col" className="py-3 px-1 text-center">
                    <span className="fs-xl" style={{ color: "#B5B7C8" }}>
                      Mã giao dịch
                    </span>
                  </th>
                  <th scope="col" className="py-3 px-1 text-center">
                    <span className="fs-xl" style={{ color: "#B5B7C8" }}>
                      Số tiền
                    </span>
                  </th>
                  <th scope="col" className="py-3 px-1 text-center">
                    <span className="fs-xl" style={{ color: "#B5B7C8" }}>
                      Kết quả
                    </span>
                  </th>
                  {showContent && (
                    <>
                      <th scope="col" className="py-3 px-1 text-center">
                        <span className="fs-xl" style={{ color: "#B5B7C8" }}>
                          Trả thưởng
                        </span>
                      </th>
                      <th scope="col" className="py-3 px-1 text-center">
                        <span className="fs-xl" style={{ color: "#B5B7C8" }}>
                          Sao kê
                        </span>
                      </th>
                    </>
                  )}
                  <th scope="col" className="py-3 px-1 text-center">
                    <span className="fs-xl" style={{ color: "#B5B7C8" }}>
                      Thời gian
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {histories.map((history, index) => (
                  <tr
                    key={`tr-history-${index}`}
                    style={{
                      ...(index > 0 && {
                        borderTop: "1px solid #ffffff0d",
                      }),
                    }}
                  >
                    <td className="py-3 px-1 text-center">
                      <span className="badge py-3 px-4 fs-7 badge-light-info">
                        {history.game_group.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-1 text-center">
                      <span className="badge py-3 px-4 fs-7 badge-light-primary">
                        {history.game_type.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-1 text-center">
                      <span>{history.transaction_code}</span>
                    </td>
                    <td className="py-3 px-1 text-center">
                      <span>{formatMoney(history.money_coming)}</span>
                    </td>
                    <td className="py-3 px-1 text-center">
                      {history.status === "L" ? (
                        <span className="badge py-3 px-4 fs-7 badge-light-danger">
                          Lost
                        </span>
                      ) : (
                        <span className="badge py-3 px-4 fs-7 badge-light-success">
                          Win
                        </span>
                      )}
                    </td>
                    {showContent && (
                      <>
                        <td className="py-3 px-1 text-center">
                          {history.order?.status === "done" && (
                            <span className="badge py-3 px-4 fs-7 badge-light-success">
                              Done
                            </span>
                          )}
                          {history.order?.status === "wait" && (
                            <span className="badge py-3 px-4 fs-7 badge-light-info">
                              Wait
                            </span>
                          )}
                          {history.order?.status === "error" && (
                            <span className="badge py-3 px-4 fs-7 badge-light-danger">
                              Error
                            </span>
                          )}
                          {history.order?.status === "doing" && (
                            <span className="badge py-3 px-4 fs-7 badge-light-primary">
                              Doing
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-1 text-center">
                          <Button
                            variant="light-info"
                            onClick={() => openModalSaoKe(history.content)}
                          >
                            Xem sao kê
                          </Button>
                        </td>
                      </>
                    )}
                    <td className="py-3 px-1 text-center">
                      <span>{history.game_time}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <SaoKeModal
        isOpen={isOpenModalSaoKe}
        onClose={() => setOpenModalSaoKe(false)}
        content={contentSaoKe}
      />
    </>
  );
};
