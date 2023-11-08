import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {Text} from "@/components/ui/Text";
import {useEffect, useState} from "react";
import {THistories, THistoriesQuery} from "@/@types/history";
import {cn} from "@/utils/ui";
import {formatMoney} from "@/utils/helper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {HoaDonModal} from "@/components/modals/HoaDon";
import {SaoKeModal} from "@/components/modals/SaoKe";

export const History = ({historyQuery, title}: { historyQuery: THistoriesQuery|undefined, title: string}) => {
  const [histories, setHistories] = useState<THistories>([]);
  const [isOpenModalHoaDon, setOpenModalHoaDon] = useState<boolean>(false);
  const [isOpenModalSaoKe, setOpenModalSaoKe] = useState<boolean>(false);
  const [contentSaoKe, setContentSaoKe] = useState<Record<string, string|object>>({});
  const [imgSaoke, setImgSaoke] = useState<string|null>(null);

  useEffect(() => {
    if (historyQuery) {
      setHistories(historyQuery.data.histories);
    } else {
      setHistories([]);
    }
  }, [historyQuery]);

  const openModalHoaDon = (img: string) => {
    setImgSaoke(img);
    setOpenModalHoaDon(true);
  }

  const openModalSaoKe = (content: Record<string, string|object>) => {
    setContentSaoKe(content);
    setOpenModalSaoKe(true);
  }

  return (
    <Box className='rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal'>
      <Flex className="px-3 py-5 border-b border-b-[#ffffff0d]">
        <AccessTimeIcon className="text-[#ff55a5]" />
        <Text custom={true} className="ml-2 text-white">{title}</Text>
      </Flex>
      <Box className="p-3">
        <table className="w-full">
          <thead>
            <tr className="border-b border-b-[#ffffff0d]">
              <th scope="col" className="py-3 text-center">
                <Text className="text-[#c7c7c7]">Trò chơi</Text>
              </th>
              <th scope="col" className="py-3 text-center">
                <Text className="text-[#c7c7c7]">Đã chọn</Text>
              </th>
              <th scope="col" className="py-3 text-center">
                <Text className="text-[#c7c7c7]">Mã giao dịch</Text>
              </th>
              <th scope="col" className="py-3 text-center">
                <Text className="text-[#c7c7c7]">Số tiền</Text>
              </th>
              <th scope="col" className="py-3 text-center">
                <Text className="text-[#c7c7c7]">Kết quả</Text>
              </th>
              <th scope="col" className="py-3 text-center">
                <Text className="text-[#c7c7c7]">Trả thưởng</Text>
              </th>
              <th scope="col" className="py-3 text-center">
                <Text className="text-[#c7c7c7]">Sao kê</Text>
              </th>
              <th scope="col" className="py-3 text-center">
                <Text className="text-[#c7c7c7]">Hóa đơn</Text>
              </th>
              <th scope="col" className="py-3 text-center">
                <Text className="text-[#c7c7c7]">Thời gian</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {histories.map((history, index) => (
              <tr key={`tr-history-${index}`} className={cn(index > 0 ? "border-t border-t-[#ffffff0d]" : '')}>
                <td className="py-3 text-center">
                  <Text size="sm">{history.game_group.toUpperCase()}</Text>
                </td>
                <td className="py-3 text-center">
                  <Flex justify="center">
                    <Text size="sm" className="text-[12px] px-2 py-1 bg-[#ff55a51a] rounded select-none">
                      {history.game_type.toUpperCase()}
                    </Text>
                  </Flex>
                </td>
                <td className="py-3 text-center">
                  <Text size="sm">{history.transaction_code}</Text>
                </td>
                <td className="py-3 text-center">
                  <Text size="sm">{formatMoney(history.money_coming)}</Text>
                </td>
                <td className="py-3 text-center">
                  {history.status === 'L' ? (
                    <Text as="span" className="text-[12px] px-2 py-1 bg-[#d9534f99] rounded select-none">
                      LOST
                    </Text>
                  ) : (
                    <Text as="span" className="text-[12px] px-2 py-1 bg-[#5bceae99] rounded select-none">
                      WIN
                    </Text>
                  )}
                </td>
                <td className="py-3 text-center">
                  {history.order?.status === 'done' && (
                    <Text as="span" className="text-[12px] px-2 py-1 bg-[#5bceae99] rounded select-none">
                      DONE
                    </Text>
                  )}
                  {history.order?.status === 'wait' && (
                    <Text as="span" className="text-[12px] px-2 py-1 bg-yellow-300 text-gray-900 rounded select-none">
                      WAIT
                    </Text>
                  )}
                  {history.order?.status === 'error' && (
                    <Text as="span" className="text-[12px] px-2 py-1 bg-[#d9534f99] rounded select-none">
                      ERROR
                    </Text>
                  )}
                </td>
                <td className="py-3 text-center">
                  <Text size="sm" className="hover:underline text-green-500 hover:text-green-700 cursor-pointer" onClick={() => openModalSaoKe(history.content)}>
                    Xem sao kê
                  </Text>
                </td>
                <td className="py-3 text-center">
                  {history.order?.transaction_receipt && (
                    <Text size="sm" className="hover:underline text-blue-500 hover:text-blue-700 cursor-pointer" onClick={() => openModalHoaDon(history.order?.transaction_receipt ?? '')}>
                      Xem hóa đơn
                    </Text>
                  )}
                </td>
                <td className="py-3 text-center">
                  <Text size="sm">{history.game_time}</Text>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
      <HoaDonModal
        isOpen={isOpenModalHoaDon}
        onClose={() => setOpenModalHoaDon(false)}
        img={imgSaoke}
      />
      <SaoKeModal
        isOpen={isOpenModalSaoKe}
        onClose={() => setOpenModalSaoKe(false)}
        content={contentSaoKe}
      />
    </Box>
  );
}
