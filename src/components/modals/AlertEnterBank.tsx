import {Button} from "@/components/ui/Button";
import {Flex} from "@/components/ui/Flex";
import {Modal} from "@/components/ui/Modal";
import {Text} from "@/components/ui/Text";
import {LinkUI} from "@/components/ui/Link";
import {useRouter} from "next/router";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
};

export const AlertEnterBank = ({
  isOpen,
  onClose
}: Props) => {
  const {push} = useRouter();

  const gotoBankSetup = () => {
    onClose && onClose();
    setTimeout(() => {
      push('/bank-setup');
    }, 300);
  }

  return (
    <Modal
      id='alert-enter-bank-modal'
      isOpen={isOpen}
      onClose={onClose}
      title='Thông báo'>
      <Flex wrap="wrap" justify="center" className="py-5">
        <Text col='black'>Bạn có trò chơi chiến thắng nhưng chưa nhập thông tin ngân hàng.</Text>
        <Text col='black'>Vui lòng vào <span onClick={gotoBankSetup} className="font-bold cursor-pointer hover:underline text-primary-600">Cài đặt bank</span> để nhập tài khoản nhận tiền!</Text>
      </Flex>
      <Flex items="center" justify="center" className="p-6 border-t border-gray-200 rounded-b dark:border-gray-600 gap-[10px]">
        <Button variant='light' onClick={onClose}>
          Close
        </Button>
      </Flex>
    </Modal>
  );
}
