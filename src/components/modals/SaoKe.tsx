import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  content: Record<string, string | object>;
};

export const SaoKeModal = ({ isOpen, onClose, content }: Props) => {
  return (
    <Modal id="sao-ke-modal" isOpen={isOpen} title="Sao Kê" onClose={onClose}>
      <div
        style={{ maxHeight: "calc(100vh - 250px)" }}
        className="overflow-y-auto p-5"
      >
        {Object.keys(content).map((key: string, index: number) => (
          <div
            className="d-flex align-items-start mb-2"
            key={`hoa-don-${index}`}
          >
            <p style={{ color: "#B5B7C8" }} className="w-25 mb-2">
              {key}
            </p>
            <p style={{ color: "#B5B7C8" }} className="w-75 mb-2">
              {typeof content[key] !== "string" ? (
                <>{JSON.stringify(content[key])}</>
              ) : (
                <>{content[key]}</>
              )}
            </p>
          </div>
        ))}
      </div>
      <div
        style={{ borderTop: "1px solid #ffffff0d", textAlign: "right" }}
        className="mt-5 pt-5"
      >
        <Button variant="light-info" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
};
