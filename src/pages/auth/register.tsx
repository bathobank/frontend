import {
  TApiErrorResponse,
  TApiSuccessResponse,
  TParamError,
} from "@/@types/axios";
import { TUserCreate } from "@/@types/user";
import { GlobalLayout } from "@/components/layouts/GlobalLayout";
import { Button } from "@/components/ui/Button";
import { Box } from "@/components/ui/Box";
import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";
import { LinkUI } from "@/components/ui/Link";
import { useToast } from "@/hooks/useToast";
import { useAuthRegisterMutation } from "@/queries/auth/register";
import { buildErrorParam } from "@/utils/helper";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { serverSideGetSystemSetting } from "@/hooks/serverSideGetSystemSetting";
import { TSystemSetting } from "@/@types/system-setting";

export default function AuthRegister({
  systemSettings,
}: {
  systemSettings: TSystemSetting;
}) {
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
    <GlobalLayout
      showHeader={false}
      title="Đăng ký"
      systemSettings={systemSettings}
    >
      <Box className="w-full lg:w-1/2 mx-auto mt-10 rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal">
        <Box className="w-full rounded-lg shadow">
          <Box className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Text align="center" className="text-xl">
              Đăng ký tài khoản
            </Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box className="mb-3">
                <Input
                  id="nickname"
                  label="Nickname"
                  {...register("nickname", { required: true })}
                />
                {errors.nickname && (
                  <Text size="sm" col="red" className="italic !mt-1">
                    Hãy nhập Nickname
                  </Text>
                )}
              </Box>
              <Box className="mb-3">
                <Input
                  id="password"
                  label="Mật khẩu"
                  type="password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <Text size="sm" col="red" className="italic !mt-1">
                    Mật khẩu không được trống
                  </Text>
                )}
              </Box>
              <Box className="mb-5">
                <Input
                  id="password_confirm"
                  label="Nhập lại mật khẩu"
                  type="password"
                  {...register("password_confirm", { required: true })}
                />
                {errors.password_confirm && (
                  <Text size="sm" col="red" className="italic !mt-1">
                    Hãy nhập lại mật khẩu
                  </Text>
                )}
              </Box>
              <Button
                type="submit"
                fullWidth={true}
                variant="theme"
                disabled={isRequesting}
                className="mb-3"
              >
                Đăng ký
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                Bạn đã có tài khoản?{" "}
                <LinkUI href="/auth/login">Đăng nhập</LinkUI>
              </p>
            </form>
          </Box>
        </Box>
      </Box>
    </GlobalLayout>
  );
}

export const getServerSideProps = serverSideGetSystemSetting;
