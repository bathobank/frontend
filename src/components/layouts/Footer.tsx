import {Box} from "@/components/ui/Box";
import {Text} from "@/components/ui/Text";
import {LinkUI} from "@/components/ui/Link";
import {useEffect, useState} from "react";

export const Footer = () => {
  const [year, setYear] = useState<number>(0);

  useEffect(() => {
    const date = new Date();
    setYear(date.getFullYear());
  }, []);

  return (
    <Box className="bg-white py-3 shadow-normal" id="section-footer">
      <Text className="text-center">
        Copyright &copy; {year} by
        <LinkUI href="https://www.facebook.com/vietd126/">&nbsp;VietD</LinkUI>
      </Text>
    </Box>
  );
}
