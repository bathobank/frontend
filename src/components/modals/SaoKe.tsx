import {Button} from "@/components/ui/Button";
import {Flex} from "@/components/ui/Flex";
import {Img} from "@/components/ui/Img";
import {Modal} from "@/components/ui/Modal";

type Props = {
  isOpen: boolean;
  img: string|null;
  onClose?: () => void;
};

export const SaoKeModal = ({
  isOpen,
  onClose,
  img
}: Props) => {

  return (
    <Modal
      id='bank-qr-modal'
      isOpen={isOpen}
      title='Sao Kê'
      onClose={onClose}>
      <Flex justify="center" className="py-5">
        {img && <Img src={img} className="w-[450px] max-w-full" />}
      </Flex>
      <Flex items="center" justify="center" className="p-6 border-t border-gray-200 rounded-b dark:border-gray-600 gap-[10px]">
        <Button variant='light' onClick={onClose}>
          Close
        </Button>
      </Flex>
    </Modal>
  );
}
