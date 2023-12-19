import { TSystemSetting } from "@/@types/system-setting";
import { TUser } from "@/@types/user";

export type TPageProp<T = NonNullable<unknown>> = {
  systemSettings: TSystemSetting;
  user?: TUser;
} & T;
