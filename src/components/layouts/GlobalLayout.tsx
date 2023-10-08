import {BodyContent} from "@/components/layouts/BodyContent";
import {Navbar} from "@/components/layouts/Navbar";
import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {ReactNode, useEffect} from "react";

type Props = {
    children: ReactNode;
    showHeader?: boolean;
};

export const GlobalLayout = ({children, showHeader = true}: Props) => {
  return (
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
  );
}
