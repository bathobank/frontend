import { Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  TApiErrorResponse,
  TApiSuccessResponse,
  TParamError,
} from "@/@types/axios";
import { TPageProp } from "@/@types/page-prop";
import { TUserCreate } from "@/@types/user";
import { GlobalLayout } from "@/components/layouts/GlobalLayout";
import { DefaultButton } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";
import { serverSideGetSystemSetting } from "@/hooks/serverSideGetSystemSetting";
import { useSystemSetting } from "@/hooks/useSystemSetting";
import { useToast } from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import { useAuthRegisterMutation } from "@/queries/auth/register";
import { buildErrorParam } from "@/utils/helper";

export default function AuthRegister({ systemSettings, user }: TPageProp) {
  useSystemSetting(systemSettings);
  useUser(user);

  const [isRequesting, setRequesting] = useState<boolean>(false);
  const authRegisterMutate = useAuthRegisterMutation();
  const toast = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUserCreate>();

  const onSubmit = (data: TUserCreate) => {
    setRequesting(true);
    authRegisterMutate.mutate(data, {
      onSuccess(result) {
        const { message } = result as unknown as TApiSuccessResponse<[]>;
        toast.success(message, { time: 2000 });
        reset();
        router.push("/auth/login");
      },
      onError(error) {
        const errorData = error as TApiErrorResponse<TParamError>;
        if (errorData.responseStatus === 422) {
          const errMgs: string = buildErrorParam(
            (error as TApiErrorResponse<TParamError>).data,
          );
          toast.error(errMgs);
        } else {
          toast.error(errorData.message);
        }
      },
      onSettled() {
        setRequesting(false);
      },
    });
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
          textAlign="center"
        >
          ĐĂNG KÝ TÀI KHOẢN
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
                  Mật khẩu không được trống
                </Text>
              )}
            </Box>
            <Box className="mb-2">
              <Input
                id="password_confirm"
                placeholder="Nhập lại mật khẩu"
                type="password"
                {...register("password_confirm", { required: true })}
              />
              {errors.password_confirm && (
                <Text size="sm" col="red" className="italic !mt-1">
                  Hãy nhập lại mật khẩu
                </Text>
              )}
            </Box>
            <Box className="mb-2 text-center">
              <DefaultButton type="submit" disabled={isRequesting}>
                Đăng ký
              </DefaultButton>
            </Box>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
              Bạn đã có tài khoản? <Link href="/auth/login">Đăng nhập</Link>
            </p>
          </form>
        </Box>
      </Box>
    </GlobalLayout>
  );
}

export const getServerSideProps = serverSideGetSystemSetting;
