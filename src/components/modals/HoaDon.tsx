import { Box } from "@mui/material";

import { Img } from "@/components/ui/Img";
import { Modal } from "@/components/ui/Modal";

type Props = {
  isOpen: boolean;
  img: string | null;
  onClose?: () => void;
};

export const HoaDonModal = ({ isOpen, onClose, img }: Props) => {
  return (
    <Modal id="hoa-don-modal" isOpen={isOpen} title="Hóa đơn" onClose={onClose}>
      <Box className="max-h-[calc(100vh-250px)] overflow-y-auto">
        {img && <Img src={img} className="w-[450px] max-w-full" />}
      </Box>
    </Modal>
  );
};
