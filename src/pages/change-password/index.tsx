import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";

import { TChangePwForm } from "@/@types/password";
import { TSystemSetting } from "@/@types/system-setting";
import { GlobalLayout } from "@/components/layouts/GlobalLayout";
import { Button } from "@/components/ui/Button";
import { serverSideGetSystemSetting } from "@/hooks/serverSideGetSystemSetting";
import { useSystemSetting } from "@/hooks/useSystemSetting";
import { useChangePasswordMutation } from "@/queries/auth/change-password";
import { AUTH_GET_USER_QK } from "@/queries/auth/user";
import { defaultOptionReactQueryResponse } from "@/utils/helper";

export default function ChangePassword({
  systemSettings,
}: {
  systemSettings: TSystemSetting;
}) {
  useSystemSetting(systemSettings);

  const changePasswordMutation = useChangePasswordMutation();
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  const { handleSubmit, register, reset } = useForm<TChangePwForm>();

  const onSubmit = (data: TChangePwForm) => {
    setIsRequesting(true);
    changePasswordMutation.mutate(
      data,
      defaultOptionReactQueryResponse(
        () => {
          reset();
          queryClient.invalidateQueries([AUTH_GET_USER_QK]);
          void push("/auth/login");
        },
        () => {
          setIsRequesting(false);
        },
      ),
    );
  };

  return (
    <GlobalLayout title="Đổi mật khẩu">
      <div className="app-container container-lg">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header justify-content-center">
                <h4 className="card-title">
                  <i className="bi bi-shield-lock fs-2x !hl-text"></i>
                  <span className="ms-2">ĐỔI MẬT KHẨU</span>
                </h4>
              </div>
              <div className="card-body p-5">
                <div className="m-auto w-100 mw-550px">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group mb-5">
                      <label
                        className="d-block fs-lg fw-semibold mb-2"
                        htmlFor="current_password"
                      >
                        Mật khẩu hiện tại
                      </label>
                      <input
                        type="password"
                        id="current_password"
                        className="form-control"
                        {...register("current_password")}
                      />
                    </div>
                    <div className="form-group mb-5">
                      <label
                        className="d-block fs-lg fw-semibold mb-2"
                        htmlFor="new_password"
                      >
                        Mật khẩu mới
                      </label>
                      <input
                        type="password"
                        id="new_password"
                        className="form-control"
                        {...register("new_password")}
                      />
                    </div>
                    <div className="form-group mb-5">
                      <label
                        className="d-block fs-lg fw-semibold mb-2"
                        htmlFor="new_password_confirm"
                      >
                        Nhập lại mật khẩu mới
                      </label>
                      <input
                        type="password"
                        id="new_password_confirm"
                        className="form-control"
                        {...register("new_password_confirm")}
                      />
                    </div>
                    <div className="text-center">
                      <Button
                        variant="light"
                        type="submit"
                        loading={isRequesting}
                      >
                        Đổi mật khẩu
                      </Button>
                    </div>
                  </form>
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
