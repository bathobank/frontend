import { PrimaryButton } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useSystemSetting } from "@/hooks/useSystemSetting";
import { useDailyCheckpointMutation } from "@/queries/daily-checkpoint";
import { defaultOptionReactQueryResponse } from "@/utils/helper";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
};

export const DailyCheckpoint = ({ isOpen, onClose }: Props) => {
  const {
    settings: {
      daily_checkpoint: { min, step },
    },
  } = useSystemSetting();
  const dailyCheckpointMutate = useDailyCheckpointMutation();

  const dailyCheckpointAction = () => {
    dailyCheckpointMutate.mutate(
      undefined,
      defaultOptionReactQueryResponse(onClose),
    );
  };

  return (
    <Modal
      id="daily-checkpoint-rule-modal"
      isOpen={isOpen}
      onClose={onClose}
      title="Điểm danh hằng ngày"
      submitBtn={
        <PrimaryButton onClick={dailyCheckpointAction}>Điểm danh</PrimaryButton>
      }
    >
      <ol>
        <li className="text-[1rem] mb-2">
          Khi đạt đủ <b>{min}</b> người điểm danh thì bắt đầu chọn ra người may
          mắn nhận thưởng.
        </li>
        <li className="text-[1rem] mb-2">
          Từ lần chọn thưởng đầu tiên, cứ sau mỗi <b>{step}</b> người điểm danh
          sẽ chọn người trúng thưởng tiếp theo.
        </li>
        <li className="text-[1rem] mb-2">
          Trong cùng 1 ngày, người đã trúng thưởng sẽ không được thưởng nữa.
        </li>
      </ol>
    </Modal>
  );
};
