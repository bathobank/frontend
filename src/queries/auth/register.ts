import {TUserCreate} from "@/@types/user";
import {AUTH_REGISTER_URI} from "@/utils/api-url";
import axiosInstance from "@/utils/axios";
import {useMutation} from "react-query";

const AUTH_REGISTER_MUTATION_QK = 'auth_register_mutation_query_key';

export const authRegister = (param: TUserCreate) => {
  return axiosInstance.post(AUTH_REGISTER_URI, param);
}

export const useAuthRegisterMutation = () => {
  return useMutation({
    mutationKey: [AUTH_REGISTER_MUTATION_QK],
    mutationFn: authRegister
  });
}
