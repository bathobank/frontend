import { TApiSuccessResponse } from "@/@types/axios";
import { TGame } from "@/@types/game";

export type TSystemSetting = {
  suffix_title: string;
  author_name: string;
  icon: string;
  logo: string;
  notification: string;
  "box-chat-link": string;
  "box-giftcode-link": string;
  "guide-link": string;
  games: TGame;
  daily_checkpoint: {
    active: boolean;
    time: number;
    min: number;
  };
};

export type TSystemSettingResponse = TApiSuccessResponse<{
  settings: TSystemSetting;
}>;
