import { AUTH_LOGOUT_URI } from "@/utils/api-url";
import axiosInstance from "@/utils/axios";
import { useMutation } from "react-query";

const AUTH_LOGOUT_MUTATION_QK = "auth_logout_mutation_query_key";

export const authLogout = () => {
  return axiosInstance.post(AUTH_LOGOUT_URI);
};

export const useAuthLogoutMutation = (successCb?: () => void) => {
  return useMutation({
    mutationKey: [AUTH_LOGOUT_MUTATION_QK],
    mutationFn: authLogout,
    onSuccess() {
      successCb && successCb();
    },
  });
};
