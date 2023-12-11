import { Box } from "@/components/ui/Box";
import { Flex } from "@/components/ui/Flex";
import { Text } from "@/components/ui/Text";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export const HistoryWinGame = () => {
  return (
    <Box className="rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal">
      <Flex className="px-3 py-5 border-b border-b-[#ffffff0d]">
        <AccessTimeIcon className="text-[#ff55a5]" />
        <Text custom={true} className="ml-2 text-white">
          LỊCH SỬ THAM GIA
        </Text>
      </Flex>
      <Box className="px-3 py-5">
        <table className="w-full">
          <thead>
            <tr className="border-b border-b-[#ffffff0d]">
              <th scope="col" className="py-3">
                <Text size="xs" className="text-[#c7c7c7]">
                  NICKNAME
                </Text>
              </th>
              <th scope="col" className="py-3">
                <Text size="xs" className="text-[#c7c7c7]">
                  TIỀN CƯỢC
                </Text>
              </th>
              <th scope="col" className="py-3">
                <Text size="xs" className="text-[#c7c7c7]">
                  TIỀN NHẬN
                </Text>
              </th>
              <th scope="col" className="py-3">
                <Text size="xs" className="text-[#c7c7c7]">
                  TRÒ CHƠI
                </Text>
              </th>
              <th scope="col" className="py-3">
                <Text size="xs" className="text-[#c7c7c7]">
                  ĐÃ CHỌN
                </Text>
              </th>
              <th scope="col" className="py-3">
                <Text size="xs" className="text-[#c7c7c7]">
                  KẾT QUẢ
                </Text>
              </th>
              <th scope="col" className="py-3">
                <Text size="xs" className="text-[#c7c7c7]">
                  THỜI GIAN
                </Text>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="py-3">
                <Text size="sm">tueta****</Text>
              </td>
              <td className="py-3">
                <Text size="sm">500,000</Text>
              </td>
              <td className="py-3">
                <Text size="sm">1,145,000</Text>
              </td>
              <td className="py-3">
                <Text size="sm">CHANLE</Text>
              </td>
              <td className="py-3">
                <Text
                  as="span"
                  className="text-[12px] px-2 py-1 bg-[#ff55a51a] rounded select-none"
                >
                  L
                </Text>
              </td>
              <td className="py-3">
                <Text
                  as="span"
                  className="text-[12px] px-2 py-1 bg-[#5bceae99] rounded select-none"
                >
                  WIN
                </Text>
              </td>
              <td className="py-3">
                <Text size="sm">11/10/2023 19:54:13</Text>
              </td>
            </tr>
          </tbody>
        </table>
      </Box>
    </Box>
  );
};
