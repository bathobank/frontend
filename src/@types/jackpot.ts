import { TApiSuccessResponse } from "@/@types/axios";

export type TJackpot = number;
export type TJackpotResponse = TApiSuccessResponse<{ jackpot: TJackpot }>;
