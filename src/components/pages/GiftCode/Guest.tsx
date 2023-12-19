import { Box } from "@mui/material";
import Link from "next/link";

import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";

export const GiftCodeGuest = () => {
  return (
    <Box className="w-full max-w-[580px] m-auto space-y-4 mb-6">
      <Card title="Nhận GIFTCODE">
        <Box mb={3} textAlign="center">
          <Text>
            <span className="text-[#ff55a5]">GIFTCODE</span> là món quà mà chúng
            tôi gửi tặng tới những người chơi để tri ân.
          </Text>
          <Text>
            Người chơi có thể nhận được thông qua việc tham gia các sự kiện trên{" "}
            <span className="text-[#ff55a5]">Website</span> hoặc{" "}
            <span className="text-[#ff55a5]">Group Telegram</span> do chúng tôi
            tổ chức.
          </Text>
        </Box>
        <Box textAlign="center">
          ĐỂ LẤY NHẬN GIFTCODE, VUI LÒNG{" "}
          <Link href="/auth/login">ĐĂNG NHẬP</Link> HOẶC{" "}
          <Link href="/auth/register">ĐĂNG KÝ</Link> NHANH
        </Box>
      </Card>
    </Box>
  );
};
