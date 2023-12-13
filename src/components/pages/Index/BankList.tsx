import Link from "next/link";
import { useEffect, useState } from "react";

import { TBank } from "@/@types/bank";
import { BankQRModal } from "@/components/modals/BankQR";
import { HightLightNickname } from "@/components/pages/Index/Game/HightLightNickname";
import { useUser } from "@/hooks/useUser";
import { useBankReceiveQuery } from "@/queries/bank/receive";
import { formatMoney } from "@/utils/helper";

export const BankList = () => {
  const [isOpenBankQrModal, setOpenBankQrModal] = useState<boolean>(false);
  const [bankInfoOpen, setBankInfoOpen] = useState<TBank | undefined>(
    undefined,
  );
  const [bankReceives, setBankReceives] = useState<TBank[]>([]);
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

  const triggerOpenBankQrModal = (bank: TBank) => {
    setBankInfoOpen(bank);
    setOpenBankQrModal(true);
  };

  return (
    <div className="p-3 h-100">
      <div
        className="rounded-3 h-100"
        style={{ border: "1px solid #ffffff0d" }}
      >
        <div className="d-flex align-items-center p-3 game-header">
          <i className="!hl-text fs-2x bi bi-bank"></i>
          <h5 className="mb-0 ms-2 text-white">THÔNG TIN BANK NHẬN</h5>
        </div>
        <div className="p-3">
          {isLogined ? (
            <table className="w-100">
              <thead>
                <tr style={{ borderBottom: "1px solid #ffffff0d" }}>
                  <th scope="col" className="text-left py-3 d-none d-sm-block">
                    <span className="fs-xl" style={{ color: "#B5B7C8" }}>
                      Ngân hàng
                    </span>
                  </th>
                  <th scope="col" className="text-left py-3">
                    <span className="fs-xl" style={{ color: "#B5B7C8" }}>
                      Tài khoản
                    </span>
                  </th>
                  <th scope="col" className="text-left py-3">
                    <span className="fs-xl" style={{ color: "#B5B7C8" }}>
                      Cược
                    </span>
                  </th>
                  <th scope="col" className="text-center py-3">
                    <span className="fs-xl" style={{ color: "#B5B7C8" }}>
                      QR
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {bankReceives.map((bank, index) => (
                  <tr
                    key={`tr-bank-list-${index}`}
                    style={{
                      ...(index > 0 && {
                        borderTop: "1px solid #ffffff0d",
                      }),
                    }}
                  >
                    <td
                      style={{ minWidth: "130px" }}
                      className="py-3 d-none d-sm-block"
                    >
                      <p className="mb-0">Mã NH: {bank.code}</p>
                      <p className="mb-0">{bank.title}</p>
                    </td>
                    <td
                      style={{ minWidth: "150px", width: "200px" }}
                      className="py-3"
                    >
                      <div className="mb-3 d-sm-none">
                        <p className="mb-0">Mã NH: {bank.code}</p>
                        <p className="mb-0">{bank.title}</p>
                      </div>
                      <HightLightNickname content={bank.number} />
                      <p className="mb-0">{bank.name}</p>
                    </td>
                    <td style={{ minWidth: "100px" }} className="py-3">
                      <p className="mb-0">
                        Min:{" "}
                        <span className="hl-text">{formatMoney(bank.min)}</span>
                      </p>
                      <p className="mb-0">
                        Max:{" "}
                        <span className="hl-text">{formatMoney(bank.max)}</span>
                      </p>
                    </td>
                    <td style={{ minWidth: "50px" }} className="text-center">
                      <div className="d-flex justify-content-center">
                        <div
                          style={{ backgroundColor: "#ff55a51a" }}
                          className="p-2 rounded cursor-pointer"
                          onClick={() => triggerOpenBankQrModal(bank)}
                        >
                          <i className="!hl-text-warning bi bi-qr-code-scan fs-2x"></i>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h6 className="px-6 py-5 text-center lh-xl">
              ĐỂ LẤY THÔNG TIN BANK CHUYỂN KHOẢN <br />
              VUI LÒNG{" "}
              <Link href="/auth/login" className="hl-text">
                ĐĂNG NHẬP
              </Link>{" "}
              HOẶC{" "}
              <Link href="/auth/register" className="hl-text">
                ĐĂNG KÝ
              </Link>{" "}
              NHANH
            </h6>
          )}
        </div>
      </div>
      <BankQRModal
        isOpen={isOpenBankQrModal}
        onClose={() => setOpenBankQrModal(false)}
        bank_qr={bankInfoOpen?.bank_qr ?? ""}
      />
    </div>
  );
};
