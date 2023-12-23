import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

import { DangerAlert } from "@/components/ui/Alert";
import { DangerButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/hooks/useToast";
import { useUserUseGiftCode } from "@/queries/gift-code";
import { defaultOptionReactQueryResponse } from "@/utils/helper";

export const GiftCodeUser = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const userUseGiftCode = useUserUseGiftCode();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const onSubmitGiftCode = () => {
    if (!inputRef.current || !phoneRef.current) return;

    const giftcode = inputRef.current.value.trim();
    if (giftcode === "") {
      toast.error("Chưa nhập GIFTCODE!");
      return;
    }

    const phone = phoneRef.current.value.trim();
    if (phone === "") {
      toast.error("Chưa nhập SDT!");
      return;
    }

    userUseGiftCode.mutate(
      { giftcode, phone },
      defaultOptionReactQueryResponse(() => {
        inputRef.current!.value = "";
        phoneRef.current!.value = "";
        inputRef.current!.focus();
      }),
    );
  };

  return (
    <Box className="w-full max-w-[550px] m-auto space-y-4 mb-6">
      <Card title="Nhận GIFTCODE">
        <Box mb={2}>
          <Box mb={2}>
            <Input placeholder="Nhập Giftcode" id="gift_code" ref={inputRef} />
          </Box>
          <Box mb={2}>
            <Input placeholder="Nhập Sdt nhận tiền" id="phone" ref={phoneRef} />
          </Box>
          <Box textAlign="center">
            <DangerButton onClick={onSubmitGiftCode}>Nhận thưởng</DangerButton>
          </Box>
        </Box>
        <DangerAlert className="text-center">
          Phải nhập SDT đúng định dạng. Ví dụ: 0978******
        </DangerAlert>
      </Card>
    </Box>
  );
};
