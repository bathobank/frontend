import { Box, Container, Fade, Popper, Stack } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { MouseEvent, PropsWithChildren, useMemo, useState } from "react";

import { DangerButton } from "@/components/ui/DangerButton";
import { DefaultButton } from "@/components/ui/DefaultButton";
import { SuccessButton } from "@/components/ui/SuccessButton";
import { useSystemSetting } from "@/hooks/useSystemSetting";
import { useUser } from "@/hooks/useUser";

type Props = PropsWithChildren<{ isAuth?: boolean }>;

export const GlobalLayout = ({ children, isAuth = false }: Props) => {
  const { settings: systemSettings } = useSystemSetting();
  const { isLogined, user, logout } = useUser();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openMenu, setOpenMenu] = useState(false);

  const websiteTitle = useMemo(() => {
    return `CHẴN LẺ BANK - ${systemSettings.suffix_title}`;
  }, [systemSettings]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(!openMenu);
  };

  const triggerLogout = () => {
    logout();
    setTimeout(() => window.location.reload(), 500);
  };

  return (
    <>
      <Head>
        <title>{websiteTitle}</title>
        <link rel="shortcut icon" href={systemSettings.icon} />
      </Head>
      <Box position="relative">
        <Box bgcolor="#2c2c83" className="md:h-[50px] h-[30px]" />
        <Box bgcolor="#2c2c83a3" className="md:h-[150px] h-[100px]" />
        <Box bgcolor="#ffffff" className="h-[10px]" />
        <Link href="/">
          <Container
            fixed
            disableGutters={true}
            sx={{
              position: "absolute",
              width: "100%",
              height: "calc(100% - 50px)",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              overflow: "hidden",
            }}
          >
            <picture>
              <img
                src={systemSettings.logo}
                alt="Banner"
                style={{ height: "100%", width: "100%", margin: "auto" }}
              />
            </picture>
          </Container>
        </Link>
        {!isAuth && !isLogined && (
          <Container
            fixed
            sx={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
            }}
          >
            <Stack direction="row" gap={2} justifyContent="center">
              <Link href="/auth/login">
                <SuccessButton>Đăng nhập</SuccessButton>
              </Link>
              <Link href="/auth/register">
                <DangerButton>Đăng ký</DangerButton>
              </Link>
            </Stack>
          </Container>
        )}
        {isLogined && (
          <Container
            fixed
            sx={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
            }}
          >
            <Stack direction="row" justifyContent="end">
              <DefaultButton onClick={handleClick}>
                Xin chào: {user?.nickname}
              </DefaultButton>
              <Popper
                sx={{ zIndex: 1200 }}
                open={openMenu}
                anchorEl={anchorEl}
                placement="bottom-end"
                transition
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={300}>
                    <Box
                      width="200px"
                      sx={{
                        boxShadow: "rgba(0, 0, 0, 0.176) 0px 6px 13px",
                        borderRadius: "4px",
                        border: "1px solid rgba(0, 0, 0, 0.15)",
                        bgcolor: "#fff",
                      }}
                    >
                      <Link href="/">
                        <Box
                          color="black"
                          p="7px 10px"
                          fontSize="13px"
                          textAlign="center"
                          className="hover:bg-[#ddd]"
                        >
                          Trang chủ
                        </Box>
                      </Link>
                      <Link href="/bank-setup">
                        <Box
                          color="black"
                          p="7px 10px"
                          fontSize="13px"
                          textAlign="center"
                          className="hover:bg-[#ddd]"
                        >
                          Thông tin Bank
                        </Box>
                      </Link>
                      <Link href="/history">
                        <Box
                          color="black"
                          p="7px 10px"
                          fontSize="13px"
                          textAlign="center"
                          className="hover:bg-[#ddd]"
                        >
                          Lịch sử chơi
                        </Box>
                      </Link>
                      <Link href="/daily-mission">
                        <Box
                          color="black"
                          p="7px 10px"
                          fontSize="13px"
                          textAlign="center"
                          className="hover:bg-[#ddd]"
                        >
                          Nhiệm vụ ngày
                        </Box>
                      </Link>
                      <Link href="/jackpot">
                        <Box
                          color="black"
                          p="7px 10px"
                          fontSize="13px"
                          textAlign="center"
                          className="hover:bg-[#ddd]"
                        >
                          Nổ hũ
                        </Box>
                      </Link>
                      <Link href="/gift-code">
                        <Box
                          color="black"
                          p="7px 10px"
                          fontSize="13px"
                          textAlign="center"
                          className="hover:bg-[#ddd]"
                        >
                          Giftcode
                        </Box>
                      </Link>
                      <Link href="/telegram-connect">
                        <Box
                          color="black"
                          p="7px 10px"
                          fontSize="13px"
                          textAlign="center"
                          className="hover:bg-[#ddd]"
                        >
                          Kết nối với Telegram Bot
                        </Box>
                      </Link>
                      <Link href="/change-password">
                        <Box
                          color="black"
                          p="7px 10px"
                          fontSize="13px"
                          textAlign="center"
                          className="hover:bg-[#ddd]"
                        >
                          Đổi mật khẩu
                        </Box>
                      </Link>
                      <Box
                        color="black"
                        p="7px 10px"
                        fontSize="13px"
                        textAlign="center"
                        className="hover:bg-[#ddd] cursor-pointer"
                        onClick={triggerLogout}
                      >
                        Đăng xuất
                      </Box>
                    </Box>
                  </Fade>
                )}
              </Popper>
            </Stack>
          </Container>
        )}
      </Box>
      <Container
        fixed
        disableGutters={true}
        sx={{
          bgcolor: "#fff",
          p: "10px",
          borderRadius: "4px",
          boxShadow: "1px 1px 2px rgba(0,0,0,.1)",
          position: "relative",
          top: "-10px",
        }}
      >
        <Box
          borderRadius="4px"
          p={1.5}
          position="relative"
          sx={{
            zIndex: 1,
            "&:before": {
              content: "''",
              position: "absolute",
              width: "100%",
              height: "100px",
              top: 0,
              left: 0,
              zIndex: -1,
              backgroundImage:
                "linear-gradient(to bottom,#e9e9e9 0%,#fff 100%)",
            },
          }}
        >
          <Stack gap={3}>
            <Box>
              <h3 className="text-center">
                Chẵn Lẻ Bank - {systemSettings.author_name}
              </h3>
              <h4 className="text-center">
                Uy tín, giao dịch tự động 24/7 - Bank 30s !
              </h4>
            </Box>
            {children}
          </Stack>
        </Box>
      </Container>
      <Box bgcolor="#2c2c83" textAlign="center" py={3} className="text-white">
        Copyright 2023 | All rights reserved | {systemSettings.author_name}
      </Box>
    </>
  );
};
