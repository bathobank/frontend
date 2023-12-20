import { GET_QR_BANK_GAME } from "@/utils/api-url";
import axiosInstance from "@/utils/axios";

export type TQrBankGameQuery = {
  nickname: string;
  bank_code: string;
  account_number: string;
};

type Response = {
  data: { url: string };
};

export const qrBankGameQuery = (param: TQrBankGameQuery): Promise<Response> => {
  return axiosInstance.post(GET_QR_BANK_GAME, param);
};
