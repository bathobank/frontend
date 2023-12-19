import { PropsWithChildren } from "react";

import { uuidv4 } from "@/utils/helper";

type Props = PropsWithChildren<{ headers: string[] }>;

export const Table = ({ headers, children }: Props) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-b-[#ffffff0d] bg-[#2c2c83]">
            {headers.map((header: string) => {
              return (
                <th
                  key={"table-thead-" + uuidv4()}
                  scope="col"
                  className="align-middle text-[13px] font-[800] py-[8px] px-[4px] text-white"
                  style={{ border: "1px solid #ddd" }}
                >
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};
