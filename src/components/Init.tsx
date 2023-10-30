import {useStore} from "@/hooks/useStore";
import {useAuthGetUser} from "@/queries/auth/user";
import {setFontClassName} from "@/stores/slices/font";
import {setUser} from "@/stores/slices/user";
import {ReactNode, useEffect} from "react";
import {setOpenNavbar} from "@/stores/slices/navbar";

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

  useEffect(() => {
    const updateWindowDimensions = () => {
      set(setOpenNavbar(window.innerHeight >= 1024));
    };

    updateWindowDimensions();

    window.addEventListener("resize", updateWindowDimensions);

    return () => {
      window.removeEventListener("resize", updateWindowDimensions)
    }
  }, [set]);

  return children;
}
