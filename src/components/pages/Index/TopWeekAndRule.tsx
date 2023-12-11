import { useEffect, useRef } from "react";

import { GameRule } from "@/components/pages/Index/TopWeekAndRule/GameRule";
import { TopWeek } from "@/components/pages/Index/TopWeekAndRule/TopWeek";
import { Box } from "@/components/ui/Box";
import { Flex } from "@/components/ui/Flex";

export const TopWeekAndRule = () => {
  const topWeekRef = useRef<HTMLDivElement>(null);
  const gameRuleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!topWeekRef.current || !gameRuleRef.current) return;

    topWeekRef.current.style.height = "";
    gameRuleRef.current.style.height = "";

    if (window.innerWidth < 1024) return;

    const topWeekHeight = topWeekRef.current.offsetHeight;
    const gameRuleHeight = gameRuleRef.current.offsetHeight;
    const height =
      topWeekHeight > gameRuleHeight ? topWeekHeight : gameRuleHeight;

    topWeekRef.current.style.height = height + "px";
    gameRuleRef.current.style.height = height + "px";
  }, [topWeekRef, gameRuleRef]);

  return (
    <Flex justify="between" items="start" wrap="wrap">
      <Box
        ref={topWeekRef}
        className="w-full lg:w-[49.5%] mb-3 lg:mb-0 rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal"
      >
        <TopWeek />
      </Box>
      <Box
        ref={gameRuleRef}
        className="w-full lg:w-[49.5%] rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal"
      >
        <GameRule />
      </Box>
    </Flex>
  );
};
