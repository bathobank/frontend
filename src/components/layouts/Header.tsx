import {Box} from "@/components/ui/Box";
import {Flex} from "@/components/ui/Flex";
import {LinkUI} from "@/components/ui/Link";
import {Text} from "@/components/ui/Text";
import {cn} from "@/utils/ui";

const MENU: Array<{slug: string; title: string; isActive: boolean}> = [
  {slug: 'cltx', title: 'CLTX', isActive: true},
  {slug: 'cltx2', title: 'CLTX+2', isActive: false},
  {slug: 'gap3', title: 'Gấp 3', isActive: false},
  {slug: 'tong3so', title: 'Tổng 3 số', isActive: false},
  {slug: '1phan3', title: '1 phần 3', isActive: false},
  {slug: 'xien', title: 'Xiên', isActive: false},
  {slug: 'doanso', title: 'Đoán số', isActive: false},
  {slug: 'xsmb', title: 'XSMB', isActive: false},
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
            className={cn('group text-white p-4 border-b-2 border-[transparent] transition-all', menu.isActive ? 'border-b-[#ff55a5]' : 'hover:border-b-[#ff55a5]', index > 0 ? 'ml-1' : '')}>
            <Text size='sm' className="text-[#c7c7c7] group-hover:text-white transition-all uppercase">{menu.title}</Text>
          </LinkUI>
        ))}
      </Flex>
    </Box>
  );
}
