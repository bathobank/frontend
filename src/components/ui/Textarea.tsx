import { Box } from "@/components/ui/Box";
import { forwardRefWithAs } from "@/utils/forwardRefWithAs";
import { uuidv4 } from "@/utils/helper";
import { cn } from "@/utils/ui";

type Props = {
  label?: string;
  id?: string;
  name?: string;
  rows?: number;
  className?: string;
  [key: string]: unknown;
};

export const Textarea = forwardRefWithAs<"textarea", Props>(
  ({ label, id, name, rows = 4, className = "", ...props }: Props, ref) => {
    id = id ?? uuidv4();
    name = name ?? id;

    return (
      <Box>
        {label && (
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <textarea
          id={id}
          name={name}
          rows={rows}
          className={cn(
            "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
            className,
          )}
          ref={ref}
          {...props}
        />
      </Box>
    );
  },
);
