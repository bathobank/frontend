import {Header} from "@/components/layouts/Header";
import {Box} from "@/components/ui/Box";
import {ReactNode, useEffect, useRef, useState} from "react";

export const BodyContent = ({children}: { children: ReactNode }) => {
  const [bodyHeight, setBodyHeight] = useState<string>('100%');
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    setBodyHeight(`calc(100vh - ${headerRef.current!.offsetHeight}px)`);
  }, [headerRef]);

  return (
    <Box className="min-h-[100vh]">
      <Box ref={headerRef}>
        <Header/>
      </Box>
      <Box className="overflow-auto px-3" style={{height: bodyHeight, maxHeight: bodyHeight}}>
        {children}
      </Box>
    </Box>
  );
}
