import {TBank} from "@/@types/bank";
import {Button} from "@/components/ui/Button";
import {Flex} from "@/components/ui/Flex";
import {Img} from "@/components/ui/Img";
import {Modal} from "@/components/ui/Modal";

type Props = {
  isOpen: boolean;
  bank?: TBank;
  title?: string;
  onClose?: () => void;
};

export const BankQRModal = ({
  isOpen,
  onClose,
  bank
}: Props) => {

  return (
    <Modal
      id='bank-qr-modal'
      isOpen={isOpen}
      title='Bank QR'
      onClose={onClose}>
      <Flex justify="center" className="py-5">
        {bank?.bank_qr && (
          <Img src={bank.bank_qr} className="w-[450px] max-w-full" />
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
