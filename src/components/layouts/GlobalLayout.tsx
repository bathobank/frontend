import {HeaderNavbar} from "@/components/layouts/HeaderNavbar";
import {BodyContent} from "@/components/layouts/BodyContent";
import {ReactNode} from "react";
import {Footer} from "@/components/layouts/Footer";
import {useLoading} from "@/hooks/useLoading";
import {cn} from "@/utils/ui";

type Props = {
    children: ReactNode;
    titleRightEl?: ReactNode;
    onReady?: () => void;
    title?: string;
    bodyClassName?: string;
    bgSrc?: string;
};

export const GlobalLayout = ({children, onReady, title, titleRightEl, bodyClassName, bgSrc}: Props) => {
  const loading = useLoading();

  const onBodyContentReady = () => {
    if (typeof onReady === 'function') {
      onReady();
    } else {
      loading.hide();
    }
  }

  return (
    <main className={cn(bgSrc ? 'bg-no-repeat bg-center bg-cover' : '')} style={{ backgroundImage: bgSrc ? `url(${bgSrc})` : undefined}}>
      <HeaderNavbar/>
      <BodyContent
        title={title}
        rightEl={titleRightEl}
        onReady={onBodyContentReady}
        bodyClassName={bodyClassName}>
        {children}
      </BodyContent>
      <Footer/>
    </main>
  );
}
