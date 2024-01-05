import { Box, Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "react-query";

import {
  TDailyCheckpoint,
  TDailyCheckpointHistory,
} from "@/@types/daily-checkpoint";
import { WarningAlert } from "@/components/ui/Alert";
import { PrimaryButton } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Table } from "@/components/ui/Table";
import { useSystemSetting } from "@/hooks/useSystemSetting";
import {
  DAILY_CHECKPOINT_QK,
  useDailyCheckpointMutation,
  useDailyCheckpointQuery,
} from "@/queries/daily-checkpoint";
import {
  defaultOptionReactQueryResponse,
  formatMoney,
  uuidv4,
} from "@/utils/helper";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
};

export const DailyCheckpoint = ({ isOpen, onClose }: Props) => {
  const [checkpoint, setCheckpoint] = useState<TDailyCheckpoint | null>(null);
  const [histories, setHistories] = useState<TDailyCheckpointHistory[]>([]);
  const [timeCountdown, setTimeCountdown] = useState<number>(0);
  const dailyCheckpointMutate = useDailyCheckpointMutation();
  const dailyCheckpointQuery = useDailyCheckpointQuery();
  const queryClient = useQueryClient();
  const {
    settings: {
      daily_checkpoint: { time, min },
    },
  } = useSystemSetting();

  useEffect(() => {
    if (!isOpen) {
      setCheckpoint(null);
      return;
    }

    queryClient.invalidateQueries({ queryKey: [DAILY_CHECKPOINT_QK] });

    const timeout = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: [DAILY_CHECKPOINT_QK] });
    }, 3000);

    return () => {
      clearInterval(timeout);
    };
  }, [isOpen, queryClient]);

  useEffect(() => {
    if (dailyCheckpointQuery) {
      const section = dailyCheckpointQuery.data.section;
      setCheckpoint(typeof section === "object" ? section : null);
      setHistories(dailyCheckpointQuery.data.histories);
    }
  }, [dailyCheckpointQuery]);

  useEffect(
    () => {
      if (!checkpoint) return;
      setTimeCountdown(checkpoint.time);
    },
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [checkpoint],
  );

  useEffect(() => {
    if (timeCountdown <= 0) {
      setTimeCountdown(0);
      queryClient.invalidateQueries({ queryKey: [DAILY_CHECKPOINT_QK] });
      return;
    }
    const timeout = setTimeout(() => {
      setTimeCountdown(timeCountdown - 1);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [queryClient, timeCountdown]);

  const dailyCheckpointAction = () => {
    dailyCheckpointMutate.mutate(
      undefined,
      defaultOptionReactQueryResponse(() => {
        queryClient.invalidateQueries({ queryKey: [DAILY_CHECKPOINT_QK] });
      }),
    );
  };

  const timeCouting = useMemo(() => {
    const minutes = Math.floor(timeCountdown / 60);
    const seconds = timeCountdown - minutes * 60;
    return `${minutes} phút ${seconds} giây`;
  }, [timeCountdown]);

  const headers = [
    "Mã phiên",
    "Điểm danh",
    "Người thắng",
    "Số tiền thắng",
    "Thời gian",
  ];

  return (
    <Modal
      id="daily-checkpoint-rule-modal"
      isOpen={isOpen}
      onClose={onClose}
      width="800px"
      title="Điểm danh Nhận quà Miễn Phí"
      submitBtn={
        <>
          {checkpoint && !checkpoint.joined && (
            <PrimaryButton onClick={dailyCheckpointAction}>
              Điểm danh
            </PrimaryButton>
          )}
        </>
      }
    >
      <Stack gap={2}>
        <Box className="border shadow rounded-md overflow-hidden">
          <Box className="text-center bg-[#2c2c83] text-white text-center text-lg py-3">
            Điểm Danh
          </Box>
          {!checkpoint ? (
            <h4 className="text-center py-3 px-2">
              Không có phiên điểm danh nào đang mở
            </h4>
          ) : (
            <>
              <Stack direction="row">
                <Box className="w-[50%] font-bold text-[16px] text-center p-3 border-r-2">
                  Mã Phiên
                </Box>
                <Box className="w-[50%] font-bold text-[16px] text-center p-3">
                  {checkpoint.code}
                </Box>
              </Stack>
              <Stack direction="row" className="bg-[#dddddd88]">
                <Box className="w-[50%] font-bold text-[16px] text-center p-3 border-r-2">
                  Thưởng
                </Box>
                <Box className="w-[50%] text-[16px] text-center p-3">
                  {formatMoney(checkpoint.money_min)} đ -{" "}
                  {formatMoney(checkpoint.money_max)} đ
                </Box>
              </Stack>
              <Stack direction="row">
                <Box className="w-[50%] font-bold text-[16px] text-center p-3 border-r-2">
                  Đã điểm danh
                </Box>
                <Box className="w-[50%] text-[16px] text-center p-3">
                  {formatMoney(checkpoint.total_join)}
                </Box>
              </Stack>
              <Stack direction="row" className="bg-[#dddddd88]">
                <Box className="w-[50%] font-bold text-[16px] text-center p-3 border-r-2">
                  Thời gian
                </Box>
                <Box className="w-[50%] text-[16px] text-center p-3">
                  {timeCouting}
                </Box>
              </Stack>
            </>
          )}
        </Box>
        <Table headers={headers}>
          {histories.map((history) => (
            <tr key={"tr-history-dc-" + uuidv4()}>
              <td className="py-[8px] px-[4px] border border-[#ddd] min-w-[100px] text-center">
                {history.section_code}
              </td>
              <td className="py-[8px] px-[4px] border border-[#ddd] min-w-[50px] text-center">
                {history.joined}
              </td>
              <td className="py-[8px] px-[4px] border border-[#ddd] min-w-[90px] text-center">
                {history.nickname}
              </td>
              <td className="py-[8px] px-[4px] border border-[#ddd] min-w-[90px] text-center">
                {formatMoney(history.money)}
              </td>
              <td className="py-[8px] px-[4px] border border-[#ddd] min-w-[160px] text-center">
                {history.time}
              </td>
            </tr>
          ))}
        </Table>
        <WarningAlert className="!pl-7 !pr-4">
          <ul style={{ listStyle: "circle" }}>
            <li className="text-[16px]">
              Mỗi phiên điểm danh, các bạn có <b>{formatMoney(time)} phút</b> để
              điểm danh.
            </li>
            <li className="text-[16px]">
              Mỗi phiên cần tối thiểu <b>{min}</b> người điểm danh mới được
              tính. Phiên không đủ người điểm danh sẽ bị hủy.
            </li>
            <li className="text-[16px]">
              Khi hết thời gian, người may mắn sẽ nhận được số tiền của phiên
              đó.
            </li>
            <li className="text-[16px]">
              Sau khi kết thúc 1 phiên điểm danh, <b>10 giây</b> sau sẽ bắt đầu
              phiên tiếp theo.
            </li>
            <li className="text-[16px]">
              <b>&quot;Điểm danh nhận quà&quot;</b> chỉ hoạt động từ{" "}
              <b>7h - 24h</b>
            </li>
          </ul>
        </WarningAlert>
      </Stack>
    </Modal>
  );
};
