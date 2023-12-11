import { useMutation } from "react-query";

import { TChangePwForm } from "@/@types/password";
import { AUTH_CHANGE_PASSWORD_URI } from "@/utils/api-url";
import axiosInstance from "@/utils/axios";

const AUTH_CHANGE_PASSWORD_MUTATION_QK =
  "auth_change_password_mutation_query_key";

export const changePassword = (param: TChangePwForm) => {
  return axiosInstance.post(AUTH_CHANGE_PASSWORD_URI, param);
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationKey: [AUTH_CHANGE_PASSWORD_MUTATION_QK],
    mutationFn: changePassword,
  });
};
