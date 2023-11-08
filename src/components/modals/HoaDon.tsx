import {Button} from "@/components/ui/Button";
import {Flex} from "@/components/ui/Flex";
import {Img} from "@/components/ui/Img";
import {Modal} from "@/components/ui/Modal";
import {Box} from "@/components/ui/Box";

type Props = {
  isOpen: boolean;
  img: string|null;
  onClose?: () => void;
};

export const HoaDonModal = ({
  isOpen,
  onClose,
  img
}: Props) => {

  return (
    <Modal
      id='hoa-don-modal'
      isOpen={isOpen}
      title='Hóa đơn'
      onClose={onClose}>
      <Flex justify="center" className="py-5">
        <Box className="max-h-[calc(100vh-250px)] overflow-y-auto">
          {img && <Img src={img} className="w-[450px] max-w-full" />}
        </Box>
      </Flex>
      <Flex items="center" justify="center" className="p-6 border-t border-gray-200 rounded-b dark:border-gray-600 gap-[10px]">
        <Button variant='light' onClick={onClose}>
          Close
        </Button>
      </Flex>
    </Modal>
  );
}
