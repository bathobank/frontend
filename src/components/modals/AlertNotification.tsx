import { Modal } from "@/components/ui/Modal";
import { useSystemSetting } from "@/hooks/useSystemSetting";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
};

export const AlertNotification = ({ isOpen, onClose }: Props) => {
  const {
    settings: { notification },
  } = useSystemSetting();

  return (
    <Modal
      id="alert-notification-modal"
      isOpen={isOpen}
      onClose={onClose}
      title="Thông báo"
    >
      <div
        dangerouslySetInnerHTML={{
          __html: notification,
        }}
      />
    </Modal>
  );
};
