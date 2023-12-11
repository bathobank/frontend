import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import CardGiftcardRoundedIcon from "@mui/icons-material/CardGiftcardRounded";
import ConfirmationNumberRoundedIcon from "@mui/icons-material/ConfirmationNumberRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useRouter } from "next/router";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { Box } from "@/components/ui/Box";
import { Flex } from "@/components/ui/Flex";
import { Img } from "@/components/ui/Img";
import { LinkUI } from "@/components/ui/Link";
import { Text } from "@/components/ui/Text";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/utils/ui";

type TMenu = {
  title: string;
  icon: ReactNode;
  href: string;
  target: string;
};

const createMenu = (
  title: string,
  href: string,
  icon: ReactNode,
  target = "_self",
): TMenu => {
  return { title, href, icon, target };
};

export const Navbar = ({
  logo,
  author,
  boxChatLink,
}: {
  logo: string;
  author: string;
  boxChatLink: string;
}) => {
  const [menu, setMenu] = useState<TMenu[]>([]);
  const [menuHeight, setMenuHeight] = useState<string>("calc(100vh - 158px)");
  const logoRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);
  const { pathname, push } = useRouter();
  const { isLogined, user, logout } = useUser();

  useEffect(
    () => {
      /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
      let timeoutSetMenu: any = null;

      timeoutSetMenu = setTimeout(() => {
        if (isLogined) {
          setMenu([
            createMenu(
              "Trang chủ",
              "/",
              <HomeRoundedIcon className="!text-[1.25rem]" />,
            ),
            createMenu(
              "Cài đặt bank",
              "/bank-setup",
              <AccountBalanceRoundedIcon className="!text-[1.25rem]" />,
            ),
            createMenu(
              "Giftcode",
              "/gift-code",
              <CardGiftcardRoundedIcon className="!text-[1.25rem]" />,
            ),
            createMenu(
              "Nhiệm vụ ngày",
              "/daily-mission",
              <ConfirmationNumberRoundedIcon className="!text-[1.25rem]" />,
            ),
            createMenu(
              "Nổ hũ",
              "/jackpot",
              <EmojiEventsRoundedIcon className="!text-[1.25rem]" />,
            ),
            createMenu(
              "Lịch sử chơi",
              "/history",
              <HistoryRoundedIcon className="!text-[1.25rem]" />,
            ),
            createMenu(
              "Liên kết telegram",
              "/telegram-connect",
              <SendRoundedIcon className="!text-[1.25rem]" />,
            ),
            createMenu(
              "Đổi mật khẩu",
              "/change-password",
              <ManageAccountsRoundedIcon className="!text-[1.25rem]" />,
            ),
            createMenu(
              "Đăng xuất",
              "action:logout",
              <ExitToAppRoundedIcon className="!text-[1.25rem]" />,
            ),
            createMenu(
              "Box chat",
              boxChatLink === "" ? "#" : boxChatLink,
              <QuestionAnswerRoundedIcon className="!text-[1.25rem]" />,
              "_blank",
            ),
          ]);
        } else {
          setMenu([
            createMenu(
              "Trang chủ",
              "/",
              <HomeRoundedIcon className="!text-[1.25rem]" />,
            ),
            createMenu(
              "Giftcode",
              "/gift-code",
              <CardGiftcardRoundedIcon className="!text-[1.25rem]" />,
            ),
            createMenu(
              "Nhiệm vụ ngày",
              "/daily-mission",
              <ConfirmationNumberRoundedIcon className="!text-[1.25rem]" />,
            ),
            createMenu(
              "Nổ hũ",
              "/jackpot",
              <EmojiEventsRoundedIcon className="!text-[1.25rem]" />,
            ),
            createMenu(
              "Đăng nhập",
              "/auth/login",
              <HistoryRoundedIcon className="!text-[1.25rem]" />,
            ),
            createMenu(
              "Đăng ký",
              "/auth/register",
              <SendRoundedIcon className="!text-[1.25rem]" />,
            ),
            createMenu(
              "Box chat",
              boxChatLink === "" ? "#" : boxChatLink,
              <QuestionAnswerRoundedIcon className="!text-[1.25rem]" />,
              "_blank",
            ),
          ]);
        }
        updateMenuHeigth();
      }, 300);

      return () => {
        clearTimeout(timeoutSetMenu);
      };
    },
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [isLogined],
  );

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const actions: { [key: string]: any } = {
    logout() {
      logout();
      push(menu[0].href);
    },
  };

  const callAction = (action?: string) => {
    if (!action) return;
    if (typeof actions[action] === "function") {
      actions[action]();
    }
  };

  const updateMenuHeigth = useCallback(() => {
    const logoHeight = logoRef.current ? logoRef.current.offsetHeight : 0;
    const copyrightHeight = copyrightRef.current
      ? copyrightRef.current.offsetHeight
      : 0;
    setMenuHeight(`calc(100vh - ${logoHeight + copyrightHeight}px)`);
  }, [logoRef]);

  return (
    <Box className="bg-[#28282d] min-h-[100vh]">
      <Box ref={logoRef}>
        <Flex justify="center" className="py-6 border-b-2 border-b-[#ff55a5]">
          <LinkUI className="w-[180px]" href="/">
            <Img src={logo} className="w-[180px]" />
          </LinkUI>
        </Flex>
        {isLogined && (
          <Flex
            justify="between"
            className="px-6 py-4 border-b border-b-[#ffffff0d]"
          >
            <Flex>
              <Img src="/images/user.png" size={40} circle={true} />
              <Box className="pl-3">
                <Text className="m-0 text-[12px] text-[#c7c7c7]">Xin chào</Text>
                <Text>{user?.nickname}</Text>
              </Box>
            </Flex>
            <Box
              onClick={() => callAction("logout")}
              className="group rounded-lg bg-[#ffffff0d] px-3 py-2 cursor-pointer transition-all hover:bg-[#cbd4ff3d]"
            >
              <ExitToAppRoundedIcon className="text-[#fff] transition-all group-hover:text-[#ff55a5]" />
            </Box>
          </Flex>
        )}
      </Box>
      <Box
        className="py-5 overflow-auto"
        style={{ height: menuHeight, maxHeight: menuHeight }}
      >
        {menu.map((menu, index) => {
          const hrefAction = menu.href.split(":");
          let isAction: boolean = false;
          let action: string | undefined = undefined;
          if (hrefAction.length > 1 && hrefAction[0] === "action") {
            isAction = true;
            action = hrefAction[1];
          }
          return isAction ? (
            <Box
              key={`box-menu-${index}`}
              onClick={() => callAction(action)}
              className="text-white transition-all hover:text-[#ff55a5] cursor-pointer"
            >
              <Flex className="py-3 pl-6 gap-[10px]">
                {menu.icon}
                <span className="uppercase text-[13px] relative top-[2px]">
                  {menu.title}
                </span>
              </Flex>
            </Box>
          ) : (
            <LinkUI
              key={`box-menu-${index}`}
              href={menu.href}
              target={menu.target}
              underline={false}
              className={cn(
                "text-white transition-all",
                pathname === menu.href
                  ? "text-[#ff55a5]"
                  : "hover:text-[#ff55a5]",
              )}
            >
              <Flex className="py-3 pl-6 gap-[10px]">
                {menu.icon}
                <span className="uppercase text-[13px] relative top-[2px]">
                  {menu.title}
                </span>
              </Flex>
            </LinkUI>
          );
        })}
      </Box>
      <Box
        className="pl-6 py-4 border-t-2 border-t-[#ff55a5]"
        ref={copyrightRef}
      >
        <Text col="white" size="sm">
          ©{author}, 2018—2023.
        </Text>
        <Text col="white" size="sm">
          Create by {author} Ltd.
        </Text>
      </Box>
    </Box>
  );
};
