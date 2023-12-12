import { useRouter } from "next/router";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
};

export const AlertEnterBank = ({ isOpen, onClose }: Props) => {
  const { push } = useRouter();

  const gotoBankSetup = () => {
    onClose && onClose();
    setTimeout(() => {
      push("/bank-setup");
    }, 300);
  };

  return (
    <Modal
      id="alert-enter-bank-modal"
      isOpen={isOpen}
      onClose={onClose}
      title="Thông báo"
    >
      <div className="d-flex justify-content-center flex-wrap py-5 fs-lg">
        <p>Bạn có trò chơi chiến thắng nhưng chưa nhập thông tin ngân hàng.</p>
        <p>
          Vui lòng vào{" "}
          <span
            onClick={gotoBankSetup}
            className="hl-text fw-bold cursor-pointer"
          >
            Cài đặt bank
          </span>{" "}
          để nhập tài khoản nhận tiền!
        </p>
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
