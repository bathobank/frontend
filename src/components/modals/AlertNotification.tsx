import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  notification: string;
};

export const AlertNotification = ({ isOpen, onClose, notification }: Props) => {
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
      <div
        style={{ borderTop: "1px solid #ffffff0d", textAlign: "right" }}
        className="mt-5 pt-5"
      >
        <Button variant="light-info" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
};
