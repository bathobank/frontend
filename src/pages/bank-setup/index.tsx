import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactSelect from "react-select";

import { TBankUserForm } from "@/@types/bank-user";
import { TPageProp } from "@/@types/page-prop";
import { GlobalLayout } from "@/components/layouts/GlobalLayout";
import { InfoAlert } from "@/components/ui/Alert";
import { DefaultButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";
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

export default function BankSetup({ systemSettings, user }: TPageProp) {
  useSystemSetting(systemSettings);
  useUser(user);

  const [banks, setBanks] = useState<TOption[]>([]);
  const [bankSelected, setBankSelected] = useState<TOption | null>(null);
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
    setValue("bank", bankSelected?.value ?? "");
  }, [bankSelected, setValue]);

  useEffect(() => {
    if (!userBankReceive) return;
    const bankUser = userBankReceive.data.bank_user;
    if (bankUser) {
      setValue("bank_number", bankUser.bank_number);
      setValue("bank_owner", bankUser.bank_owner);
    }
  }, [setValue, userBankReceive]);

  useEffect(() => {
    if (!userBankReceive || banks.length === 0) return;
    const bankUser = userBankReceive.data.bank_user;
    if (!bankUser) return;
    const binSelected = bankUser.bank_bin;
    const bank = banks.find((b) => b.value === binSelected) ?? null;
    setBankSelected(bank);
  }, [banks, userBankReceive]);

  useEffect(
    () => {
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query.required],
  );

  const onSubmit = (data: TBankUserForm) => {
    userBankReceiveMutation.mutate(
      data,
      defaultOptionReactQueryResponse(() => {
        reset();
        setBankSelected(null);
        void push("/");
      }),
    );
  };

  return (
    <GlobalLayout>
      <Box className="w-full max-w-[450px] m-auto">
        <Card title="CẬP NHẬT NGÂN HÀNG">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Box>
              <Box className="mb-2">
                <label
                  className="block text-sm font-medium"
                  htmlFor="bank_receive"
                >
                  Ngân hàng nhận tiền
                </label>
                <Text size="xs" className="italic text-green-400">
                  Tip: Gõ tên ngân hàng vào ô để tìm kiếm
                </Text>
              </Box>
              <ReactSelect
                className="text-sm"
                classNamePrefix="select"
                isDisabled={false}
                isClearable={false}
                isSearchable={true}
                id="bank_receive"
                noOptionsMessage={() => "Không có ngân hàng phù hợp"}
                options={banks}
                value={bankSelected}
                inputId="bank_receive"
                instanceId="instance_bank_receive"
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                onChange={setBankSelected}
                styles={{
                  option: (provided) => ({
                    ...provided,
                    color: "#28282d",
                  }),
                }}
              />
            </Box>
            <Input
              label="Số tài khoản"
              id="bank_number"
              {...register("bank_number")}
            />
            <Input
              label="Tên chủ tài khoản"
              id="bank_owner"
              {...register("bank_owner")}
            />
            <Box textAlign="center">
              <DefaultButton type="submit">Cập nhật</DefaultButton>
            </Box>
          </form>
          <Box className="py-5">
            <InfoAlert>
              <Box mb={1}>
                <span className="text-[#ff55a5] font-bold">LƯU Ý 1:</span> Chúng
                tôi <span className="text-[#ff55a5]">từ chối trách nhiệm</span>{" "}
                nếu số tài khoản bạn đã nhập{" "}
                <span className="text-[#ff55a5]">không chính xác</span>. Vì vậy
                hãy kiểm tra kỹ số tài khoản trước khi cập nhật!
              </Box>
              <Box>
                <span className="text-[#ff55a5] font-bold">LƯU Ý 2:</span> Tài
                khoản bank của bạn sẽ tự động chuyển sang chế độ{" "}
                <span className="text-[#ff55a5]">bảo vệ</span> sau lần trả
                thưởng thành công{" "}
                <span className="text-[#ff55a5]">đầu tiên</span>!
              </Box>
            </InfoAlert>
          </Box>
        </Card>
      </Box>
    </GlobalLayout>
  );
}

export const getServerSideProps = serverSideGetSystemSetting;
