import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import { useBankReceiveQuery } from "@/queries/bank/receive";
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
  const { user } = useUser();
  const toast = useToast();
  const inputAmount = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bankReceiveQuery) {
      const bankReceiveData = bankReceiveQuery.data.banks;
      const bankSelectData: TBankOption[] = [];
      for (const bank of bankReceiveData) {
        bankSelectData.push({
          label: bank.bank.short_name,
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

  const generateQrGame = () => {
    if (!user || !document) return;

    const bankChecked = document.querySelector('[name="bank-value"]:checked');
    if (!bankChecked) {
      toast.error("Hãy chọn ngân hàng nhận!");
      return;
    }

    const bankIndex: number = Number(
      bankChecked.getAttribute("data-index") ?? "0",
    );

    if (typeof bankSelects[bankIndex] === "undefined") {
      toast.error("Ngân hàng nhận không tồn tại!");
      return;
    }

    if (formData.money === 0) {
      toast.error("Hãy nhập số tiền!");
      return;
    }

    const bankData = bankSelects[bankIndex];

    let qrFormat = "";
    if (bankData.code === "TCB") {
      qrFormat = "ElYgubG";
    } else if (bankData.code === "VCB") {
      qrFormat = "lvejI6J";
    } else if (bankData.code === "MB") {
      qrFormat = "MuJWKcH";
    }
    if (qrFormat === "") {
      toast.error("Ngân hàng không được hỗ trợ!");
      return;
    }
    const mgs = `${user.nickname} ${gameType}`;
    const url = `https://api.vietqr.io/image/${bankData.value}-${bankData.number}-${qrFormat}.png?accountName=${bankData.name}&amount=${formData.money}&addInfo=${mgs}`;
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
      maxWidth="750px"
    >
      <div
        className="d-flex flex-wrap justify-content-between gap-3 mb-5"
        data-kt-buttons="true"
      >
        {bankSelects.map((bank, index: number) => (
          <label
            key={`start-game-bank-select-${index}`}
            htmlFor={`bank-value-${bank.value + bank.number}`}
            style={{ width: "calc(50% - .75rem)" }}
            className="btn btn-outline btn-outline-dashed btn-active-light-primary d-flex flex-stack text-start px-6 py-2"
          >
            <div className="d-flex align-items-center me-2">
              <div className="form-check form-check-custom form-check-solid form-check-primary me-6">
                <input
                  className="form-check-input"
                  type="radio"
                  name="bank-value"
                  data-index={index}
                  id={`bank-value-${bank.value + bank.number}`}
                  value={bank.value + bank.number}
                />
              </div>
              <div className="flex-grow-1">
                <h3 className="d-flex align-items-center fs-xl fw-bold flex-wrap">
                  {bank.label}
                </h3>
                <div className="fw-semibold opacity-50 text-primary fs-xl">
                  {bank.number}
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>
      <div className="form-group mb-5">
        <label htmlFor="input_amount" className="fs-lg mb-2">
          Nhập số tiền chơi
        </label>
        <input
          type="text"
          ref={inputAmount}
          id="input_amount"
          placeholder="Nhập số tiền chơi"
          className="form-control"
        />
      </div>
      <div className="text-center">
        <Button
          variant="theme"
          className="w-[60%] min-w-[200px]"
          onClick={generateQrGame}
          disabled={disableButtonGenQr}
        >
          Tạo mã QR
        </Button>
      </div>
      <div className="py-3 d-flex justify-content-center">
        {urlQr !== "" && <Img src={urlQr} size={400} />}
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
