import {TMission} from "@/@types/mission";
import {GlobalLayout} from "@/components/layouts/GlobalLayout";
import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {LinkUI} from "@/components/ui/Link";
import {Text} from "@/components/ui/Text";
import {useUser} from "@/hooks/useUser";
import {useMissionQuery} from "@/queries/mission/all";
import {formatMoney} from "@/utils/helper";
import {cn} from "@/utils/ui";
import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded';
import {useEffect, useState} from "react";
import {useLoading} from "@/hooks/useLoading";

export default function DailyMission(){
  const [missions, setMissions] = useState<TMission[]>([]);
  const missionQuery = useMissionQuery();
  const {isLogined} = useUser();
  const loading = useLoading();

  useEffect(() => {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    let timeoutClearLoading: any = null;
    timeoutClearLoading = setTimeout(loading.hide, 500);

    return () => {
      clearTimeout(timeoutClearLoading);
    }
  },
  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  []
  );

  useEffect(() => {
    if (missionQuery) {
      setMissions(missionQuery.data.missions);
    }
  }, [missionQuery]);

  return (
    <GlobalLayout showHeader={false} title="Nhiệm vụ ngày">
      <Box className='rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal mt-5 px-3'>
        <Flex justify="center" className="border-b border-[#ffffff0d] py-3">
          <ConfirmationNumberRoundedIcon className="text-[#ff55a5] mr-3" />
          <Text custom={true}>NHIỆM VỤ NGÀY</Text>
        </Flex>
        <Box className="py-5">
          <Box className="text-center">
            {isLogined ? (
              <Text>Tổng chơi trong ngày: <span className="text-[#ff55a5]">0</span></Text>
            ) : (
              <Text size="sm">VUI LÒNG <LinkUI href='/auth/login' className="text-[#ff55a5]">ĐĂNG NHẬP</LinkUI> HOẶC <LinkUI href="/auth/register" className="text-[#ff55a5]">ĐĂNG KÝ NHANH</LinkUI> ĐỂ NHẬN THƯỞNG</Text>
            )}
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
                {missions.map((mission, index) => (
                  <tr className={cn("text-center", index > 0 ? 'border-t border-t-[#ffffff0d]' : '')} key={`mission-list-${index}`}>
                    <td className="py-3">
                      <Text size="sm">{formatMoney(mission.milestone)}</Text>
                    </td>
                    <td className="py-3">
                      <Text size="sm">{formatMoney(mission.bonus)}</Text>
                    </td>
                    <td className="py-3">
                      {mission.is_done === 0 ? (
                        <Text
                          as="span"
                          size="xs"
                          className="text-[12px] px-2 py-1 bg-[#f266271a] rounded select-none">
                          Chưa đạt
                        </Text>
                      ) : (
                        <Text
                          as="span"
                          size="xs"
                          className="text-[12px] px-2 py-1 bg-[#3ab43196] rounded select-none">
                          Đã đạt
                        </Text>
                      )}
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
