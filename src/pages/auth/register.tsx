import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  TApiErrorResponse,
  TApiSuccessResponse,
  TParamError,
} from "@/@types/axios";
import { TSystemSetting } from "@/@types/system-setting";
import { TUserCreate } from "@/@types/user";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { serverSideGetSystemSetting } from "@/hooks/serverSideGetSystemSetting";
import { useToast } from "@/hooks/useToast";
import { useAuthRegisterMutation } from "@/queries/auth/register";
import { buildErrorParam } from "@/utils/helper";

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
    <AuthLayout title="Đăng ký" systemSettings={systemSettings}>
      <div className="d-flex flex-column flex-root" id="kt_app_root">
        <div className="d-flex flex-column flex-column-fluid flex-lg-row justify-content-center">
          <div className="d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-5 p-lg-20">
            <div className="bg-body d-flex flex-column align-items-stretch flex-center rounded-4 w-md-600px p-lg-20 p-10 w-100">
              <div className="d-flex flex-center flex-column flex-column-fluid px-lg-10">
                <form className="form w-100" onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-7 text-center">
                    <Img alt="Logo" src={systemSettings.logo} />
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

                  <div className="fv-row mb-3">
                    <input
                      type="password"
                      placeholder="Nhập lại mật khẩu"
                      className="form-control bg-transparent"
                      {...register("password_confirm", { required: true })}
                    />
                    {errors.password_confirm && (
                      <p className="text-danger italic mb-0">
                        Hãy nhập lại Mật khẩu
                      </p>
                    )}
                  </div>
                  <div className="d-grid mb-10">
                    <Button type="submit" loading={isRequesting}>
                      <span className="indicator-label">Đăng ký</span>
                    </Button>
                  </div>

                  <div className="text-gray-500 text-center fw-semibold fs-6">
                    Bạn đã có tài khoản?&nbsp;
                    <Link href="/auth/login" className="link-primary">
                      Đăng nhập
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
