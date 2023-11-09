import {Header} from "@/components/layouts/Header";
import {Box} from "@/components/ui/Box";
import {ReactNode, useEffect, useRef, useState} from "react";
import {getOpenNavbar} from "@/stores/slices/navbar";
import {useSelector} from "react-redux";
import {getGameOpen} from "@/stores/slices/game";

export const BodyContent = ({children, logo, showHeader = true,}: { children: ReactNode, logo: string, showHeader?: boolean }) => {
  const [bodyHeight, setBodyHeight] = useState<string>('100%');
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const openNavbar = useSelector(getOpenNavbar);
  const gameOpen = useSelector(getGameOpen);

  useEffect(() => {
    if (!headerRef.current) return;
    setBodyHeight(`calc(100vh - ${headerRef.current!.offsetHeight}px)`);
  }, [headerRef, openNavbar]);

  useEffect(() => {
    if (!bodyRef.current) return;
    bodyRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  }, [bodyRef, gameOpen]);

  return (
    <Box className="min-h-[100vh]">
      <Box ref={headerRef}>
        <Header showHeader={showHeader} logo={logo}/>
      </Box>
      <Box ref={bodyRef} className="overflow-auto px-3" style={{height: bodyHeight, maxHeight: bodyHeight}}>
        {children}
      </Box>
    </Box>
  );
}
