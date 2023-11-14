import {TApiSuccessResponse} from "@/@types/axios";

export type TTopWeek = {
  money: number;
  nickname: string;
  reward: number;
};

export type TTopWeekResponse = TApiSuccessResponse<{ top_week: TTopWeek[] }>
