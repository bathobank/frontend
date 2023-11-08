import {Flex} from "@/components/ui/Flex";
import {useDispatch, useSelector} from "react-redux";
import {getIsLoading, setIsLoading} from "@/stores/slices/loading";
import {useEffect} from "react";
import {useRouter} from "next/router";
import {Img} from "@/components/ui/Img";

export default function Loading() {
  const loading = useSelector(getIsLoading);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleStart = (url: string) => {
    if (url !== router.asPath) {
      dispatch(setIsLoading(true));
    }
  };

  useEffect(() => {
    router.events.on('routeChangeStart', handleStart)
    return () => {
      router.events.off('routeChangeStart', handleStart)
    }
  },
  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  []
  );

  if (!loading) return <></>;

  return (
    <Flex justify="center" items="center" className="fixed top-0 left-0 w-full h-full z-[9999] bg-[#2b2b31]">
      <Img src='/images/loading.svg' size={200} />
    </Flex>
  );
}
