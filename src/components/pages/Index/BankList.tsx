import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import QrCode2RoundedIcon from "@mui/icons-material/QrCode2Rounded";
import { Box, Stack } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

import { TBank } from "@/@types/bank";
import { BankQRModal } from "@/components/modals/BankQR";
import { DangerAlert } from "@/components/ui/Alert";
import { Img } from "@/components/ui/Img";
import { Table } from "@/components/ui/Table";
import { useToast } from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import { useBankReceiveQuery } from "@/queries/bank/receive";
import { copyContent, formatMoney } from "@/utils/helper";
import { cn } from "@/utils/ui";

export const BankList = () => {
  const [isOpenBankQrModal, setOpenBankQrModal] = useState<boolean>(false);
  const [bankInfoOpen, setBankInfoOpen] = useState<TBank | undefined>(
    undefined,
  );
  const [bankReceives, setBankReceives] = useState<TBank[]>([]);
  const toast = useToast();
  const bankReceiveQuery = useBankReceiveQuery();
  const { isLogined } = useUser();

  useEffect(() => {
    if (bankReceiveQuery) {
      const banks = bankReceiveQuery.data.banks.filter(
        (bank) => !!bank.bank_qr,
      );
      setBankReceives(banks);
    }
  }, [bankReceiveQuery]);

  const triggerCopyContent = (content: string) => {
    copyContent(content, () => {
      toast.success("Copy số tài khoản thành công!", { autoClose: 2000 });
    });
  };

  const triggerOpenBankQrModal = (bank: TBank) => {
    setBankInfoOpen(bank);
    setOpenBankQrModal(true);
  };

  const headerTable: Array<string> = [
    "QR",
    "Ngân hàng",
    "STK",
    "Tên CTK",
    "Tối thiểu",
    "Tối đa",
  ];

  return (
    <>
      <Table headers={headerTable}>
        {isLogined ? (
          <>
            {bankReceives.map((bank, index) => (
              <tr
                key={`tr-bank-list-${index}`}
                className={cn(index > 0 ? "border-t border-t-[#ffffff0d]" : "")}
              >
                <td className="py-[8px] px-[4px] border border-[#ddd] text-center min-w-[60px]">
                  <Stack direction="row" justifyContent="center">
                    <Box
                      className="p-1 bg-[#ff55a51a] rounded cursor-pointer"
                      onClick={() => triggerOpenBankQrModal(bank)}
                    >
                      <QrCode2RoundedIcon className="text-[#5bceae]" />
                    </Box>
                  </Stack>
                </td>
                <td className="py-[8px] px-[4px] border border-[#ddd] text-center min-w-[120px]">
                  <Box>
                    <Img src={bank.bank.logo} className="!h-[45px] m-auto" />
                  </Box>
                </td>
                <td className="py-[8px] px-[4px] border border-[#ddd] text-center min-w-[140px]">
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    className="cursor-pointer select-none"
                    onClick={() => triggerCopyContent(bank.number)}
                  >
                    {bank.number}
                    <ContentCopyRoundedIcon className="!text-[18px] text-[#ff55a5]" />
                  </Stack>
                </td>
                <td className="py-[8px] px-[4px] border border-[#ddd] text-center min-w-[160px]">
                  {bank.name}
                </td>
                <td className="py-[8px] px-[4px] border border-[#ddd] text-center min-w-[100px]">
                  {formatMoney(bank.min)}
                </td>
                <td className="py-[8px] px-[4px] border border-[#ddd] text-center min-w-[120px]">
                  {formatMoney(bank.max)}
                </td>
              </tr>
            ))}
          </>
        ) : (
          <tr>
            <td colSpan={6}>
              <DangerAlert className="text-center !rounded-t-[0px]">
                ĐỂ LẤY THÔNG TIN BANK CHUYỂN KHOẢN, VUI LÒNG{" "}
                <Link href="/auth/login">ĐĂNG NHẬP</Link> HOẶC{" "}
                <Link href="/auth/register">ĐĂNG KÝ</Link> NHANH
              </DangerAlert>
            </td>
          </tr>
        )}
      </Table>
      <BankQRModal
        isOpen={isOpenBankQrModal}
        onClose={() => setOpenBankQrModal(false)}
        bank_qr={bankInfoOpen?.bank_qr ?? ""}
      />
    </>
  );
};
