import { Box } from "@/components/ui/Box";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";
import { useToast } from "@/hooks/useToast";
import { useUserUseGiftCode } from "@/queries/gift-code";
import { defaultOptionReactQueryResponse } from "@/utils/helper";
import { useEffect, useRef } from "react";

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
    <Box>
      <Box className="w-full max-w-[550px] m-auto space-y-4 mb-6">
        <Input label="Nhập Giftcode" id="gift_code" ref={inputRef} />
        <Button variant="theme" fullWidth={true} onClick={onSubmitGiftCode}>
          Nhận thưởng
        </Button>
      </Box>
      <Box className="text-center">
        <Text size="xs" className="italic">
          <span className="text-[#ff55a5] font-bold">LƯU Ý:</span> HỆ THỐNG TỰ
          ĐỘNG KHÓA/CHẶN CÁC TÀI KHOẢN LẠM DỤNG HOẶC SỬ DỤNG CLONE ĐỂ NHẬP CODE.
        </Text>
      </Box>
    </Box>
  );
};
