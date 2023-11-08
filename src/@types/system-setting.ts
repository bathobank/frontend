import {TApiSuccessResponse} from "@/@types/axios";

export type TSystemSetting = {
  suffix_title: string;
  author_name: string;
  icon: string;
  logo: string;
}

export type TSystemSettingResponse = TApiSuccessResponse<{settings: TSystemSetting}>;
