import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {Img} from "@/components/ui/Img";
import {LinkUI} from "@/components/ui/Link";
import {Text} from "@/components/ui/Text";
import {cn} from "@/utils/ui";
import {ReactNode, useEffect, useRef, useState} from "react";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';
import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';

type TMenu = {
  title: string;
  icon: ReactNode;
  href: string;
  isActive: boolean;
};

const createMenu = (title: string, href: string, isActive: boolean, icon: ReactNode): TMenu => {
  return {title, href, isActive, icon}
}

const MENU: TMenu[] = [
  createMenu('Trang chủ', '/', true, <HomeRoundedIcon className="!text-[1.25rem]" />),
  createMenu('Cài đặt bank', '/', false, <AccountBalanceRoundedIcon className="!text-[1.25rem]" />),
  createMenu('Giftcode', '/', false, <CardGiftcardRoundedIcon className="!text-[1.25rem]" />),
  createMenu('Nhiệm vụ ngày', '/', false, <ConfirmationNumberRoundedIcon className="!text-[1.25rem]" />),
  createMenu('Nổ hũ', '/', false, <EmojiEventsRoundedIcon className="!text-[1.25rem]" />),
  createMenu('Lịch sử chơi', '/', false, <HistoryRoundedIcon className="!text-[1.25rem]" />),
  createMenu('Liên kết telegram', '/', false, <SendRoundedIcon className="!text-[1.25rem]" />),
  createMenu('Đổi mật khẩu', '/', false, <ManageAccountsRoundedIcon className="!text-[1.25rem]" />),
  createMenu('Đăng xuất', '/', false, <ExitToAppRoundedIcon className="!text-[1.25rem]" />),
  createMenu('Box chat', '/', false, <QuestionAnswerRoundedIcon className="!text-[1.25rem]" />)
];

export const Navbar = () => {
  const [menuHeight, setMenuHeight] = useState<string>('100%');
  const logoRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logoRef.current || !copyrightRef.current) return;
    const logoHeight = logoRef.current!.offsetHeight;
    const copyrightHeight = copyrightRef.current!.offsetHeight;
    setMenuHeight(`calc(100vh - ${logoHeight + copyrightHeight}px)`);
  }, [logoRef, copyrightRef]);

  return (
    <Box className='bg-[#28282d] min-h-[100vh]'>
      <Box ref={logoRef}>
        <Flex justify='center' className="py-6 border-b-2 border-b-[#ff55a5]">
          <Img src="/images/logo/logo.png" className='w-[180px]'/>
        </Flex>
        <Flex justify='between' className='px-6 py-4 border-b border-b-[#ffffff0d]'>
          <Flex>
            <Img src='/images/user.png' size={40} circle={true} />
            <Box className="pl-3">
              <Text className='m-0 text-[12px] text-[#c7c7c7]'>Xin chào</Text>
              <Text>vietdau</Text>
            </Box>
          </Flex>
          <Box className="group rounded-lg bg-[#ffffff0d] px-3 py-2 cursor-pointer transition-all hover:bg-[#cbd4ff3d]">
            <ExitToAppRoundedIcon className="text-[#fff] transition-all group-hover:text-[#ff55a5]" />
          </Box>
        </Flex>
      </Box>
      <Box className="py-5 overflow-auto" style={{ height: menuHeight, maxHeight: menuHeight }}>
        {MENU.map((menu, index) => (
          <LinkUI key={`box-menu-${index}`} href={menu.href} underline={false} className={cn("text-white transition-all", menu.isActive ? 'text-[#ff55a5]' : 'hover:text-[#ff55a5]')}>
            <Flex className='py-3 pl-6 gap-[10px]'>
              {menu.icon}
              <span className="uppercase text-[13px] relative top-[2px]">{menu.title}</span>
            </Flex>
          </LinkUI>
        ))}
      </Box>
      <Box className="pl-6 py-4 border-t-2 border-t-[#ff55a5]" ref={copyrightRef}>
        <Text col='white' size='sm'>© KuBank, 2018—2023.</Text>
        <Text col='white' size='sm'>Create by KuBank Ltd.</Text>
      </Box>
    </Box>
  );
}
