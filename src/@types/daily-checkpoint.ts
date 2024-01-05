import { TApiSuccessResponse } from "@/@types/axios";

export type TDailyCheckpoint = {
  code: string;
  created_at: string;
  is_close: 0 | 1;
  money_max: number;
  money_min: number;
  time: number;
  total_join: number;
  joined: boolean;
};

export type TDailyCheckpointHistory = {
  created_at: string;
  joined: number;
  money: number;
  section_code: string;
  time: string;
  nickname: string;
};

export type TDailyCheckpointResponse = TApiSuccessResponse<{
  section: TDailyCheckpoint;
  histories: TDailyCheckpointHistory[];
}>;
