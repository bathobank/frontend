import { Flex } from "@/components/ui/Flex";
import { useEffect, useState } from "react";
import { Img } from "@/components/ui/Img";
import { useRouter } from "next/router";

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
    <Flex
      justify="center"
      items="center"
      className="fixed top-0 left-0 w-full h-full z-[9999] bg-[#2b2b31]"
    >
      <Img src="/images/loading.svg" size={200} />
    </Flex>
  );
}
