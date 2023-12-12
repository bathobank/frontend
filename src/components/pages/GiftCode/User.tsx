import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/useToast";
import { useUserUseGiftCode } from "@/queries/gift-code";
import { defaultOptionReactQueryResponse } from "@/utils/helper";

export const GiftCodeUser = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const userUseGiftCode = useUserUseGiftCode();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const onSubmitGiftCode = () => {
    if (!inputRef.current) return;
    const giftcode = inputRef.current.value.trim();
    if (giftcode === "") {
      toast.error("Chưa nhập GIFTCODE!");
      return;
    }
    userUseGiftCode.mutate(
      { giftcode },
      defaultOptionReactQueryResponse(() => {
        inputRef.current!.value = "";
        inputRef.current!.focus();
      }),
    );
  };

  return (
    <div>
      <div className="w-100 mw-550px mb-6">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nhập Giftcode"
            id="gift_code"
            ref={inputRef}
          />
        </div>
        <div className="text-center">
          <Button variant="light" onClick={onSubmitGiftCode}>
            Nhận thưởng
          </Button>
        </div>
      </div>
      <div className="text-center">
        <p className="italic fs-lg">
          <span className="hl-text fw-bold">LƯU Ý:</span> HỆ THỐNG TỰ ĐỘNG
          KHÓA/CHẶN CÁC TÀI KHOẢN LẠM DỤNG HOẶC SỬ DỤNG CLONE ĐỂ NHẬP CODE.
        </p>
      </div>
    </div>
  );
};
