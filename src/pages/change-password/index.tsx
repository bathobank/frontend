import {GlobalLayout} from "@/components/layouts/GlobalLayout";
import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {Text} from "@/components/ui/Text";
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import {useForm} from "react-hook-form";
import {TChangePwForm} from "@/@types/password";
import {Input} from "@/components/ui/Input";
import {Button} from "@/components/ui/Button";
import {useChangePasswordMutation} from "@/queries/auth/change-password";
import {defaultOptionReactQueryResponse} from "@/utils/helper";
import {useRouter} from "next/router";
import {useQueryClient} from "react-query";
import {AUTH_GET_USER_QK} from "@/queries/auth/user";
import {useEffect} from "react";
import {useLoading} from "@/hooks/useLoading";

export default function ChangePassword(){
  const changePasswordMutation = useChangePasswordMutation();
  const {push} = useRouter();
  const loading = useLoading();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    reset
  } = useForm<TChangePwForm>();

  useEffect(() => {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    let timeoutClearLoading: any = null;
    timeoutClearLoading = setTimeout(loading.hide, 500);

    return () => {
      clearTimeout(timeoutClearLoading);
    }
  },
  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  []
  );

  const onSubmit = (data: TChangePwForm) => {
    changePasswordMutation.mutate(data, defaultOptionReactQueryResponse(() => {
      reset();
      queryClient.invalidateQueries([AUTH_GET_USER_QK]);
      void push('/auth/login');
    }))
  }

  return (
    <GlobalLayout showHeader={false} title="Đổi mật khẩu">
      <Box className='rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal mt-5 px-3'>
        <Flex justify="center" className="border-b border-[#ffffff0d] py-3">
          <ManageAccountsRoundedIcon className="text-[#ff55a5] mr-3" />
          <Text custom={true}>ĐỔI MẬT KHẨU</Text>
        </Flex>
        <Box className="py-3">
          <Box className="w-full max-w-[550px] m-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <Input type="password" label="Mật khẩu hiện tại" id="current_password" {...register('current_password')} />
              <Input type="password" label="Mật khẩu mới" id="new_password" {...register('new_password')} />
              <Input type="password" label="Nhập lại mật khẩu mới" id="new_password_confirm" {...register('new_password_confirm')} />
              <Button variant="theme" fullWidth={true} type="submit">Đổi mật khẩu</Button>
            </form>
          </Box>
        </Box>
      </Box>
    </GlobalLayout>
  );
}
