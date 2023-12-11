import { TApiSuccessResponse } from "@/@types/axios";

export type TBankUserForm = {
  bank: string;
  bank_number: string;
  bank_owner: string;
};

export type TBankUser = {
  bank_bin: string;
  bank_id: number;
  bank_number: string;
  bank_owner: string;
  created_at: string;
  looked: number;
  user_id: number;
};

export type TBankUserResponse = TApiSuccessResponse<{
  bank_user: TBankUser | null;
}>;
