import { TApiSuccessResponse } from "@/@types/axios";

export type TMission = {
  order: number;
  milestone: number;
  bonus: number;
  created_at: string;
  is_done: 0 | 1;
};

export type TMissionResponse = TApiSuccessResponse<{ missions: TMission[] }>;
