import {useStore} from "@/hooks/useStore";
import {useAuthGetUser} from "@/queries/auth/user";
import {setFontClassName} from "@/stores/slices/font";
import {setUser} from "@/stores/slices/user";
import {ReactNode, useEffect} from "react";

export const InitComponentData = ({children, fontClass}: {children: ReactNode, fontClass: string}) => {
  const {status, data} = useAuthGetUser();
  const {set} = useStore();

  useEffect(
    () => {
      set(setUser(status === 'error' ? null : data?.data.user));
    },
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [status]
  );

  useEffect(
    () => {
      set(setFontClassName(fontClass));
    },
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [fontClass]
  );

  return children;
}
