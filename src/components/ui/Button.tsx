import {ReactNode, useCallback} from "react";
import {cn} from "@/utils/ui";

const variantClass = {
  'primary': "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
  'light': 'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700',
  'theme': "text-white bg-[#ff55a5] hover:bg-[#ff1583] transition-all font-medium rounded-lg text-sm px-5 py-2.5 outline-none focus:outline-none"
};

type TVariantClass = keyof typeof variantClass;

type Props = {
    children: ReactNode;
    variant?: TVariantClass;
    className?: string;
    onClick?: () => void;
    fullWidth?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit';
};

export const Button = ({children, fullWidth = false, disabled = false, variant = 'primary', type = 'button', onClick, className}: Props) => {
  const btnClick = useCallback(() => {
    if (disabled) return;
    if (onClick) onClick();
  }, [disabled, onClick]);

  return (
    <button
      className={cn(variantClass[variant], className ?? '', fullWidth ? 'w-full' : '', disabled ? 'opacity-50 pointer-events-none select-none' : '')}
      onClick={btnClick}
      type={type}>
      {children}
    </button>
  );
}
