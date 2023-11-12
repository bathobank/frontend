import {Button} from "@/components/ui/Button";
import {Flex} from "@/components/ui/Flex";
import {Modal} from "@/components/ui/Modal";
import {Box} from "@/components/ui/Box";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  notification: string;
};

export const AlertNotification = ({
  isOpen,
  onClose,
  notification
}: Props) => {

  return (
    <Modal
      id='alert-notification-modal'
      isOpen={isOpen}
      onClose={onClose}
      title='Thông báo'>
      <Box className="py-5 px-3">
        <div dangerouslySetInnerHTML={{
          __html: notification
        }} />
      </Box>
      <Flex items="center" justify="center" className="p-6 border-t border-gray-200 rounded-b dark:border-gray-600 gap-[10px]">
        <Button variant='light' onClick={onClose}>
          Close
        </Button>
      </Flex>
    </Modal>
  );
}
