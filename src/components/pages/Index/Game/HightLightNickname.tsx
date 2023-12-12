import { useToast } from "@/hooks/useToast";
import { copyContent } from "@/utils/helper";

export const HightLightNickname = ({ content }: { content: string }) => {
  const toast = useToast();

  const triggerCopyContent = (content: string) => {
    copyContent(content, () => {
      toast.success("Copy nội dung thành công!", { autoClose: 2000 });
    });
  };

  return (
    <div
      className="d-flex cursor-pointer select-none align-items-center"
      onClick={() => triggerCopyContent(content)}
    >
      <span className="mr-1">{content}</span>
      <i className="!hl-text bi bi-copy fs-xl ms-2" />
    </div>
  );
};
