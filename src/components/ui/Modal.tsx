import { Box, Modal as ModalMUI, Stack } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";

import { TimeIcon } from "@/components/icons/TimeIcon";
import { DefaultButton } from "@/components/ui/Button";

type Props = PropsWithChildren<{
  id: string;
  title?: string;
  isOpen?: boolean;
  onClose?: () => void;
  submitBtn?: ReactNode;
}>;

export const Modal = ({
  id,
  children,
  title,
  onClose,
  isOpen = false,
  submitBtn,
}: Props) => {
  return (
    <ModalMUI
      id={id}
      open={isOpen}
      onClose={onClose}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
    >
      <Box
        position="absolute"
        className="w-[calc(100%-30px)] max-w-[500px] m-auto bg-white top-[50%] left-[50%] outline-none"
        sx={{ transform: "translate(-50%, -50%)" }}
      >
        {title && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className="py-2 px-3 border-b rounded-t bg-white"
          >
            <h3 className="text-xl text-gray-700">{title}</h3>
            <DefaultButton onClick={onClose}>
              <TimeIcon />
            </DefaultButton>
          </Stack>
        )}
        <Box className="p-5">{children}</Box>
        <Box p={1} textAlign="center" className="border-t border-t-[#ddd]">
          {submitBtn}
          <DefaultButton onClick={onClose}>Đóng</DefaultButton>
        </Box>
      </Box>
    </ModalMUI>
  );
};
