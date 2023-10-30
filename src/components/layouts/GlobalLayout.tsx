import {BodyContent} from "@/components/layouts/BodyContent";
import {Navbar} from "@/components/layouts/Navbar";
import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {ReactNode, useMemo} from "react";
import Head from "next/head";
import {useDispatch, useSelector} from "react-redux";
import {getOpenNavbar, setOpenNavbar} from "@/stores/slices/navbar";
import {cn} from "@/utils/ui";

type Props = {
  children: ReactNode;
  showHeader?: boolean;
  title?: string;
};

export const GlobalLayout = ({children, title, showHeader = true}: Props) => {
  const openNavbar = useSelector(getOpenNavbar);
  const dispatch = useDispatch();

  const hideNavbar = () => {
    dispatch(setOpenNavbar(false));
  }

  const websiteTitle = useMemo(() => {
    const suffix = 'Bát Họ Bank'
    if (!title) return suffix;
    return `${title} | ${suffix}`;
  }, [title]);

  return (
    <Box>
      <Head>
        <title>{websiteTitle}</title>
      </Head>
      <Box
        className={cn("z-[9] bg-[rgba(0,0,0,0.2)] fixed top-0 left-0 w-full h-full transition-all lg:hidden block", openNavbar ? 'visible' : 'invisible')}
        onClick={hideNavbar}
      />
      <Flex items="start">
        <Box className={
          cn(
            "w-[280px] shadow-lg fixed lg:relative z-[10] transition-all",
            openNavbar ? 'translate-x-0 top-0' : 'translate-x-[-100%] lg:translate-x-0'
          )
        }>
          <Navbar/>
        </Box>
        <Box className="w-full lg:w-[calc(100%-280px)] bg-[#2b2b31]">
          <BodyContent showHeader={showHeader}>
            {children}
          </BodyContent>
        </Box>
      </Flex>
    </Box>
  );
}
