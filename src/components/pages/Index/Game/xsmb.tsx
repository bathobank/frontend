import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {Text} from "@/components/ui/Text";
import {useToast} from "@/hooks/useToast";
import {useUser} from "@/hooks/useUser";
import {copyContent} from "@/utils/helper";
import CasinoRoundedIcon from '@mui/icons-material/CasinoRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';

export const GameXsmb = () => {
  const toast = useToast();
  const {user} = useUser();

  const triggerCopyContent = (content: string) => {
    copyContent(content, () => {
      toast.success('Copy nội dung thành công!', { autoClose: 2000 });
    });
  }

  return (
    <Box>
      <Flex className="px-3 py-5 border-b border-b-[#ffffff0d]">
        <CasinoRoundedIcon className="text-[#ff55a5]" />
        <Text custom={true} className="ml-2 text-white">XỔ SỐ MIỀN BẮC</Text>
      </Flex>
      <Box className="p-3">
        <table className="w-full">
          <thead>
            <tr className="border-b border-b-[#ffffff0d]">
              <th scope="col" className="text-left py-3">
                <Text className="text-[#c7c7c7]">Loại</Text>
              </th>
              <th scope="col" className="text-left py-3">
                <Text className="text-[#c7c7c7]">Nội dung</Text>
              </th>
              <th scope="col" className="py-3">
                <Text className="text-[#c7c7c7]">Tỉ lệ</Text>
              </th>
              <th scope="col" className="py-3">
                <Text className="text-[#c7c7c7]">SỐ CHỌN</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3">
                <Text>LÔ</Text>
              </td>
              <td className="py-3 w-[150px]">
                <Flex className="cursor-pointer select-none" onClick={() => triggerCopyContent(`${user?.nickname ?? 'nickname'} XSL`)}>
                  <Text custom={true} className="mr-1">{user?.nickname ?? 'nickname'} XSL (số chọn)</Text>
                  <ContentCopyRoundedIcon className="!text-[18px] text-[#ff55a5]" />
                </Flex>
              </td>
              <td className="py-3">
                <Text align="center">22K ăn 80K</Text>
              </td>
              <td className="min-w-[50px] text-center">
                <Flex justify="center">
                  <Text className="text-[12px] px-2 py-1 bg-[#ff55a51a] rounded select-none">00</Text>
                  <ArrowRightAltRoundedIcon className='text-white' />
                  <Text className="text-[12px] px-2 py-1 bg-[#ff55a51a] rounded select-none">99</Text>
                </Flex>
              </td>
            </tr>
            <tr className="border-t border-t-[#ffffff0d]">
              <td className="py-3">
                <Text>ĐỀ</Text>
              </td>
              <td className="py-3 w-[150px]">
                <Flex className="cursor-pointer select-none" onClick={() => triggerCopyContent(`${user?.nickname ?? 'nickname'} XSD`)}>
                  <Text custom={true} className="mr-1">{user?.nickname ?? 'nickname'} XSD (số chọn)</Text>
                  <ContentCopyRoundedIcon className="!text-[18px] text-[#ff55a5]" />
                </Flex>
              </td>
              <td className="py-3">
                <Text align="center">1K ăn 80K</Text>
              </td>
              <td className="min-w-[50px] text-center">
                <Flex justify="center">
                  <Text className="text-[12px] px-2 py-1 bg-[#ff55a51a] rounded select-none">00</Text>
                  <ArrowRightAltRoundedIcon className='text-white' />
                  <Text className="text-[12px] px-2 py-1 bg-[#ff55a51a] rounded select-none">99</Text>
                </Flex>
              </td>
            </tr>
            <tr className="border-t border-t-[#ffffff0d]">
              <td className="py-3">
                <Text>XIÊN 2</Text>
              </td>
              <td className="py-3 w-[150px]">
                <Flex className="cursor-pointer select-none" onClick={() => triggerCopyContent(`${user?.nickname ?? 'nickname'} XSX`)}>
                  <Text custom={true} className="mr-1">{user?.nickname ?? 'nickname'} XSX (số chọn)</Text>
                  <ContentCopyRoundedIcon className="!text-[18px] text-[#ff55a5]" />
                </Flex>
              </td>
              <td className="py-3">
                <Text align="center">10K ăn 100K</Text>
              </td>
              <td className="min-w-[50px] text-center">
                <Flex justify="center">
                  <Text className="text-[12px] px-2 py-1 bg-[#ff55a51a] rounded select-none">00</Text>
                  <ArrowRightAltRoundedIcon className='text-white' />
                  <Text className="text-[12px] px-2 py-1 bg-[#ff55a51a] rounded select-none">99</Text>
                </Flex>
              </td>
            </tr>
            <tr className="border-t border-t-[#ffffff0d]">
              <td colSpan={4} className="py-3">
                <Flex>
                  <Text className="mr-2">ĐÁNH LÔ 85</Text>
                  <ArrowRightAltRoundedIcon className='text-white' />
                  <Text className="text-[12px] ml-2 px-2 py-1 bg-[#ff55a51a] rounded select-none">{user?.nickname ?? 'nickname'} XSL 85</Text>
                </Flex>
              </td>
            </tr>
            <tr className="border-t border-t-[#ffffff0d]">
              <td colSpan={4} className="py-3">
                <Flex>
                  <Text className="mr-2">ĐÁNH ĐỀ 85</Text>
                  <ArrowRightAltRoundedIcon className='text-white' />
                  <Text className="text-[12px] ml-2 px-2 py-1 bg-[#ff55a51a] rounded select-none">{user?.nickname ?? 'nickname'} XSD 85</Text>
                </Flex>
              </td>
            </tr>
            <tr className="border-t border-t-[#ffffff0d]">
              <td colSpan={4} className="py-3">
                <Flex>
                  <Text className="mr-2">ĐÁNH XIÊN 85-58</Text>
                  <ArrowRightAltRoundedIcon className='text-white' />
                  <Text className="text-[12px] ml-2 px-2 py-1 bg-[#ff55a51a] rounded select-none">{user?.nickname ?? 'nickname'} XSX 85 58</Text>
                </Flex>
              </td>
            </tr>
          </tbody>
        </table>
        <Box className="py-5">
          <Text className="italic text-[12px] text-center mb-3">
            KẾT QUẢ TÍNH THEO KẾT QUẢ XSMB QUAY THƯỞNG LÚC <span className="text-[#ff55a5]">18:30</span> HẰNG NGÀY.
          </Text>
          <Text className="italic text-[12px] text-center">
            CÁC GIAO DỊCH NHẬN ĐƯỢC SAU <span className="text-[#ff55a5]">18:00</span> SẼ TÍNH VÀO NGÀY HÔM SAU
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
