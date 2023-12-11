import { Box } from "@/components/ui/Box";
import { LinkUI } from "@/components/ui/Link";
import { Text } from "@/components/ui/Text";

export const GiftCodeGuest = () => {
  return (
    <Box className="text-center">
      <Box className="mb-3">
        <Text>
          <span className="text-[#ff55a5]">GIFTCODE</span> là món quà mà chúng
          tôi gửi tặng tới những người chơi để tri ân.
        </Text>
        <Text>
          Người chơi có thể nhận được thông qua việc tham gia các sự kiện trên{" "}
          <span className="text-[#ff55a5]">Website</span> hoặc{" "}
          <span className="text-[#ff55a5]">Group Telegram</span> do chúng tôi tổ
          chức.
        </Text>
      </Box>
      <Text size="sm">
        VUI LÒNG{" "}
        <LinkUI href="/auth/login" className="text-[#ff55a5]">
          ĐĂNG NHẬP
        </LinkUI>{" "}
        HOẶC{" "}
        <LinkUI href="/auth/register" className="text-[#ff55a5]">
          ĐĂNG KÝ NHANH
        </LinkUI>{" "}
        ĐỂ NHẬN THƯỞNG
      </Text>
    </Box>
  );
};
