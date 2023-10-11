import {GlobalLayout} from "@/components/layouts/GlobalLayout";
import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {LinkUI} from "@/components/ui/Link";
import {Text} from "@/components/ui/Text";
import {formatMoney} from "@/utils/helper";
import {cn} from "@/utils/ui";
import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded';

type TMission = {
  money: number;
  point: number;
}

const Missions: TMission[] = [
  {money: 1000000, point: 11111},
  {money: 5000000, point: 55555},
  {money: 10000000, point: 111111},
  {money: 30000000, point: 333333},
  {money: 49000000, point: 555555},
  {money: 100000000, point: 1111111},
  {money: 200000000, point: 2222222},
  {money: 500000000, point: 6666666}
];

export default function DailyMission(){
  return (
    <GlobalLayout showHeader={false}>
      <Box className='rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal mt-5 px-3'>
        <Flex justify="center" className="border-b border-[#ffffff0d] py-3">
          <ConfirmationNumberRoundedIcon className="text-[#ff55a5] mr-3" />
          <Text custom={true}>NHIỆM VỤ NGÀY</Text>
        </Flex>
        <Box className="py-5">
          <Box className="text-center">
            <Text size="sm">VUI LÒNG <LinkUI href='/auth/login' className="text-[#ff55a5]">ĐĂNG NHẬP</LinkUI> HOẶC <LinkUI href="/auth/register" className="text-[#ff55a5]">ĐĂNG KÝ NHANH</LinkUI> ĐỂ NHẬN THƯỞNG</Text>
          </Box>
          <Box className="w-full max-w-[550px] m-auto border border-[#ffffff0d] mt-7">
            <table className="w-full">
              <thead>
                <tr className="border-b border-b-[#ffffff0d]">
                  <th scope="col" className="py-3">
                    <Text size="xs" className="text-[#c7c7c7]">MỐC CHƠI</Text>
                  </th>
                  <th scope="col" className="py-3">
                    <Text size="xs" className="text-[#c7c7c7]">THƯỞNG</Text>
                  </th>
                  <th scope="col" className="py-3">
                    <Text size="xs" className="text-[#c7c7c7]">TRẠNG THÁI</Text>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Missions.map((mission, index) => (
                  <tr className={cn("text-center", index > 0 ? 'border-t border-t-[#ffffff0d]' : '')} key={`mission-list-${index}`}>
                    <td className="py-3">
                      <Text size="sm">{formatMoney(mission.money)}</Text>
                    </td>
                    <td className="py-3">
                      <Text size="sm">{formatMoney(mission.point)}</Text>
                    </td>
                    <td className="py-3">
                      <Text as="span" size="xs" className="text-[12px] px-2 py-1 bg-[#f266271a] rounded select-none">CHƯA ĐẠT</Text>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>
      </Box>
    </GlobalLayout>
  );
}
