import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";

import { LoadingIcon } from "@/components/icons/LoadingIcon";
import { Img } from "@/components/ui/Img";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/hooks/useToast";
import { qrBankGameQuery } from "@/queries/qr-bank-game";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  accountNumber: string;
};

export const BankQRModal = ({ isOpen, onClose, accountNumber }: Props) => {
  const [bankQr, setBankQr] = useState<string>("");
  const toast = useToast();

  useEffect(
    () => {
      const getQrBankGame = async () => {
        try {
          const result = await qrBankGameQuery({
            account_number: accountNumber,
          });
          setBankQr(result.data.url);
        } catch (e) {
          onClose();
          toast.error((e as { message: string }).message);
        }
      };
      isOpen ? getQrBankGame() : setBankQr("");
    },
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [isOpen],
  );

  return (
    <Modal
      id="bank-qr-modal"
      isOpen={isOpen}
      onClose={onClose}
      title="QR nhận tiền"
    >
      <Stack direction="row" justifyContent="center">
        {bankQr !== "" ? (
          <Img src={bankQr} className="!w-[400px] !max-w-full !h-full" />
        ) : (
          <Box>
            <LoadingIcon />
          </Box>
        )}
      </Stack>
    </Modal>
  );
};
