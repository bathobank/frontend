import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";

import { TSystemSetting } from "@/@types/system-setting";
import { TUserLogin } from "@/@types/user";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { serverSideGetSystemSetting } from "@/hooks/serverSideGetSystemSetting";
import { useAuthLoginMutation } from "@/queries/auth/login";
import { AUTH_GET_USER_QK } from "@/queries/auth/user";
import { defaultOptionReactQueryResponse } from "@/utils/helper";

export default function AuthLogin({
  systemSettings,
}: {
  systemSettings: TSystemSetting;
}) {
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
    <AuthLayout title="Đăng nhập" systemSettings={systemSettings}>
      <div className="d-flex flex-column flex-root" id="kt_app_root">
        <div className="d-flex flex-column flex-column-fluid flex-lg-row justify-content-center">
          <div className="d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-5 p-lg-20">
            <div className="bg-body d-flex flex-column align-items-stretch flex-center rounded-4 w-md-600px p-lg-20 p-10 w-100">
              <div className="d-flex flex-center flex-column flex-column-fluid px-lg-10">
                <form className="form w-100" onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-7 text-center">
                    <Link href="/">
                      <Img alt="Logo" size="100%" src={systemSettings.logo} />
                    </Link>
                  </div>
                  <div className="fv-row mb-3">
                    <input
                      type="text"
                      placeholder="Tên tài khoản"
                      className="form-control bg-transparent"
                      {...register("nickname", { required: true })}
                    />
                    {errors.nickname && (
                      <p className="text-danger italic mb-0">
                        Hãy nhập Nickname
                      </p>
                    )}
                  </div>

                  <div className="fv-row mb-3">
                    <input
                      type="password"
                      placeholder="Mật khẩu"
                      className="form-control bg-transparent"
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <p className="text-danger italic mb-0">
                        Hãy nhập Mật khẩu
                      </p>
                    )}
                  </div>

                  <div className="fs-base fw-semibold mb-3 text-right">
                    <Link href="#" className="link-primary">
                      Quên mật khẩu?
                    </Link>
                  </div>

                  <div className="d-grid mb-10">
                    <Button type="submit" loading={isRequesting}>
                      <span className="indicator-label">Đăng nhập</span>
                    </Button>
                  </div>

                  <div className="text-gray-500 text-center fw-semibold fs-6">
                    Chưa có tài khoản?&nbsp;
                    <Link href="/auth/register" className="link-primary">
                      Đăng ký
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export const getServerSideProps = serverSideGetSystemSetting;
