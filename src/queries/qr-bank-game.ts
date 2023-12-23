import { GET_QR_BANK_GAME } from "@/utils/api-url";
import axiosInstance from "@/utils/axios";

export type TQrBankGameQuery = {
  account_number: string;
  amount?: string;
  message?: string;
};

type Response = {
  data: { url: string };
};

export const qrBankGameQuery = (param: TQrBankGameQuery): Promise<Response> => {
  return axiosInstance.post(GET_QR_BANK_GAME, param);
};
