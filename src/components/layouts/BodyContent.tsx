import {Box} from "@/components/ui/Box";
import {Container} from "@/components/ui/Container";
import {ReactNode, useEffect, useMemo, useRef, useState} from "react";
import {Text} from "@/components/ui/Text";
import {cn} from "@/utils/ui";
import {Button} from "@/components/ui/Button";
import {Flex} from "@/components/ui/Flex";

type Props = {
    children: ReactNode;
    title?: string;
    rightEl?: ReactNode;
    onReady?: () => void;
    bodyClassName?: string;
};

export const BodyContent = ({children, title, rightEl, onReady, bodyClassName}: Props) => {
  const bodyContentRef = useRef<HTMLDivElement | null>(null);
  const bodyTitleRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState<string>('100%');

  useEffect(() => {
    if (!bodyContentRef || !bodyContentRef.current) return;
    const header = document.querySelector<HTMLElement>('#section-header');
    const footer = document.querySelector<HTMLElement>('#section-footer');
    let totalHeight = 0;
    if (header) {
      totalHeight = totalHeight + header.offsetHeight;
    }
    if (footer) {
      totalHeight = totalHeight + footer.offsetHeight;
    }
    if (bodyTitleRef.current) {
      totalHeight = totalHeight + bodyTitleRef.current?.offsetHeight;
    }
    if (title || rightEl) {
      setContentHeight(`calc(100vh - ${totalHeight}px - 2.25rem)`);
    } else {
      setContentHeight(`calc(100vh - ${totalHeight}px - 1.5rem)`);
    }
    if (typeof onReady === 'function') {
      onReady();
    }
  }, [bodyContentRef, onReady, title, rightEl]);

  const justifyBox = useMemo(() => {
    if (title && rightEl) return 'between';
    return title ? 'start' : 'end';
  }, [title, rightEl]);

  return (
    <Box ref={bodyContentRef} className="py-[.75rem]">
      <Container>
        {(title || rightEl) && (
          <Flex justify={justifyBox} className="rounded-[7px] border py-[10px] px-[15px] mb-[.75rem] bg-white" ref={bodyTitleRef}>
            {title && <Text weight="semibold" className="whitespace-nowrap text-ellipsis overflow-hidden">{title}</Text>}
            {rightEl}
          </Flex>
        )}
        <Box className={cn('p-[15px] rounded-xl border overflow-auto', bodyClassName ?? '')}
          style={{height: contentHeight, maxHeight: contentHeight}}>
          {children}
        </Box>
      </Container>
    </Box>
  );
}
