import Link from "next/link";

export const GiftCodeGuest = () => {
  return (
    <div className="text-center">
      <div className="mb-3">
        <p className="fs-xl">
          <span className="hl-text fw-bold">GIFTCODE</span> là món quà mà chúng
          tôi gửi tặng tới những người chơi để tri ân.
        </p>
        <p className="fs-xl">
          Người chơi có thể nhận được thông qua việc tham gia các sự kiện trên{" "}
          <span className="hl-text fw-bold">Website</span> hoặc{" "}
          <span className="hl-text fw-bold">Group Telegram</span> do chúng tôi
          tổ chức.
        </p>
      </div>
      <p className="fs-xl">
        VUI LÒNG{" "}
        <Link href="/auth/login" className="hl-text">
          ĐĂNG NHẬP
        </Link>{" "}
        HOẶC{" "}
        <Link href="/auth/register" className="hl-text">
          ĐĂNG KÝ NHANH
        </Link>{" "}
        ĐỂ NHẬN THƯỞNG
      </p>
    </div>
  );
};
