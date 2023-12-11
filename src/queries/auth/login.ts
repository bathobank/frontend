import { TUserLogin } from "@/@types/user";
import { AUTH_LOGIN_URI } from "@/utils/api-url";
import axiosInstance from "@/utils/axios";
import { useMutation } from "react-query";

const AUTH_LOGIN_MUTATION_QK = "auth_login_mutation_query_key";

export const authLogin = (param: TUserLogin) => {
  return axiosInstance.post(AUTH_LOGIN_URI, param);
};

export const useAuthLoginMutation = () => {
  return useMutation({
    mutationKey: [AUTH_LOGIN_MUTATION_QK],
    mutationFn: authLogin,
  });
};
