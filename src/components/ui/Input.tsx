import { Box } from "@mui/material";

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

  return (
    <Box>
      {label && (
        <label className="block mb-2 text-sm font-medium" htmlFor={inputId}>
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
        )}
        ref={ref}
        {...prop}
      />
    </Box>
  );
});
