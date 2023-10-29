import Link from "next/link";
import {ReactNode} from "react";
import {cn} from "@/utils/ui";

type Props = {
  children: ReactNode;
  href: string;
  className?: string;
  underline?: boolean;
  target?: string;
}

export const LinkUI = ({children, href, className = '', underline = true, target = '_self'}: Props) => {
  let clsDefault: string = "font-medium text-primary-600 dark:text-primary-500";
  if (underline === true) {
    clsDefault += ' hover:underline';
  }
  return (
    <Link href={href} target={target} className={cn(clsDefault, className)}>
      {children}
    </Link>
  );
}
