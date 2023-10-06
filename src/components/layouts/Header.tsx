import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {LinkUI} from "@/components/ui/Link";
import {Text} from "@/components/ui/Text";

const MENU: Array<{slug: string; title: string}> = [
  {slug: 'cltx', title: 'CLTX'},
  {slug: 'cltx2', title: 'CLTX+2'},
  {slug: 'gap3', title: 'Gấp 3'},
  {slug: 'tong3so', title: 'Tổng 3 số'},
  {slug: '1phan3', title: '1 phần 3'},
  {slug: 'xien', title: 'Xiên'},
  {slug: 'doanso', title: 'Đoán số'},
  {slug: 'xsmb', title: 'XSMB'},
]

export const Header = () => {
  return (
    <Box className="px-3 py-3">
      <Flex className="px-4 rounded-lg bg-[#28282d] border border-[#ffffff0d] shadow-normal">
        {MENU.map((menu, index) => (
          <LinkUI
            key={`header-menu-${index}`}
            href={`/${menu.slug}`}
            underline={false}
            className='group text-white p-4 border-b-2 border-[transparent] transition-all hover:border-b-[#ff55a5]'>
            <Text size='sm' className="text-[#c7c7c7] group-hover:text-white transition-all uppercase">{menu.title}</Text>
          </LinkUI>
        ))}
      </Flex>
    </Box>
  );
}
