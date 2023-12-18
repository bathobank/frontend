import { deleteCookie } from "cookies-next";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import { TUser } from "@/@types/user";
import { useToast } from "@/hooks/useToast";
import { useAuthLogoutMutation } from "@/queries/auth/logout";
import { AUTH_GET_USER_QK } from "@/queries/auth/user";
import { getLogined, getUser, setUser } from "@/stores/slices/user";

export const useUser = (userDefault?: TUser) => {
  const user: TUser | null = useSelector(getUser);
  const isLogined = useSelector(getLogined);
  const queryClient = useQueryClient();
  const toast = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userDefault) return;
    dispatch(setUser(userDefault));
  }, [dispatch, userDefault]);

  const userLogoutMutation = useAuthLogoutMutation(() => {
    toast.success("Đã đăng xuất!", { time: 3000 });
    window.localStorage.removeItem("customer-token");
    deleteCookie("customer-token");
    queryClient.invalidateQueries({
      queryKey: [AUTH_GET_USER_QK],
    });
  });

  return { user, isLogined, logout: userLogoutMutation.mutate };
};
