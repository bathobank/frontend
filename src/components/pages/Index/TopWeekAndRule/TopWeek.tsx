import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {Text} from "@/components/ui/Text";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {useEffect, useState} from "react";
import {TTopWeek} from "@/@types/top-week";
import {useTopWeekQuery} from "@/queries/top-week";
import {formatMoney, hiddenText} from "@/utils/helper";

export const TopWeek = () => {
  const [topWeek, setTopWeek] = useState<TTopWeek[]>([]);
  const topWeekQuery = useTopWeekQuery();

  useEffect(() => {
    if (topWeekQuery) {
      setTopWeek(topWeekQuery.data.top_week);
    }
  }, [topWeekQuery]);

  return (
    <Box>
      <Flex className="px-3 py-5 border-b border-b-[#ffffff0d]">
        <AttachMoneyIcon className="text-[#ff55a5]" />
        <Text custom={true} className="ml-2 text-white">ĐẠI GIA TUẦN</Text>
      </Flex>
      <Box>
        <table className="w-full">
          <thead>
            <tr className="border-b border-b-[#ffffff0d]">
              <th scope="col" className="py-3">
                <Text size="xs" className="text-[#c7c7c7]">HẠNG</Text>
              </th>
              <th scope="col" className="py-3">
                <Text size="xs" className="text-[#c7c7c7]">NICKNAME</Text>
              </th>
              <th scope="col" className="py-3">
                <Text size="xs" className="text-[#c7c7c7]">TỔNG CƯỢC</Text>
              </th>
              <th scope="col" className="py-3">
                <Text size="xs" className="text-[#c7c7c7]">PHẦN THƯỞNG</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {topWeek.map((top, index) => (
              <tr className="text-center" key={`top-week-${index}`}>
                <td className="py-3">
                  <Text size="sm">NO{index + 1}</Text>
                </td>
                <td className="py-3">
                  <Text size="sm">{hiddenText(top.nickname)}</Text>
                </td>
                <td className="py-3">
                  <Text size="sm">{formatMoney(top.money)}</Text>
                </td>
                <td className="py-3">
                  <Text size="sm">{formatMoney(top.reward)}</Text>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
      <Box className="py-5">
        <Text className="italic text-[12px] text-center mb-3">
          PHẦN THƯỞNG TOP SẼ ĐƯỢC TRAO VÀO <span className="text-[#ff55a5]">00:00</span> THỨ <span className="text-[#ff55a5]">2</span> TUẦN TIẾP THEO.
        </Text>
        {/*<Text className="italic text-[12px] text-center">*/}
        {/*  VUI LÒNG KIỂM TRA LỊCH SỬ GIAO DỊCH <span className="text-[#ff55a5]">THUONGTOP</span> ĐỂ TRẢ THƯỞNG*/}
        {/*</Text>*/}
      </Box>
    </Box>
  );
}
