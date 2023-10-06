import {Box} from "@/components/ui/Box";
import {Text} from "@/components/ui/Text";
import {Hr} from "@/components/ui/Hr";
import {Flex} from "@/components/ui/Flex";
import {useEffect, useRef, useState} from "react";

export const BoxTask = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<string>('100%');

  useEffect(() => {
    if (!headerRef || !headerRef.current) return;
    setContentHeight(`calc(100% - ${headerRef.current!.clientHeight}px)`);
  }, [headerRef]);

  return (
    <Flex direction="column" className="w-[350px] h-full min-h-full border rounded-xl p-[15px] flex-[0_0_auto] bg-[#f1f2f4]">
      <Box className="w-full" ref={headerRef}>
        <Box className="px-[15px]">
          <Text weight="semibold">Tasks</Text>
        </Box>
        <Hr />
      </Box>
      <Box className="w-full overflow-auto rounded-xl" style={{height: contentHeight, maxHeight: contentHeight}}>
        {[1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8].map((value, index) => (
          <Box className="el-item-task bg-white p-[15px] rounded-xl mb-2 cursor-pointer" key={`box-task-${index}`}>
            <Text size="sm">{value}: Lorem lorem lorem lorem lorem lorem lorem lorem</Text>
          </Box>
        ))}
      </Box>
    </Flex>
  );
}
