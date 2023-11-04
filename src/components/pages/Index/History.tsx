import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {LinkUI} from "@/components/ui/Link";
import {Text} from "@/components/ui/Text";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {useUserHistories} from "@/queries/histories";
import {useEffect, useState} from "react";
import {THistories} from "@/@types/history";
import {cn} from "@/utils/ui";
import {formatMoney} from "@/utils/helper";
import {useUser} from "@/hooks/useUser";
import { SaoKeModal } from "@/components/modals/SaoKe";

export const History = ({isFull = false}: { isFull?: boolean}) => {
  const [histories, setHistories] = useState<THistories>([]);
  const [isOpenModalSaoKe, setOpenModalSaoKe] = useState<boolean>(false);
  const [imgSaoke, setImgSaoke] = useState<string|null>(null);
  const historyQuery = useUserHistories(isFull ? -1 : 5);
  const {isLogined} = useUser();

  useEffect(() => {
    if (historyQuery) {
      setHistories(historyQuery.data.histories);
    }
  }, [historyQuery]);

  const openModalSaoKe = (img: string) => {
    setImgSaoke(img);
    setOpenModalSaoKe(true);
  }

  return (
    <Box className='rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal'>
      {!isFull && (
        <Flex className="px-3 py-5 border-b border-b-[#ffffff0d]">
          <AccessTimeIcon className="text-[#ff55a5]" />
          <Text custom={true} className="ml-2 text-white">LỊCH SỬ CHƠI GẦN ĐÂY</Text>
        </Flex>
      )}
      <Box className="px-3 py-5">
        {isLogined ? (
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
                      <Text size="sm">{history.order?.status.toUpperCase() ?? ''}</Text>
                    </td>
                    <td className="py-3 text-center">
                      {history.order?.transaction_receipt && (
                        <Text size="sm" className="hover:underline text-green-500 hover:text-green-700" onClick={() => openModalSaoKe(history.order?.transaction_receipt ?? '')}>
                          Xem sao kê
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
            <Box className="py-5">
              <Text className="italic text-[12px] text-center">
                  KẾT QUẢ TÍNH BẰNG SỐ CUỐI CỦA <span className="text-[#ff55a5]">MÃ GIAO DỊCH BANK</span> KHI CHUYỂN KHOẢN VÀO BANK NHẬN CỦA WEB
              </Text>
            </Box>
          </Box>
        ) : (
          <Text align="center" size="sm">ĐỂ XEM LỊCH SỬ, VUI LÒNG <LinkUI href='/auth/login' className="text-[#ff55a5]">ĐĂNG NHẬP</LinkUI> HOẶC <LinkUI href="/auth/register" className="text-[#ff55a5]">ĐĂNG KÝ NHANH</LinkUI></Text>
        )}
      </Box>
      <SaoKeModal
        isOpen={isOpenModalSaoKe}
        onClose={() => setOpenModalSaoKe(false)}
        img={imgSaoke}
      />
    </Box>
  );
}
