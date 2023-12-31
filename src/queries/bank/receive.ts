import { useQuery } from "react-query";

import { TBank, TBankDataResponse } from "@/@types/bank";
import { BANK_RECEIVE_URI } from "@/utils/api-url";
import axiosInstance from "@/utils/axios";

export const BANK_RECEIVE_GET_QK: string = "bank_receive_get_query_key";

export const bankReceiveQuery = (): Promise<TBankDataResponse<TBank>> => {
  return axiosInstance.get(BANK_RECEIVE_URI);
};

export const useBankReceiveQuery = (): TBankDataResponse<TBank> | undefined => {
  const { data } = useQuery({
    queryKey: [BANK_RECEIVE_GET_QK],
    queryFn: () => bankReceiveQuery(),
    staleTime: 5000,
  });
  return data;
};
