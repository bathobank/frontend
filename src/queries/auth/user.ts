import {TApiSuccessResponse} from "@/@types/axios";
import {TUserQuery} from "@/@types/user";
import {AUTH_GET_USER_URI} from "@/utils/api-url";
import axiosInstance from "@/utils/axios";
import {useQuery, UseQueryResult} from "react-query";

export const AUTH_GET_USER_QK = 'auth_get_user_query_key';

export const authGetUser = (): Promise<TApiSuccessResponse<TUserQuery>> => {
  return axiosInstance.post(AUTH_GET_USER_URI);
}

export const useAuthGetUser = (): UseQueryResult<TApiSuccessResponse<TUserQuery>, undefined> => {
  return useQuery({
    queryKey: [AUTH_GET_USER_QK],
    queryFn: authGetUser,
    retry: 0
  });
}
