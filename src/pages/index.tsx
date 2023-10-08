import {BankList} from "@/components/pages/Index/BankList";
import {Game1Phan3} from "@/components/pages/Index/Game/1phan3";
import {GameCltx} from "@/components/pages/Index/Game/cltx";
import {GameCltx2} from "@/components/pages/Index/Game/cltx2";
import {GameDoanSo} from "@/components/pages/Index/Game/doanso";
import {GameGap3} from "@/components/pages/Index/Game/gap3";
import {GameTong3So} from "@/components/pages/Index/Game/tong3so";
import {GameXien} from "@/components/pages/Index/Game/xien";
import {GameXsmb} from "@/components/pages/Index/Game/xsmb";
import {Box} from "@/components/ui/Box";
import {GlobalLayout} from "@/components/layouts/GlobalLayout";
import {Flex} from "@/components/ui/Flex";
import {useStore} from "@/hooks/useStore";
import {getGameOpen} from "@/stores/slices/game";
import {useEffect, useRef} from "react";

export default function Home() {
  const gameRef = useRef<HTMLDivElement>(null);
  const bankRef = useRef<HTMLDivElement>(null);
  const store = useStore();
  const gameOpen = store.get(getGameOpen);

  useEffect(() => {
    if (!gameRef.current || !bankRef.current) return;
    gameRef.current.style.height = '';
    bankRef.current.style.height = '';
    const gameHeight: number = gameRef.current!.offsetHeight;
    const bankHeight: number = bankRef.current!.offsetHeight;
    const height = bankHeight > gameHeight ? bankHeight : gameHeight;
    gameRef.current.style.height = height + 'px';
    bankRef.current.style.height = height + 'px';
  }, [gameOpen, gameRef, bankRef]);

  return (
    <GlobalLayout>
      <Flex justify='between' items="start">
        <Box
          ref={gameRef}
          className='w-[49.5%] rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal'>
          {gameOpen === 'cltx' && <GameCltx />}
          {gameOpen === 'cltx2' && <GameCltx2 />}
          {gameOpen === 'gap3' && <GameGap3 />}
          {gameOpen === 'tong3so' && <GameTong3So />}
          {gameOpen === '1phan3' && <Game1Phan3 />}
          {gameOpen === 'xien' && <GameXien />}
          {gameOpen === 'doanso' && <GameDoanSo />}
          {gameOpen === 'xsmb' && <GameXsmb />}
        </Box>
        <Box
          ref={bankRef}
          className='w-[49.5%] rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal'>
          <BankList />
        </Box>
      </Flex>
    </GlobalLayout>
  )
}
