import {TBank} from "@/@types/bank";
import {BankQRModal} from "@/components/modals/BankQR";
import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {Text} from "@/components/ui/Text";
import {useToast} from "@/hooks/useToast";
import {useBankReceiveQuery} from "@/queries/bank/receive";
import {copyContent, formatMoney} from "@/utils/helper";
import {cn} from "@/utils/ui";
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded';
import {useEffect, useState} from "react";

export const BankList = () => {
  const [isOpenBankQrModal, setOpenBankQrModal] = useState<boolean>(false);
  const [bankInfoOpen, setBankInfoOpen] = useState<TBank|undefined>(undefined);
  const [bankReceives, setBankReceives] = useState<TBank[]>([]);
  const toast = useToast();
  const bankReceiveQuery = useBankReceiveQuery();

  useEffect(() => {
    if (bankReceiveQuery) {
      const banks = bankReceiveQuery.data.banks.filter((bank) => !!bank.bank_qr);
      setBankReceives(banks);
    }
  }, [bankReceiveQuery]);

  const triggerCopyContent = (content: string) => {
    copyContent(content, () => {
      toast.success('Copy số tài khoản thành công!', { autoClose: 2000 });
    });
  }

  const triggerOpenBankQrModal = (bank: TBank) => {
    setBankInfoOpen(bank);
    setOpenBankQrModal(true);
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
            {bankReceives.map((bank, index) => (
              <tr key={`tr-bank-list-${index}`} className={cn(index > 0 ? "border-t border-t-[#ffffff0d]" : '')}>
                <td className="py-3 w-[130px]">
                  <Text size="sm">Mã NH: {bank.code}</Text>
                  <Text size="sm">{bank.title}</Text>
                </td>
                <td className="py-3 w-[100px] sm:w-[150px]">
                  <Flex className="cursor-pointer select-none" onClick={() => triggerCopyContent(bank.number)}>
                    <Text size="sm" custom={true} className="mr-1">{bank.number}</Text>
                    <ContentCopyRoundedIcon className="!text-[18px] text-[#ff55a5]" />
                  </Flex>
                  <Text size="sm">{bank.name}</Text>
                </td>
                <td className="py-3">
                  <Text size="sm">Min: <span className="text-[#ff55a5]">{formatMoney(bank.min)}</span></Text>
                  <Text size="sm">Max: <span className="text-[#ff55a5]">{formatMoney(bank.max)}</span></Text>
                </td>
                <td className="min-w-[50px] text-center">
                  <Flex justify="center">
                    <Box className="p-1 bg-[#ff55a51a] rounded cursor-pointer" onClick={() => triggerOpenBankQrModal(bank)}>
                      <QrCode2RoundedIcon className="text-[#5bceae]" />
                    </Box>
                  </Flex>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
      <BankQRModal
        isOpen={isOpenBankQrModal}
        onClose={() => setOpenBankQrModal(false)}
        bank_qr={bankInfoOpen?.bank_qr ?? ''}
      />
    </Box>
  );
}
