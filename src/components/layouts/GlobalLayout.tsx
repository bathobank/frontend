import {BodyContent} from "@/components/layouts/BodyContent";
import {Navbar} from "@/components/layouts/Navbar";
import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {ReactNode, useMemo} from "react";
import Head from "next/head";
import {useDispatch, useSelector} from "react-redux";
import {getOpenNavbar, setOpenNavbar} from "@/stores/slices/navbar";
import {cn} from "@/utils/ui";
import {TSystemSetting} from "@/@types/system-setting";

type Props = {
  children: ReactNode;
  showHeader?: boolean;
  title?: string;
  systemSettings: TSystemSetting;
};

export const GlobalLayout = ({children, title, systemSettings, showHeader = true}: Props) => {
  const openNavbar = useSelector(getOpenNavbar);
  const dispatch = useDispatch();

  const hideNavbar = () => {
    dispatch(setOpenNavbar(false));
  }

  const websiteTitle = useMemo(() => {
    const suffix = systemSettings.suffix_title;
    if (!title) return suffix;
    return `${title} | ${suffix}`;
  }, [systemSettings, title]);

  return (
    <Box>
      <Head>
        <title>{websiteTitle}</title>
        <link rel="shortcut icon" href={systemSettings.icon} />
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
          <Navbar logo={systemSettings.logo} author={systemSettings.author_name}/>
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
