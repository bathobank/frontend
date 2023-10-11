import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {Text} from "@/components/ui/Text";
import EngineeringIcon from '@mui/icons-material/Engineering';

export const GameRule = () => {
  return (
    <Box>
      <Flex className="px-3 py-5 border-b border-b-[#ffffff0d]">
        <EngineeringIcon className="text-[#ff55a5]" />
        <Text custom={true} className="ml-2 text-white">QUY ĐỊNH LUẬT CHƠI</Text>
      </Flex>
      <Box className="space-y-3 p-3">
        <Text>1. Hệ thống chẵn lẻ bank tính theo kết quả mã giao dịch của bạn nếu chuyển khoản cùng ngân hàng. Riêng chuyển từ vcb qua vcb sẽ tính kết quả là số giao dịch.</Text>
        <Text>2. Hệ thống sử dụng mã giao dịch của bank nhận để tính kết quả trò chơi nếu bạn chuyển khoản liên ngân hàng.</Text>
        <Text>3. Chuyển liên bank nội dung có thể bị ngân hàng thêm thắt hoặc thay đổi. HT tính theo nội dung bank HT nhận được.</Text>
        <Text>4. Hệ thống luôn show sao kê, lịch sử của bank nhận để người chơi kiểm tra - xanh chín.</Text>
        <Text>5. Hệ thống sẽ tự động đổi bank liên tục, trước khi chơi khách hàng vui lòng lên web tải lại trang để cập nhật.</Text>
        <Text>6. Hệ thống trích 1% tiền cược giao dịch win cho vào hũ JACKPOT.</Text>
        <Text>7. Chuyển khoản sai nội dung hoặc hạn mức sẽ không được hoàn tiền.</Text>
        <Text>8. Bạn cần truy cập lại web nếu quá 12h không có hoạt động nào. Nếu không HT sẽ không tính nội dung của bạn.</Text>
      </Box>
    </Box>
  );
}
