import { Box } from "@mui/material";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { THistories, THistoriesQuery } from "@/@types/history";
import { SaoKeModal } from "@/components/modals/SaoKe";
import { DangerAlert } from "@/components/ui/Alert";
import { Table } from "@/components/ui/Table";
import { Text } from "@/components/ui/Text";
import { useUser } from "@/hooks/useUser";
import { formatMoney } from "@/utils/helper";
import { cn } from "@/utils/ui";

export const History = ({
  historyQuery,
  title,
  isPersonal = true,
}: {
  historyQuery: THistoriesQuery | undefined;
  title: string;
  isPersonal?: boolean;
}) => {
  const [histories, setHistories] = useState<THistories>([]);
  const [isOpenModalSaoKe, setOpenModalSaoKe] = useState<boolean>(false);
  const [contentSaoKe, setContentSaoKe] = useState<
    Record<string, string | object>
  >({});
  const { isLogined } = useUser();

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

  const headerTable = useMemo(() => {
    const header: string[] = [];
    if (!isPersonal) {
      header.push("Nickname");
    }
    header.push("Trò chơi");
    header.push("Đã chọn");
    header.push("Số tiền");
    header.push("Kết quả");
    if (isPersonal) {
      header.push("Trả thưởng");
      header.push("Mã giao dịch");
      header.push("Sao kê");
    }
    return header;
  }, [isPersonal]);

  return (
    <Box>
      <h3 className="mb-2 text-center">{title}</h3>
      <Table headers={headerTable}>
        {!isLogined && isPersonal ? (
          <tr>
            <td colSpan={headerTable.length}>
              <DangerAlert className="text-center !rounded-t-[0px]">
                ĐỂ XEM LỊCH SỬ, VUI LÒNG{" "}
                <Link href="/auth/login">ĐĂNG NHẬP</Link> HOẶC{" "}
                <Link href="/auth/register">ĐĂNG KÝ</Link> NHANH
              </DangerAlert>
            </td>
          </tr>
        ) : (
          <>
            {histories.map((history, index) => (
              <tr
                key={`tr-history-${index}`}
                className={cn(index > 0 ? "border-t border-t-[#ffffff0d]" : "")}
              >
                {!isPersonal && (
                  <td className="py-[8px] px-[4px] border border-[#ddd] text-center min-w-[90px]">
                    {history.user.nickname.substring(0, 4)}****
                  </td>
                )}
                <td className="py-[8px] px-[4px] border border-[#ddd] text-center min-w-[60px]">
                  {history.game_group.toUpperCase()}
                </td>
                <td className="py-[8px] px-[4px] border border-[#ddd] text-center min-w-[50px]">
                  <code>{history.game_type.toUpperCase()}</code>
                </td>
                <td className="py-[8px] px-[4px] border border-[#ddd] text-center min-w-[95px]">
                  {formatMoney(history.money_coming)}
                </td>
                <td className="py-[8px] px-[4px] border border-[#ddd] text-center min-w-[55px]">
                  {history.status === "L" ? (
                    <span className="text-[12px] px-2 py-1 bg-[#d9534f] rounded select-none text-white">
                      LOST
                    </span>
                  ) : (
                    <span className="text-[12px] px-2 py-1 bg-[#5cb85c] rounded select-none text-white">
                      WIN
                    </span>
                  )}
                </td>
                {isPersonal && (
                  <>
                    <td className="py-[8px] px-[4px] border border-[#ddd] text-center">
                      {history.order?.status === "done" && (
                        <span className="text-[12px] px-2 py-1 bg-[#5cb85c] rounded select-none text-white">
                          DONE
                        </span>
                      )}
                      {history.order?.status === "wait" && (
                        <span className="text-[12px] px-2 py-1 bg-yellow-300 text-gray-900 rounded select-none text-white">
                          WAIT
                        </span>
                      )}
                      {history.order?.status === "error" && (
                        <span className="text-[12px] px-2 py-1 bg-[#d9534f] rounded select-none text-white">
                          ERROR
                        </span>
                      )}
                    </td>
                    <td className="py-[8px] px-[4px] border border-[#ddd] text-center min-w-[150px]">
                      {history.transaction_code}
                    </td>
                    <td className="py-[8px] px-[4px] border border-[#ddd] text-center min-w-[100px]">
                      <Text
                        size="sm"
                        className="hover:underline text-blue-500 hover:text-blue-700 cursor-pointer"
                        onClick={() => openModalSaoKe(history.content)}
                      >
                        Xem sao kê
                      </Text>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </>
        )}
      </Table>
      {isPersonal && (
        <SaoKeModal
          isOpen={isOpenModalSaoKe}
          onClose={() => setOpenModalSaoKe(false)}
          content={contentSaoKe}
        />
      )}
    </Box>
  );
};
