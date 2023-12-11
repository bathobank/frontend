import { Box } from "@/components/ui/Box";
import { useStore } from "@/hooks/useStore";
import { getFontClassName } from "@/stores/slices/font";
import { forwardRefWithAs } from "@/utils/forwardRefWithAs";
import { uuidv4 } from "@/utils/helper";
import { cn } from "@/utils/ui";

type Props = {
  label?: string;
  id?: string;
  name?: string;
  type?: string;
  className?: string;
  [key: string]: unknown;
};

export const Input = forwardRefWithAs<"input", Props>((props, ref) => {
  const { label, id, name, type = "text", className = "", ...prop } = props;

  const inputId = id ?? uuidv4();
  const inputName = name ?? inputId;
  const { get } = useStore();
  const fontClassName = get(getFontClassName) as string;

  return (
    <Box>
      {label && (
        <label
          className="block mb-2 text-sm font-medium text-white"
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={inputId}
        name={inputName}
        className={cn(
          "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          className,
          fontClassName,
        )}
        ref={ref}
        {...prop}
      />
    </Box>
  );
});
