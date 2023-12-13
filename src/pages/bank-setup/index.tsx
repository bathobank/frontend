import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { TBankUserForm } from "@/@types/bank-user";
import { TSystemSetting } from "@/@types/system-setting";
import { TUser } from "@/@types/user";
import { GlobalLayout } from "@/components/layouts/GlobalLayout";
import { Button } from "@/components/ui/Button";
import { serverSideGetSystemSetting } from "@/hooks/serverSideGetSystemSetting";
import { useSystemSetting } from "@/hooks/useSystemSetting";
import { useToast } from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import { useBankAllQuery } from "@/queries/bank/all";
import {
  useUserBankReceive,
  useUserBankReceiveMutation,
} from "@/queries/bank/user";
import { defaultOptionReactQueryResponse } from "@/utils/helper";

type TOption = {
  value: string;
  label: string;
};

export default function BankSetup({
  systemSettings,
  user: userDefault,
}: {
  systemSettings: TSystemSetting;
  user?: TUser;
}) {
  useSystemSetting(systemSettings);
  useUser(userDefault);

  const [banks, setBanks] = useState<TOption[]>([]);
  const bankSelectRef = useRef<HTMLSelectElement>(null);
  const { push, query } = useRouter();
  const bankQuery = useBankAllQuery();
  const userBankReceive = useUserBankReceive();
  const userBankReceiveMutation = useUserBankReceiveMutation();
  const { error: toastInfo } = useToast();

  const { handleSubmit, register, setValue, reset } = useForm<TBankUserForm>();

  useEffect(() => {
    if (!bankQuery) return;
    const bankData: TOption[] = [];
    for (const bank of bankQuery.data.banks) {
      bankData.push({
        label: `${bank.code}: ${bank.short_name}`,
        value: bank.bin,
      });
    }
    setBanks(bankData);
  }, [bankQuery]);

  useEffect(() => {
    if (!userBankReceive) return;

    const bankUser = userBankReceive.data.bank_user;
    if (!bankUser) return;

    setValue("bank_number", bankUser.bank_number);
    setValue("bank_owner", bankUser.bank_owner);
    setValue("bank", bankUser.bank_bin);

    if (bankSelectRef.current) {
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $(bankSelectRef.current).val(bankUser.bank_bin).trigger("change");
      }, 500);
    }
  }, [setValue, userBankReceive]);

  useEffect(() => {
    if (
      typeof query.required === "undefined" ||
      !query.required ||
      query.required !== "true"
    ) {
      return;
    }
    const timeout = setTimeout(() => {
      toastInfo("Bạn cần cài đặt tài khoản nhận tiền trước khi chơi game!");
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [query, toastInfo]);

  const onSubmit = useCallback(
    (data: TBankUserForm) => {
      if (!bankSelectRef.current) return;
      data.bank = bankSelectRef.current.value;
      userBankReceiveMutation.mutate(
        data,
        defaultOptionReactQueryResponse(() => {
          reset();
          void push("/");
        }),
      );
    },
    [userBankReceiveMutation, reset, push],
  );

  return (
    <GlobalLayout title="Cài đặt Bank">
      <div className="app-container container-lg">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header justify-content-center">
                <h4 className="card-title">
                  <i className="bi bi-coin fs-2x !hl-text"></i>
                  <span className="ms-2">CÀI ĐẶT BANK TRẢ THƯỞNG</span>
                </h4>
              </div>
              <div className="card-body p-0">
                <div className="p-5">
                  <div className="w-100 mw-450px m-auto mb-5">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group mb-5">
                        <label
                          className="d-block fs-lg fw-semibold mb-2"
                          htmlFor="bank_receive"
                        >
                          Ngân hàng nhận tiền
                        </label>
                        <select
                          className="form-select"
                          data-control="select2"
                          data-placeholder="Select an option"
                          ref={bankSelectRef}
                        >
                          <option></option>
                          {banks.map((bank, index: number) => {
                            return (
                              <option
                                value={bank.value}
                                key={`bank-select-${index}`}
                              >
                                {bank.label}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="form-group mb-5">
                        <label
                          className="d-block fs-lg fw-semibold mb-2"
                          htmlFor="bank_number"
                        >
                          Số tài khoản
                        </label>
                        <input
                          type="text"
                          id="bank_number"
                          className="form-control"
                          {...register("bank_number")}
                        />
                      </div>
                      <div className="form-group mb-5">
                        <label
                          className="d-block fs-lg fw-semibold mb-2"
                          htmlFor="bank_owner"
                        >
                          Tên chủ tài khoản
                        </label>
                        <input
                          type="text"
                          id="bank_owner"
                          className="form-control"
                          {...register("bank_owner")}
                        />
                      </div>
                      <div className="text-center">
                        <Button variant="light" type="submit">
                          Cập nhật
                        </Button>
                      </div>
                    </form>
                  </div>
                  <div className="fs-lg">
                    <p className="mb-2 w-100 mw-600px text-center m-auto">
                      <span className="hl-text">LƯU Ý:</span> Chúng tôi{" "}
                      <span className="hl-text">từ chối trách nhiệm</span> nếu
                      số tài khoản bạn đã nhập{" "}
                      <span className="hl-text">không chính xác</span>. Vì vậy
                      hãy kiểm tra kỹ số tài khoản trước khi cập nhật!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}

export const getServerSideProps = serverSideGetSystemSetting;
