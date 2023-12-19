import { Stack } from "@mui/material";

import { Img } from "@/components/ui/Img";
import { Modal } from "@/components/ui/Modal";

type Props = {
  isOpen: boolean;
  bank_qr: string;
  title?: string;
  onClose?: () => void;
};

export const BankQRModal = ({ isOpen, onClose, bank_qr }: Props) => {
  return (
    <Modal
      id="bank-qr-modal"
      isOpen={isOpen}
      onClose={onClose}
      title="QR nhận tiền"
    >
      <Stack direction="row" justifyContent="center">
        {bank_qr !== "" && (
          <Img src={bank_qr} className="!w-[400px] !max-w-full !h-full" />
        )}
      </Stack>
    </Modal>
  );
};
