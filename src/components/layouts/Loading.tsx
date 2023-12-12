import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Img } from "@/components/ui/Img";

export default function Loading() {
  const [loading, setLoading] = useState<boolean>(true);
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setFirstLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== router.asPath && !firstLoading) {
        document.querySelector("body")!.style.overflow = "hidden";
        setLoading(true);
      }
    };
    const handleComplete = () => {
      if (firstLoading) return;
      setTimeout(() => {
        document.querySelector("body")!.style.overflow = "";
        setLoading(false);
      }, 300);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  if (!loading) return <></>;

  return (
    <div
      style={{ zIndex: "9999", backgroundColor: "#0F1014" }}
      className="d-flex position-fixed top-0 left-0 w-100 h-100 justify-content-center align-items-center"
    >
      <Img src="/images/loading.svg" size={200} />
    </div>
  );
}
