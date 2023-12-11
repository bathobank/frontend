import { useMutation, useQuery } from "react-query";

import { TBankUserForm, TBankUserResponse } from "@/@types/bank-user";
import {
  USER_BANK_RECEIVE_GET,
  USER_BANK_RECEIVE_UPDATE,
} from "@/utils/api-url";
import axiosInstance from "@/utils/axios";

const USER_BANK_RECEIVE_MUTATION_QK = "user_bank_receive_mutation_query_key";
const USER_BANK_RECEIVE_QK = "user_bank_receive_query_key";

export const getUserBankReceive = (): Promise<TBankUserResponse> => {
  return axiosInstance.get(USER_BANK_RECEIVE_GET);
};

export const updateUserBankReceive = (param: TBankUserForm) => {
  return axiosInstance.post(USER_BANK_RECEIVE_UPDATE, param);
};

export const useUserBankReceive = (): TBankUserResponse | undefined => {
  const { data } = useQuery({
    queryKey: [USER_BANK_RECEIVE_QK],
    queryFn: getUserBankReceive,
  });
  return data;
};

export const useUserBankReceiveMutation = () => {
  return useMutation({
    mutationKey: [USER_BANK_RECEIVE_MUTATION_QK],
    mutationFn: updateUserBankReceive,
  });
};
