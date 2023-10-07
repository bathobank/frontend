import {BankList} from "@/components/pages/Index/BankList";
import {GameCltx} from "@/components/pages/Index/Game/cltx";
import {Box} from "@/components/ui/Box";
import {GlobalLayout} from "@/components/layouts/GlobalLayout";
import {Flex} from "@/components/ui/Flex";
import {useEffect, useRef, useState} from "react";

export default function Home() {
  const [heights, setHeights] = useState<{game: string; bank: string}>({game: '100%', bank: '100%'});
  const gameRef = useRef<HTMLDivElement>(null);
  const bankRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameRef.current || !bankRef.current) return;
    const gameHeight: number = gameRef.current!.offsetHeight;
    const bankHeight: number = bankRef.current!.offsetHeight;
    const height = bankHeight > gameHeight ? bankHeight : gameHeight;
    setHeights({bank: height + 'px', game: height + 'px'});
  }, [gameRef, bankRef]);

  return (
    <GlobalLayout>
      <Flex justify='between' items="start">
        <Box
          ref={gameRef}
          className='w-[49.5%] rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal'
          style={{ height: heights.game }}>
          <GameCltx />
        </Box>
        <Box
          ref={bankRef}
          className='w-[49.5%] rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal'
          style={{ height: heights.bank }}>
          <BankList />
        </Box>
      </Flex>
    </GlobalLayout>
  )
}
