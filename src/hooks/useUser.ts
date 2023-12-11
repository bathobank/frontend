import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";

import { TUser } from "@/@types/user";
import { useToast } from "@/hooks/useToast";
import { useAuthLogoutMutation } from "@/queries/auth/logout";
import { AUTH_GET_USER_QK } from "@/queries/auth/user";
import { getLogined, getUser } from "@/stores/slices/user";

export const useUser = () => {
  const user: TUser | null = useSelector(getUser);
  const isLogined = useSelector(getLogined);
  const queryClient = useQueryClient();
  const toast = useToast();
  const userLogoutMutation = useAuthLogoutMutation(() => {
    toast.success("Đã đăng xuất!", { time: 3000 });
    window.localStorage.removeItem("customer-token");
    queryClient.invalidateQueries({
      queryKey: [AUTH_GET_USER_QK],
    });
  });

  const logout = userLogoutMutation.mutate;

  return { user, isLogined, logout };
};
