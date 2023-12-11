import { Button } from "@/components/ui/Button";
import { Flex } from "@/components/ui/Flex";
import { Img } from "@/components/ui/Img";
import { Modal } from "@/components/ui/Modal";
import { Box } from "@/components/ui/Box";
import ReactSelect from "react-select";
import { useEffect, useRef, useState } from "react";
import { useBankReceiveQuery } from "@/queries/bank/receive";
import { useUser } from "@/hooks/useUser";
import { Input } from "@/components/ui/Input";
import { formatMoney } from "@/utils/helper";
import { useToast } from "@/hooks/useToast";

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
  const { user } = useUser();
  const toast = useToast();
  const inputAmount = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bankReceiveQuery) {
      const bankReceiveData = bankReceiveQuery.data.banks;
      const bankSelectData: TBankOption[] = [];
      for (const bank of bankReceiveData) {
        bankSelectData.push({
          label: bank.bank.code,
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

  const generateQrGame = () => {
    if (!user) return;
    if (formData.money === 0 || !formData.bank) {
      toast.error("Hãy chọn ngân hàng và nhập số tiền!");
      return;
    }
    let qrFormat = "";
    if (formData.bank.code === "TCB") {
      qrFormat = "ElYgubG";
    } else if (formData.bank.code === "VCB") {
      qrFormat = "lvejI6J";
    } else if (formData.bank.code === "MB") {
      qrFormat = "MuJWKcH";
    }
    if (qrFormat === "") {
      toast.error("Ngân hàng không được hỗ trợ!");
      return;
    }
    const mgs = `${user.nickname} ${gameType}`;
    const url = `https://api.vietqr.io/image/${formData.bank.value}-${formData.bank.number}-${qrFormat}.png?accountName=${formData.bank.name}&amount=${formData.money}&addInfo=${mgs}`;
    setUrlQr(url);
    setDisableBtnGenQr(true);
    setTimeout(() => {
      setDisableBtnGenQr(false);
    }, 3000);
  };

  return (
    <Modal
      id="start-game-modal"
      isOpen={isOpen}
      title={`Chơi game - ${gameGroup.toUpperCase()} - ${gameType.toUpperCase()}`}
      onClose={onClose}
    >
      <Box className="p-5">
        <Box>
          <Flex wrap="wrap" justify="between">
            <ReactSelect
              className="text-sm w-full lg:w-[49%] mb-3"
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
            <Box className="w-full lg:w-[49%] mb-3">
              <Input
                placeholder="Nhập số tiền chơi"
                ref={inputAmount}
                id="input_amount"
              />
            </Box>
          </Flex>
          <Box className="text-center">
            <Button
              variant="theme"
              className="w-[60%] min-w-[200px]"
              onClick={generateQrGame}
              disabled={disableButtonGenQr}
            >
              Tạo mã QR
            </Button>
          </Box>
        </Box>
        <Flex justify="center" className="py-3">
          {urlQr !== "" && <Img src={urlQr} className="w-[400px] max-w-full" />}
        </Flex>
      </Box>
      <Flex
        items="center"
        justify="center"
        className="p-6 border-t border-gray-200 rounded-b dark:border-gray-600 gap-[10px]"
      >
        <Button variant="light" onClick={onClose}>
          Close
        </Button>
      </Flex>
    </Modal>
  );
};
