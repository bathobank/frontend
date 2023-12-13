import Link from "next/link";
import { useRouter } from "next/router";

import { useSystemSetting } from "@/hooks/useSystemSetting";

type TMenu = { title: string; link: string };

const NavbarMenu = ({ menus }: { menus: TMenu[] }) => {
  const { asPath } = useRouter();

  return (
    <>
      {menus.map((menu, index) => {
        return (
          <div
            key={`menu-header-${index}`}
            data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
            data-kt-menu-placement="bottom-start"
            className="menu-item menu-here-bg menu-lg-down-accordion me-0 me-lg-2"
          >
            <Link
              href={menu.link}
              className={`menu-link` + (asPath === menu.link ? " active " : "")}
            >
              <span className="menu-title">{menu.title}</span>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export const NavbarGuest = () => {
  const { settings: setting } = useSystemSetting();

  const Menu: TMenu[] = [
    { title: "Trang chủ", link: "/" },
    { title: "Giftcode", link: "/gift-code" },
    { title: "Nhiệm vụ ngày", link: "/daily-mission" },
    { title: "Nổ hũ", link: "/jackpot" },
    { title: "Đăng nhập", link: "/auth/login" },
    { title: "Đăng ký", link: "/auth/register" },
    {
      title: "Box Chat",
      link: setting["box-chat-link"] === "" ? "#" : setting["box-chat-link"],
    },
  ];

  return <NavbarMenu menus={Menu} />;
};

export const NavbarAuthed = () => {
  const { settings: setting } = useSystemSetting();

  const Menu: TMenu[] = [
    { title: "Trang chủ", link: "/" },
    { title: "Giftcode", link: "/gift-code" },
    { title: "Nhiệm vụ ngày", link: "/daily-mission" },
    { title: "Lịch sử chơi", link: "/history" },
    { title: "Nổ hũ", link: "/jackpot" },
    {
      title: "Box Chat",
      link: setting["box-chat-link"] === "" ? "#" : setting["box-chat-link"],
    },
  ];

  return <NavbarMenu menus={Menu} />;
};
