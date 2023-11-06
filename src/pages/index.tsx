import {BankList} from "@/components/pages/Index/BankList";
import {History} from "@/components/pages/Index/History";
import {TopWeekAndRule} from "@/components/pages/Index/TopWeekAndRule";
import {Box} from "@/components/ui/Box";
import {GlobalLayout} from "@/components/layouts/GlobalLayout";
import {Flex} from "@/components/ui/Flex";
import {LinkUI} from "@/components/ui/Link";
import {Text} from "@/components/ui/Text";
import {useUser} from "@/hooks/useUser";
import {getGameOpen} from "@/stores/slices/game";
import {useEffect, useMemo, useRef, useState} from "react";
import {useHasOrderWaitQuery} from "@/queries/hasOrderWait";
import {AlertEnterBank} from "@/components/modals/AlertEnterBank";
import {GameGroup} from "@/components/pages/Index/GameGroup";
import {useSelector} from "react-redux";

export default function Home() {
  const [hasOrderWait, setHasOrderWait] = useState<boolean>(false);
  const gameRef = useRef<HTMLDivElement>(null);
  const bankRef = useRef<HTMLDivElement>(null);
  const gameOpen: string = useSelector(getGameOpen);
  const {isLogined} = useUser();
  const hasOrderWaitQuery = useHasOrderWaitQuery();

  useEffect(() => {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    let timeoutSetHasOrderWait: any = null;

    if (hasOrderWaitQuery) {
      timeoutSetHasOrderWait = setTimeout(() => {
        setHasOrderWait(hasOrderWaitQuery.data.has_order_wait)
      }, 10);
    }

    return () => {
      clearTimeout(timeoutSetHasOrderWait);
    }
  }, [hasOrderWaitQuery]);

  useEffect(() => {
    if (!gameRef.current || !bankRef.current) return;
    gameRef.current.style.height = '';
    bankRef.current.style.height = '';

    if (window.innerWidth < 1024) return;

    const gameHeight: number = gameRef.current!.offsetHeight;
    const bankHeight: number = bankRef.current!.offsetHeight;
    const height = bankHeight > gameHeight ? bankHeight : gameHeight;
    gameRef.current.style.height = height + 'px';
    bankRef.current.style.height = height + 'px';
  }, [gameOpen, gameRef, bankRef, isLogined]);

  const title: string|undefined = useMemo(() => {
    if (gameOpen === 'cltx') return 'Chẵn lẻ - Tài xỉu';
    if (gameOpen === 'cltx2') return 'Chẵn lẻ - Tài xỉu - Cộng 2 số';
    if (gameOpen === 'gap3') return 'Gấp 3';
    if (gameOpen === 'tong3so') return 'Tổng 3 số';
    if (gameOpen === '1phan3') return 'Một phần 3';
    if (gameOpen === 'xien') return 'Xiên số';
    if (gameOpen === 'doanso') return 'Đoán số';
    return undefined;
  }, [gameOpen]);

  return (
    <GlobalLayout title={title}>
      <Flex justify='between' items="start" wrap="wrap" className="mb-3">
        <Box ref={gameRef} className="w-full lg:w-[49.5%] mb-3 lg:mb-0 rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal">
          <GameGroup gameOpen={gameOpen}  />
        </Box>
        <Box ref={bankRef} className='w-full lg:w-[49.5%] rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal'>
          {isLogined ? (
            <BankList />
          ) : (
            <Box className="px-3 py-5">
              <Text align="center">ĐỂ LẤY THÔNG TIN BANK CHUYỂN KHOẢN, VUI LÒNG <LinkUI href='/auth/login' className="text-[#ff55a5]">ĐĂNG NHẬP</LinkUI> HOẶC <LinkUI href="/auth/register" className="text-[#ff55a5]">ĐĂNG KÝ NHANH</LinkUI></Text>
            </Box>
          )}
        </Box>
      </Flex>
      <Box className="mb-3">
        <History />
      </Box>
      {/*<Box className="mb-3">*/}
      {/*  <HistoryWinGame />*/}
      {/*</Box>*/}
      <Box className="mb-3">
        <TopWeekAndRule />
      </Box>
      <AlertEnterBank isOpen={hasOrderWait} onClose={() => setHasOrderWait(false)} />
    </GlobalLayout>
  )
}
