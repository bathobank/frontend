import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

export const Card = ({
  children,
  title,
}: PropsWithChildren<{ title: string }>) => {
  return (
    <Box borderColor="#2c2c83" borderRadius="4px" overflow="hidden">
      <Box
        textAlign="center"
        bgcolor="#2c2c83"
        borderColor="#2c2c83"
        color="#ffffff"
        p="8px 12px"
        fontSize="14px"
      >
        {title}
      </Box>
      <Box
        p="10px 15px 20px 15px"
        border="1px solid #2c2c83"
        sx={{
          borderBottomLeftRadius: "4px",
          borderBottomRightRadius: "4px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
