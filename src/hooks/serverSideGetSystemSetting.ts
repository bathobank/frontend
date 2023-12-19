import { getCookie } from "cookies-next";
import { IncomingMessage, ServerResponse } from "http";

import { TUser } from "@/@types/user";
import { authGetUser } from "@/queries/auth/user";
import { systemSettingQuery } from "@/queries/system-setting";

type TContext = { req: IncomingMessage; res: ServerResponse };

const UrlAuthenRequired: string[] = [
  "/bank-setup",
  "/change-password",
  "/history",
  "/telegram-connect",
];

export const serverSideGetSystemSetting = async ({ req, res }: TContext) => {
  const {
    data: { settings: systemSettings },
  } = await systemSettingQuery();
  let user: TUser | null = null;

  try {
    const token: string | undefined = getCookie("customer-token", { req, res });
    if (token) {
      const { data } = await authGetUser(token);
      user = data.user;
    }
  } catch (e) {
    const error = e as { message: string };
    console.log(error.message);
  }

  if (!user) {
    for (const url of UrlAuthenRequired) {
      if (req.url?.startsWith(url)) {
        return {
          redirect: {
            permanent: false,
            destination: "/",
          },
        };
      }
    }
  }

  if (user && !user.has_bank_user) {
    if (req.url?.indexOf("bank-setup") === -1) {
      return {
        redirect: {
          permanent: false,
          destination: "/bank-setup?required=true",
        },
      };
    }
  }

  return {
    props: {
      systemSettings,
      user,
    },
  };
};
