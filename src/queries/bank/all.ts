import { TBankData, TBankDataResponse } from "@/@types/bank";
import { BANKS_URI } from "@/utils/api-url";
import axiosInstance from "@/utils/axios";
import { useQuery } from "react-query";

export const BANK_GET_ALL_QK: string = "bank_get_all_query_key";

export const bankAllQuery = (): Promise<TBankDataResponse<TBankData>> => {
  return axiosInstance.get(BANKS_URI);
};

export const useBankAllQuery = (): TBankDataResponse<TBankData> | undefined => {
  const { data } = useQuery({
    queryKey: [BANK_GET_ALL_QK],
    queryFn: () => bankAllQuery(),
  });
  return data;
};
