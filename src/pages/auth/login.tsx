import {TUserLogin} from "@/@types/user";
import {GlobalLayout} from "@/components/layouts/GlobalLayout";
import {Button} from "@/components/ui/Button";
import {Box} from "@/components/ui/Box";
import {Input} from "@/components/ui/Input";
import {Text} from "@/components/ui/Text";
import {LinkUI} from "@/components/ui/Link";
import {useAuthLoginMutation} from "@/queries/auth/login";
import {AUTH_GET_USER_QK} from "@/queries/auth/user";
import {defaultOptionReactQueryResponse} from "@/utils/helper";
import {useRouter} from "next/router";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useQueryClient} from "react-query";

export default function AuthLogin() {
  const [isRequesting, setRequesting] = useState<boolean>(false);
  const authLoginMutation = useAuthLoginMutation();
  const {push} = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm<TUserLogin>();

  const onSubmit = (data: TUserLogin) => {
    const mutateOption = defaultOptionReactQueryResponse<{ token: string }>((result) => {
      reset();
      window.localStorage.setItem('customer-token', result.token);
      queryClient.invalidateQueries({
        queryKey: [AUTH_GET_USER_QK]
      });
      void push('/');
    }, () => {
      setRequesting(false);
    });

    setRequesting(true);
    authLoginMutation.mutate(data, mutateOption);
  }

  return (
    <GlobalLayout showHeader={false} title="Đăng nhập">
      <Box className='w-1/2 mx-auto mt-10 rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal'>
        <Box className="w-full rounded-lg shadow">
          <Box className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Text align="center" className="text-xl">Đăng nhập</Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box className="mb-3">
                <Input
                  id="nickname"
                  label="Nickname"
                  {...register('nickname', {required: true})}
                />
                {errors.nickname && <Text size='sm' col='red' className='italic !mt-1'>Hãy nhập Nickname</Text>}
              </Box>
              <Box className="mb-5">
                <Input
                  id="password"
                  label="Mật khẩu"
                  type="password"
                  {...register('password', {required: true})}
                />
                {errors.password && <Text size='sm' col='red' className='italic !mt-1'>Hãy nhập mật khẩu</Text>}
              </Box>
              <Button
                type="submit"
                fullWidth={true}
                variant="theme"
                disabled={isRequesting}
                className="mb-3">
                Đăng nhập
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                Bạn chưa có tài khoản? <LinkUI href="/auth/register">Đăng ký</LinkUI>
              </p>
            </form>
          </Box>
        </Box>
      </Box>
    </GlobalLayout>
  );
}
