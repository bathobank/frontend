import {useStore} from "@/hooks/useStore";
import {useAuthGetUser} from "@/queries/auth/user";
import {setUser} from "@/stores/slices/user";
import {ReactNode, useEffect} from "react";

export const InitComponentData = ({children}: {children: ReactNode}) => {
  const {status, data} = useAuthGetUser();
  const {set} = useStore();

  useEffect(() => {
    set(setUser(status === 'error' ? null : data?.data.user));
  }, [status]);

  return children;
}
