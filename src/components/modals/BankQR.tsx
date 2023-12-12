import { Button } from "@/components/ui/Button";
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
    <Modal id="bank-qr-modal" isOpen={isOpen} title="Bank QR" onClose={onClose}>
      <div className="rounded-3" style={{ backgroundColor: "#cfcfcf" }}>
        {bank_qr !== "" && (
          <Img src={bank_qr} className="w-[450px] max-w-full" />
        )}
      </div>
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
