import { Box, Stack } from "@mui/material";

import { Modal } from "@/components/ui/Modal";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  content: Record<string, string | object>;
};

export const SaoKeModal = ({ isOpen, onClose, content }: Props) => {
  return (
    <Modal id="sao-ke-modal" isOpen={isOpen} title="Sao Kê" onClose={onClose}>
      {Object.keys(content).map((key: string, index: number) => (
        <Stack
          direction="row"
          className="mb-2"
          alignItems="start"
          key={`hoa-don-${index}`}
        >
          <Box className="w-[30%]">{key}</Box>
          <Box className="w-[70%] break-all">
            {typeof content[key] !== "string" ? (
              <>{JSON.stringify(content[key])}</>
            ) : (
              <>{content[key]}</>
            )}
          </Box>
        </Stack>
      ))}
    </Modal>
  );
};
