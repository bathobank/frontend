import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

import { DangerButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
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
    <Box className="w-full max-w-[550px] m-auto space-y-4 mb-6">
      <Card title="Nhận GIFTCODE">
        <Box mb={2}>
          <Box mb={2}>
            <Input placeholder="Nhập Giftcode" id="gift_code" ref={inputRef} />
          </Box>
          <Box textAlign="center">
            <DangerButton onClick={onSubmitGiftCode}>Nhận thưởng</DangerButton>
          </Box>
        </Box>
        <Box className="text-center">
          <p>Hệ thống tự động KHOÁ TÀI KHOẢN nếu phát hiện gian lận.</p>
          <p>Tham gia nhóm trên Telegram để nhận Code</p>
        </Box>
      </Card>
    </Box>
  );
};
