import { PropsWithChildren, useEffect } from "react";

export default function InitComponentData({ children }: PropsWithChildren) {
  useEffect(() => {
    if (!window) return;
    window.defaultThemeMode = "dark";
    window.themeMode = window.defaultThemeMode;
    if (window.top && window.top !== window.self) {
      window.top.location.replace(window.self.location.href);
    }
  }, []);

  return children;
}
