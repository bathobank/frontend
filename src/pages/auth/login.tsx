import { Box } from "@mui/material";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";

import { TPageProp } from "@/@types/page-prop";
import { TUserLogin } from "@/@types/user";
import { GlobalLayout } from "@/components/layouts/GlobalLayout";
import { DefaultButton } from "@/components/ui/DefaultButton";
import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";
import { serverSideGetSystemSetting } from "@/hooks/serverSideGetSystemSetting";
import { useSystemSetting } from "@/hooks/useSystemSetting";
import { useUser } from "@/hooks/useUser";
import { useAuthLoginMutation } from "@/queries/auth/login";
import { AUTH_GET_USER_QK } from "@/queries/auth/user";
import { defaultOptionReactQueryResponse } from "@/utils/helper";

export default function AuthLogin({ systemSettings, user }: TPageProp) {
  useSystemSetting(systemSettings);
  useUser(user);

  const [isRequesting, setRequesting] = useState<boolean>(false);
  const authLoginMutation = useAuthLoginMutation();
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUserLogin>();

  const onSubmit = (data: TUserLogin) => {
    const mutateOption = defaultOptionReactQueryResponse<{ token: string }>(
      (result) => {
        reset();
        window.localStorage.setItem("customer-token", result.token);
        setCookie("customer-token", result.token);
        queryClient.invalidateQueries({
          queryKey: [AUTH_GET_USER_QK],
        });
        void push("/");
      },
      () => {
        setRequesting(false);
      },
    );

    setRequesting(true);
    authLoginMutation.mutate(data, mutateOption);
  };

  return (
    <GlobalLayout isAuth={true}>
      <Box
        borderColor="#2c2c83"
        borderRadius="4px"
        overflow="hidden"
        className="w-full lg:w-1/2 mx-auto border border-[#2c2c83]"
      >
        <Box
          bgcolor="#2c2c83"
          borderColor="#2c2c83"
          color="#ffffff"
          p="8px 12px"
          fontSize="14px"
          textTransform="uppercase"
        >
          Đăng nhập
        </Box>
        <Box
          p="10px 15px 20px 15px"
          border="1px solid #2c2c83"
          sx={{
            borderBottomLeftRadius: "4px",
            borderBottomRightRadius: "4px",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box className="mb-2">
              <Input
                id="nickname"
                placeholder="Tài khoản"
                {...register("nickname", { required: true })}
              />
              {errors.nickname && (
                <Text size="sm" col="red" className="italic !mt-1">
                  Hãy nhập Tài khoản
                </Text>
              )}
            </Box>
            <Box className="mb-2">
              <Input
                id="password"
                placeholder="Mật khẩu"
                type="password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <Text size="sm" col="red" className="italic !mt-1">
                  Hãy nhập mật khẩu
                </Text>
              )}
            </Box>
            <Box className="mb-2 text-center">
              <DefaultButton type="submit" disabled={isRequesting}>
                Đăng nhập
              </DefaultButton>
            </Box>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
              Bạn chưa có tài khoản? <Link href="/auth/register">Đăng ký</Link>
            </p>
          </form>
        </Box>
      </Box>
    </GlobalLayout>
  );
}

export const getServerSideProps = serverSideGetSystemSetting;
