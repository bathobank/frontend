import { ReactNode, useEffect } from "react";

import { useStore } from "@/hooks/useStore";
import { useAuthGetUser } from "@/queries/auth/user";
import { setOpenNavbar } from "@/stores/slices/navbar";
import { setUser } from "@/stores/slices/user";

export default function InitComponentData({
  children,
}: {
  children: ReactNode;
}) {
  const { status, data } = useAuthGetUser();
  const { set } = useStore();

  useEffect(
    () => {
      set(setUser(status === "error" ? null : data?.data.user));
    },
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [status],
  );

  useEffect(() => {
    const updateWindowDimensions = () => {
      set(setOpenNavbar(window.innerHeight >= 1024));
    };

    updateWindowDimensions();

    window.addEventListener("resize", updateWindowDimensions);

    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, [set]);

  return children;
}
