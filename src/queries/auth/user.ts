import { TApiSuccessResponse } from "@/@types/axios";
import { TUserQuery } from "@/@types/user";
import { AUTH_GET_USER_URI } from "@/utils/api-url";
import axiosInstance from "@/utils/axios";
import { useQuery, UseQueryResult } from "react-query";

export const AUTH_GET_USER_QK = "auth_get_user_query_key";

export const authGetUser = (
  token?: string,
): Promise<TApiSuccessResponse<TUserQuery>> => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axiosInstance.post(AUTH_GET_USER_URI);
};

export const useAuthGetUser = (
  token?: string,
): UseQueryResult<TApiSuccessResponse<TUserQuery>, undefined> => {
  return useQuery({
    queryKey: [AUTH_GET_USER_QK, token],
    queryFn: () => authGetUser(token),
    retry: 0,
    staleTime: 3000,
  });
};
