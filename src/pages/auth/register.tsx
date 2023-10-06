import {Img} from "@/components/ui/Img";
import {Flex} from "@/components/ui/Flex";
import {Box} from "@/components/ui/Box";
import {Text} from "@/components/ui/Text";
import Link from "next/link";
import {useEffect} from "react";
import {setIsLoading} from "@/stores/slices/loading";
import {useDispatch} from "react-redux";
import {LinkUI} from "@/components/ui/Link";

export default function AuthLogin() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoading(false));
  }, [dispatch]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <LinkUI href="/" className="flex items-center mb-6 hover:no-underline">
          <Img
            src="/images/logo/logo-trans-min.png"
            data-src-full="/images/logo/logo-trans.png"
            alt="Logo"
            className="w-8 h-8 mr-2 relative top-[-2px]"
          />
          <Text className='text-2xl font-semibold text-gray-900 dark:text-white'>VietD</Text>
        </LinkUI>
        <div
          className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                            Create new account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                    email</label>
                <input type="email" name="email" id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com" required={true}/>
              </div>
              <div>
                <label htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}/>
              </div>
              <div>
                <label htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat
                                    Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}/>
              </div>
              <button type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Register
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-right">
                                Already have an account? <Link href="/auth/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</Link>
              </p>
            </form>
            <Flex justify="between" className="text-black">
              <Box className="w-[42%] h-0 border-[1px] border-solid border-[#ddd]"></Box>
              <Text as="span">or</Text>
              <Box className="w-[42%] h-0 border-[1px] border-solid border-[#ddd]"></Box>
            </Flex>
            <Flex justify="center" items="center"
              className="rounded-2xl border hover:bg-[#f3f4f6] transition-all cursor-pointer py-[10px] select-none">
              <Img src="/images/icons/google.svg" alt="Icon" className="w-[28px] h-[28px]"/>
              <Text weight="semibold" className="ml-2">Create with Google</Text>
            </Flex>
          </div>
        </div>
      </div>
    </section>
  );
}
