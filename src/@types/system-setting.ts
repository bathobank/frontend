import {TApiSuccessResponse} from "@/@types/axios";
import {TGame} from "@/@types/game";

export type TSystemSetting = {
  suffix_title: string;
  author_name: string;
  icon: string;
  logo: string;
  notification: string;
  'box-chat-link': string;
  games: TGame;
}

export type TSystemSettingResponse = TApiSuccessResponse<{settings: TSystemSetting}>;
