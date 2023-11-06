import {Button} from "@/components/ui/Button";
import {Flex} from "@/components/ui/Flex";
import {Img} from "@/components/ui/Img";
import {Modal} from "@/components/ui/Modal";

type Props = {
  isOpen: boolean;
  bank_qr: string;
  title?: string;
  onClose?: () => void;
};

export const BankQRModal = ({
  isOpen,
  onClose,
  bank_qr
}: Props) => {

  return (
    <Modal
      id='bank-qr-modal'
      isOpen={isOpen}
      title='Bank QR'
      onClose={onClose}>
      <Flex justify="center" className="py-5">
        {bank_qr !== '' && (
          <Img src={bank_qr} className="w-[450px] max-w-full" />
        )}
      </Flex>
      <Flex items="center" justify="center" className="p-6 border-t border-gray-200 rounded-b dark:border-gray-600 gap-[10px]">
        <Button variant='light' onClick={onClose}>
          Close
        </Button>
      </Flex>
    </Modal>
  );
}
