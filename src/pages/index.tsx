import {BankList} from "@/components/pages/Index/BankList";
import {Game1Phan3} from "@/components/pages/Index/Game/1phan3";
import {GameCltx} from "@/components/pages/Index/Game/cltx";
import {GameCltx2} from "@/components/pages/Index/Game/cltx2";
import {GameDoanSo} from "@/components/pages/Index/Game/doanso";
import {GameGap3} from "@/components/pages/Index/Game/gap3";
import {GameTong3So} from "@/components/pages/Index/Game/tong3so";
import {GameXien} from "@/components/pages/Index/Game/xien";
import {History} from "@/components/pages/Index/History";
import {TopWeekAndRule} from "@/components/pages/Index/TopWeekAndRule";
import {Box} from "@/components/ui/Box";
import {GlobalLayout} from "@/components/layouts/GlobalLayout";
import {Flex} from "@/components/ui/Flex";
import {LinkUI} from "@/components/ui/Link";
import {Text} from "@/components/ui/Text";
import {useStore} from "@/hooks/useStore";
import {useUser} from "@/hooks/useUser";
import {getGameOpen} from "@/stores/slices/game";
import {useEffect, useMemo, useRef} from "react";

export default function Home() {
  const gameRef = useRef<HTMLDivElement>(null);
  const bankRef = useRef<HTMLDivElement>(null);
  const store = useStore();
  const gameOpen = store.get(getGameOpen);
  const {isLogined} = useUser();

  useEffect(() => {
    if (!gameRef.current || !bankRef.current) return;
    gameRef.current.style.height = '';
    bankRef.current.style.height = '';
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
      <Flex justify='between' items="start" className="mb-3">
        <Box ref={gameRef} className='w-[49.5%] rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal'>
          {gameOpen === 'cltx' && <GameCltx />}
          {gameOpen === 'cltx2' && <GameCltx2 />}
          {gameOpen === 'gap3' && <GameGap3 />}
          {gameOpen === 'tong3so' && <GameTong3So />}
          {gameOpen === '1phan3' && <Game1Phan3 />}
          {gameOpen === 'xien' && <GameXien />}
          {gameOpen === 'doanso' && <GameDoanSo />}
        </Box>
        <Box ref={bankRef} className='w-[49.5%] rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal'>
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
    </GlobalLayout>
  )
}
