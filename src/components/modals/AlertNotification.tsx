import { Button } from "@/components/ui/Button";
import { Flex } from "@/components/ui/Flex";
import { Modal } from "@/components/ui/Modal";
import { Box } from "@/components/ui/Box";

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
      isDark={true}
      title="Thông báo"
    >
      <Box className="py-5 px-3 bg-[#28282d] no-apply-css-base">
        <div
          dangerouslySetInnerHTML={{
            __html: notification,
          }}
        />
      </Box>
      <Flex
        items="center"
        justify="center"
        className="p-6 border-t bg-[#28282d] border-t-[#4a4d5194] rounded-b dark:border-gray-600 gap-[10px]"
      >
        <Button variant="light" onClick={onClose}>
          Đóng
        </Button>
      </Flex>
    </Modal>
  );
};
