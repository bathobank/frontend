import Head from "next/head";
import Link from "next/link";
import { ReactNode, useEffect, useMemo } from "react";

import { NavbarAuthed, NavbarGuest } from "@/components/layouts/Navbar";
import { Img } from "@/components/ui/Img";
import { useScript } from "@/hooks/useScript";
import { useSystemSetting } from "@/hooks/useSystemSetting";
import { useUser } from "@/hooks/useUser";

declare global {
  interface Window {
    KTComponents: { init: () => void };
  }
}

type Props = {
  children: ReactNode;
  title?: string;
};

export const GlobalLayout = ({ children, title }: Props) => {
  useScript("/assets/plugins/global/plugins.bundle.js");
  useScript("/assets/js/scripts.bundle.js");

  const { isLogined, user, logout } = useUser();
  const { settings: systemSettings } = useSystemSetting();

  useEffect(() => {
    let timeoutRunInit: NodeJS.Timeout | null = null;
    const intervalCheckInit: NodeJS.Timeout = setInterval(() => {
      if (
        !window.KTComponents ||
        typeof window.KTComponents.init !== "function"
      ) {
        return;
      }
      clearInterval(intervalCheckInit);
      timeoutRunInit = setTimeout(window.KTComponents.init, 300);
    }, 100);
    return () => {
      clearInterval(intervalCheckInit);
      if (timeoutRunInit) clearTimeout(timeoutRunInit);
    };
  }, []);

  const websiteTitle = useMemo(() => {
    const suffix = systemSettings.suffix_title;
    if (!title) return suffix;
    return `${title} | ${suffix}`;
  }, [systemSettings, title]);

  return (
    <>
      <Head>
        <title>{websiteTitle}</title>
        <link rel="shortcut icon" href={systemSettings.icon} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
        <div
          className="app-page flex-column flex-column-fluid"
          data-kt-app-layout="dark-header"
        >
          <div
            id="kt_app_header"
            className="app-header"
            data-kt-sticky="true"
            data-kt-sticky-activate="{default: true, lg: true}"
            data-kt-sticky-name="app-header-minimize"
            data-kt-sticky-offset="{default: '200px', lg: '0'}"
            data-kt-sticky-animation="false"
          >
            <div
              className="app-container w-100 d-flex align-items-stretch justify-content-between"
              id="kt_app_header_container"
            >
              <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-lg-15">
                <Link href="/">
                  <Img
                    alt="Logo"
                    src={systemSettings.logo}
                    className="h-30px h-lg-50px app-sidebar-logo-default"
                  />
                </Link>
              </div>
              <div
                className="d-flex align-items-stretch justify-content-between flex-lg-grow-1"
                id="kt_app_header_wrapper"
              >
                <div
                  className="app-header-menu app-header-mobile-drawer align-items-stretch"
                  data-kt-drawer="true"
                  data-kt-drawer-name="app-header-menu"
                  data-kt-drawer-activate="{default: true, lg: false}"
                  data-kt-drawer-overlay="true"
                  data-kt-drawer-width="250px"
                  data-kt-drawer-direction="end"
                  data-kt-drawer-toggle="#kt_app_header_menu_toggle"
                  data-kt-swapper="true"
                  data-kt-swapper-mode="{default: 'append', lg: 'prepend'}"
                  data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}"
                >
                  <div
                    className="menu menu-rounded menu-column menu-lg-row my-5 my-lg-0 align-items-stretch fw-semibold px-2 px-lg-0"
                    id="kt_app_header_menu"
                    data-kt-menu="true"
                  >
                    {isLogined ? <NavbarAuthed /> : <NavbarGuest />}
                  </div>
                </div>

                <div className="app-navbar flex-shrink-0">
                  {isLogined && (
                    <div
                      className="app-navbar-item ms-1 ms-md-4"
                      id="kt_header_user_menu_toggle"
                    >
                      <div
                        className="cursor-pointer fw-bold fs-xl d-flex align-items-center"
                        data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                        data-kt-menu-attach="parent"
                        data-kt-menu-placement="bottom-end"
                        style={{ color: "#808290" }}
                      >
                        <Img src="/images/user.png" size={25} />
                        <span className="ms-2">{user?.nickname}</span>
                      </div>

                      <div
                        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 mw-225px"
                        data-kt-menu="true"
                      >
                        <div className="menu-item px-2">
                          <Link href="/bank-setup" className="menu-link px-5">
                            <i className="!hl-text fs-xl bi bi-bank"></i>
                            <span className="ms-2">Cài đặt Bank</span>
                          </Link>
                        </div>
                        <div className="menu-item px-2">
                          <Link
                            href="/telegram-connect"
                            className="menu-link px-5"
                          >
                            <i className="!hl-text fs-xl bi bi-telegram"></i>
                            <span className="ms-2">Liên kết Telegram</span>
                          </Link>
                        </div>
                        <div className="menu-item px-2">
                          <Link
                            href="/change-password"
                            className="menu-link px-5"
                          >
                            <i className="!hl-text fs-xl bi bi-person-lock"></i>
                            <span className="ms-2">Đổi mật khẩu</span>
                          </Link>
                        </div>
                        <div className="menu-item px-2">
                          <Link
                            href="#"
                            className="menu-link px-5"
                            onClick={() => {
                              logout();
                              window.location.href = "/";
                            }}
                          >
                            <i className="!hl-text fs-xl bi bi-box-arrow-right"></i>
                            <span className="ms-2">Đăng xuất</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                  <div
                    className="app-navbar-item d-lg-none ms-2 me-n2"
                    title="Show header menu"
                  >
                    <div
                      className="btn btn-flex btn-icon btn-active-color-primary w-30px h-30px"
                      id="kt_app_header_menu_toggle"
                    >
                      <i className="fa fa-bars fs-1"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="app-wrapper flex-column flex-row-fluid">
            <div className="app-content flex-column-fluid py-3 py-lg-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
