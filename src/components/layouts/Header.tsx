import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {Text} from "@/components/ui/Text";
import {getGameOpen, setGameOpen} from "@/stores/slices/game";
import {cn} from "@/utils/ui";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

const MENU: Array<{slug: string; title: string;}> = [
  {slug: 'cltx', title: 'CLTX'},
  {slug: 'cltx2', title: 'CLTX+2'},
  {slug: 'gap3', title: 'Gấp 3'},
  {slug: 'tong3so', title: 'Tổng 3 số'},
  {slug: '1phan3', title: '1 phần 3'},
  {slug: 'xien', title: 'Xiên'},
  {slug: 'doanso', title: 'Đoán số'},
]

export const Header = () => {
  const dispatch = useDispatch();
  const gameOpen = useSelector(getGameOpen);

  const changeGame = (gameSlug: string) => {
    dispatch(setGameOpen(gameSlug));
  }

  useEffect(
    () => {
      if (gameOpen == '') {
        changeGame(MENU[0].slug);
      }
    },
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [gameOpen]
  );

  return (
    <Box className="px-3 py-3">
      <Flex className="px-4 rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal">
        {MENU.map((menu, index) => (
          <Box
            key={`header-menu-${index}`}
            onClick={() => changeGame(menu.slug)}
            className={cn('group text-white p-4 border-b-2 border-[transparent] transition-all cursor-pointer', menu.slug === gameOpen ? 'border-b-[#ff55a5]' : 'hover:border-b-[#ff55a5]', index > 0 ? 'ml-1' : '')}>
            <Text size='sm' className={cn("text-[#c7c7c7] group-hover:text-white transition-all uppercase", menu.slug === gameOpen ? 'text-white' : '')}>{menu.title}</Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
