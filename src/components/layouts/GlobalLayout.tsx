import {BodyContent} from "@/components/layouts/BodyContent";
import {Navbar} from "@/components/layouts/Navbar";
import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {ReactNode, useMemo} from "react";
import Head from "next/head";

type Props = {
    children: ReactNode;
    showHeader?: boolean;
    title?: string;
};

export const GlobalLayout = ({children, title, showHeader = true}: Props) => {
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
      <Flex items="start">
        <Box className="w-[280px] shadow-lg">
          <Navbar />
        </Box>
        <Box className="w-[calc(100%-280px)] bg-[#2b2b31]">
          <BodyContent showHeader={showHeader}>
            {children}
          </BodyContent>
        </Box>
      </Flex>
    </Box>
  );
}
