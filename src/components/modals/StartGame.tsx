import { Box, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ReactSelect from "react-select";

import { SuccessButton } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/hooks/useToast";
import { useBankReceiveQuery } from "@/queries/bank/receive";
import { qrBankGameQuery } from "@/queries/qr-bank-game";
import { formatMoney } from "@/utils/helper";

type TBankOption = {
  value: string;
  code: string;
  label: string;
  name: string;
  number: string;
};

type TForm = {
  bank?: TBankOption;
  money: number;
};

type Props = {
  isOpen: boolean;
  gameGroup: string;
  gameType: string;
  title?: string;
  onClose?: () => void;
};

export const StartGameModal = ({
  isOpen,
  onClose,
  gameType,
  gameGroup,
}: Props) => {
  const [bankSelects, setBankSelects] = useState<TBankOption[]>([]);
  const [formData, setFormData] = useState<TForm>({
    bank: undefined,
    money: 0,
  });
  const [urlQr, setUrlQr] = useState<string>("");
  const [disableButtonGenQr, setDisableBtnGenQr] = useState<boolean>(false);
  const bankReceiveQuery = useBankReceiveQuery();
  const toast = useToast();
  const inputAmount = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bankReceiveQuery) {
      const bankReceiveData = bankReceiveQuery.data.banks;
      const bankSelectData: TBankOption[] = [];
      for (const bank of bankReceiveData) {
        bankSelectData.push({
          label: `${bank.bank.short_name} - ${bank.number}`,
          code: bank.bank.code,
          value: bank.bank.bin,
          name: bank.name,
          number: bank.number,
        });
      }
      setBankSelects(bankSelectData);
    }
  }, [bankReceiveQuery]);

  useEffect(
    () => {
      setUrlQr("");
      setFormData({ ...formData, money: 0 });
      if (inputAmount.current) {
        inputAmount.current.value = "";
      }
    },
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [isOpen],
  );

  useEffect(
    () => {
      if (bankSelects.length === 1) {
        setFormData({ ...formData, bank: bankSelects[0] });
      }
    },
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [bankSelects],
  );

  useEffect(() => {
    if (!inputAmount.current) return;
    const formatAmountOnInput = () => {
      let amount = inputAmount.current!.value;
      if (amount === "") return;
      amount = amount.replaceAll(",", "");
      amount = formatMoney(amount);
      inputAmount.current!.value = amount;
    };
    const addAmountValueToForm = () => {
      let money = inputAmount.current!.value;
      if (money === "") {
        setFormData({ ...formData, money: 0 });
      } else {
        money = money.replaceAll(",", "");
        setFormData({ ...formData, money: parseInt(money) });
      }
    };
    inputAmount.current.addEventListener("input", formatAmountOnInput);
    inputAmount.current.addEventListener("change", addAmountValueToForm);
    return () => {
      if (inputAmount.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        inputAmount.current.removeEventListener("input", formatAmountOnInput);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        inputAmount.current.removeEventListener("change", addAmountValueToForm);
      }
    };
  }, [inputAmount, formData]);

  const setBankSelected = (bank: TBankOption) => {
    setFormData({ ...formData, bank });
  };

  const generateQrGame = async () => {
    if (!document || !inputAmount.current) return;
    setUrlQr("");

    if (!formData.bank) {
      toast.error("Hãy chọn ngân hàng nhận!");
      return;
    }

    const amount = inputAmount.current!.value.replaceAll(",", "");
    const money = parseInt(amount) || 0;

    if (money <= 0) {
      toast.error("Hãy nhập số tiền!");
      return;
    }

    const bankData = formData.bank;

    const result = await qrBankGameQuery({
      account_number: bankData.number,
      amount: amount,
      message: gameType,
    });

    setUrlQr(result.data.url);
    setDisableBtnGenQr(true);
    setTimeout(() => {
      setDisableBtnGenQr(false);
    }, 3000);
  };

  return (
    <Modal
      id="start-game-modal"
      isOpen={isOpen}
      onClose={onClose}
      title={`Chơi game - ${gameGroup} - ${gameType.toUpperCase()}`}
    >
      <Box mb={2}>
        <ReactSelect
          className="text-sm w-full mb-3"
          classNamePrefix="select"
          isDisabled={false}
          isClearable={false}
          isSearchable={true}
          id="bank_start_game"
          noOptionsMessage={() => "Không có ngân hàng phù hợp"}
          options={bankSelects}
          value={formData.bank}
          inputId="bank_start_game"
          instanceId="instance_bank_start_game"
          placeholder="Chọn ngân hàng nhận chuyển khoản"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onChange={setBankSelected}
        />
        <Box className="w-full mb-3">
          <Input
            placeholder="Nhập số tiền chơi"
            ref={inputAmount}
            id="input_amount"
          />
        </Box>
        <Box className="text-center">
          <SuccessButton
            className="w-[60%] min-w-[200px]"
            onClick={generateQrGame}
            disabled={disableButtonGenQr}
          >
            Tạo mã QR
          </SuccessButton>
        </Box>
      </Box>
      {urlQr !== "" && (
        <Stack justifyContent="center" alignItems="center">
          <Img src={urlQr} className="!w-[400px] max-w-full" />
        </Stack>
      )}
    </Modal>
  );
};
