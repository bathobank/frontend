import { Button } from "@/components/ui/Button";
import { Flex } from "@/components/ui/Flex";
import { Modal } from "@/components/ui/Modal";
import { Box } from "@/components/ui/Box";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  content: Record<string, string | object>;
};

export const SaoKeModal = ({ isOpen, onClose, content }: Props) => {
  return (
    <Modal
      id="sao-ke-modal"
      isOpen={isOpen}
      isDark={true}
      title="Sao Kê"
      onClose={onClose}
    >
      <Box className="max-h-[calc(100vh-250px)] overflow-y-auto p-5 bg-[#28282d] text-gray-300">
        {Object.keys(content).map((key: string, index: number) => (
          <Flex className="mb-2" items="start" key={`hoa-don-${index}`}>
            <Box className="w-[30%]">{key}</Box>
            <Box className="w-[70%]">
              {typeof content[key] !== "string" ? (
                <>{JSON.stringify(content[key])}</>
              ) : (
                <>{content[key]}</>
              )}
            </Box>
          </Flex>
        ))}
      </Box>
      <Flex
        items="center"
        justify="center"
        className="p-6 bg-[#28282d] border-t-[#4a4d5194] border-t-2 rounded-b gap-[10px]"
      >
        <Button variant="light" onClick={onClose}>
          Close
        </Button>
      </Flex>
    </Modal>
  );
};
