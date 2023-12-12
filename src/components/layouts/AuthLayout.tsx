import Head from "next/head";
import { ReactNode, useMemo } from "react";

import { TSystemSetting } from "@/@types/system-setting";

type Props = {
  children: ReactNode;
  title?: string;
  systemSettings: TSystemSetting;
};

export const AuthLayout = ({ children, title, systemSettings }: Props) => {
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
        <style>
          {`body { background-image: url('/assets/media/auth/bg4.jpg') } [data-bs-theme="dark"] body { background-image: url('/assets/media/auth/bg4-dark.jpg') }`}
        </style>
      </Head>
      {children}
    </>
  );
};
