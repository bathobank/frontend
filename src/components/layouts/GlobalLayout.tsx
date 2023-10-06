import {BodyContent} from "@/components/layouts/BodyContent";
import {Navbar} from "@/components/layouts/Navbar";
import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {ReactNode, useEffect} from "react";
import {useLoading} from "@/hooks/useLoading";

type Props = {
    children: ReactNode;
};

export const GlobalLayout = ({children}: Props) => {
  const loading = useLoading();

  useEffect(() => {
    loading.hide();
  }, [loading]);

  return (
    <Flex items="start">
      <Box className="w-[280px] shadow-lg">
        <Navbar />
      </Box>
      <Box className="w-[calc(100%-280px)] bg-[#2b2b31]">
        <BodyContent>
          {children}
        </BodyContent>
      </Box>
    </Flex>
  );
}
