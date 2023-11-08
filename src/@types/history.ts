import {TUser} from "@/@types/user";
import {TApiSuccessResponse} from "@/@types/axios";
import {TOrder} from "@/@types/order";

export type THistory = {
  bank_code: string;
  created_at: string;
  game_group: string;
  game_time: string;
  game_type: string;
  id: number;
  money_bonus: number;
  money_coming: number;
  money_jackpot: number;
  money_real_bonus: number;
  ratio: number;
  status: 'L' | 'W';
  transaction_code: string;
  user: TUser;
  order?: TOrder;
  content: Record<string, string|object>;
}

export type THistories = THistory[];

export type THistoriesQuery = TApiSuccessResponse<{histories: THistories}>
