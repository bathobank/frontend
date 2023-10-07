import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {Text} from "@/components/ui/Text";
import {useToast} from "@/hooks/useToast";
import {copyContent, formatMoney} from "@/utils/helper";
import {cn} from "@/utils/ui";
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded';

const BankConfig: {code: string; title: string; number: string; name: string; min: number, max: number}[] = [
  {code: 'TCB', title: 'Techcombank', number: '1234567890', name: 'Nguyễn Văn A', min: 10000, max: 3000000},
  {code: 'VCB', title: 'Vietcombank', number: '1234567890', name: 'Nguyễn Văn A', min: 10000, max: 3000000},
  {code: 'MB', title: 'MBBank', number: '1234567890', name: 'Nguyễn Văn A', min: 10000, max: 3000000}
];

export const BankList = () => {
  const toast = useToast();

  const triggerCopyContent = (content: string) => {
    copyContent(content, () => {
      toast.success('Copy số tài khoản thành công!', { autoClose: 2000 });
    });
  }

  return (
    <Box>
      <Flex className="px-3 py-5 border-b border-b-[#ffffff0d]">
        <AccountBalanceRoundedIcon className="text-[#ff55a5]" />
        <Text custom={true} className="ml-2 text-white">THÔNG TIN BANK NHẬN</Text>
      </Flex>
      <Box className="p-3">
        <table className="w-full">
          <thead>
            <tr className="border-b border-b-[#ffffff0d]">
              <th scope="col" className="text-left py-3">
                <Text className="text-[#c7c7c7]">Ngân hàng</Text>
              </th>
              <th scope="col" className="text-left py-3">
                <Text className="text-[#c7c7c7]">Tài khoản</Text>
              </th>
              <th scope="col" className="text-left py-3">
                <Text className="text-[#c7c7c7]">Cược</Text>
              </th>
              <th scope="col" className="py-3">
                <Text className="text-[#c7c7c7]">QR</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {BankConfig.map((config, index) => (
              <tr key={`tr-bank-list-${index}`} className={cn(index > 0 ? "border-t border-t-[#ffffff0d]" : '')}>
                <td className="py-3 w-[130px]">
                  <Text size="sm">Mã NH: {config.code}</Text>
                  <Text size="sm">{config.title}</Text>
                </td>
                <td className="py-3 w-[150px]">
                  <Flex className="cursor-pointer select-none" onClick={() => triggerCopyContent(config.number)}>
                    <Text size="sm" custom={true} className="mr-1">{config.number}</Text>
                    <ContentCopyRoundedIcon className="!text-[18px] text-[#ff55a5]" />
                  </Flex>
                  <Text size="sm">{config.name}</Text>
                </td>
                <td className="py-3">
                  <Text size="sm">Min: <span className="text-[#ff55a5]">{formatMoney(config.min)}</span></Text>
                  <Text size="sm">Max: <span className="text-[#ff55a5]">{formatMoney(config.max)}</span></Text>
                </td>
                <td className="min-w-[50px] text-center">
                  <Flex justify="center">
                    <Box className="p-1 bg-[#ff55a51a] rounded cursor-pointer">
                      <QrCode2RoundedIcon className="text-[#5bceae]" />
                    </Box>
                  </Flex>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
}
