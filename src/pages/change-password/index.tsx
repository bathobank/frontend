import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";

import { TPageProp } from "@/@types/page-prop";
import { TChangePwForm } from "@/@types/password";
import { GlobalLayout } from "@/components/layouts/GlobalLayout";
import { Card } from "@/components/ui/Card";
import { DangerButton } from "@/components/ui/DangerButton";
import { Input } from "@/components/ui/Input";
import { serverSideGetSystemSetting } from "@/hooks/serverSideGetSystemSetting";
import { useSystemSetting } from "@/hooks/useSystemSetting";
import { useUser } from "@/hooks/useUser";
import { useChangePasswordMutation } from "@/queries/auth/change-password";
import { AUTH_GET_USER_QK } from "@/queries/auth/user";
import { defaultOptionReactQueryResponse } from "@/utils/helper";

export default function ChangePassword({ systemSettings, user }: TPageProp) {
  useSystemSetting(systemSettings);
  useUser(user);

  const changePasswordMutation = useChangePasswordMutation();
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const { handleSubmit, register, reset } = useForm<TChangePwForm>();

  const onSubmit = (data: TChangePwForm) => {
    changePasswordMutation.mutate(
      data,
      defaultOptionReactQueryResponse(() => {
        reset();
        queryClient.invalidateQueries([AUTH_GET_USER_QK]);
        void push("/auth/login");
      }),
    );
  };

  return (
    <GlobalLayout>
      <Box className="w-full max-w-[550px] m-auto">
        <Card title="ĐỔI MẬT KHẨU">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <Input
              type="password"
              label="Mật khẩu hiện tại"
              id="current_password"
              {...register("current_password")}
            />
            <Input
              type="password"
              label="Mật khẩu mới"
              id="new_password"
              {...register("new_password")}
            />
            <Input
              type="password"
              label="Nhập lại mật khẩu mới"
              id="new_password_confirm"
              {...register("new_password_confirm")}
            />
            <Box textAlign="center">
              <DangerButton type="submit">Đổi mật khẩu</DangerButton>
            </Box>
          </form>
        </Card>
      </Box>
    </GlobalLayout>
  );
}

export const getServerSideProps = serverSideGetSystemSetting;
