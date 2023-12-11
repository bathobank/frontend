import { systemSettingQuery } from "@/queries/system-setting";
import { authGetUser } from "@/queries/auth/user";
import { getCookie } from "cookies-next";
import { IncomingMessage, ServerResponse } from "http";
import { TUser } from "@/@types/user";

type TContext = { req: IncomingMessage; res: ServerResponse };

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

  return {
    props: {
      systemSettings,
      user,
    },
  };
};
