import { Stack } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DefaultButton } from "@/components/ui/DefaultButton";
import { InfoButton } from "@/components/ui/InfoButton";
import { getGameOpen, setGameOpen } from "@/stores/slices/game";

const MENU: Array<{ slug: string; title: string }> = [
  { slug: "cltx", title: "CLTX" },
  { slug: "cltx2", title: "CLTX+2" },
  { slug: "gap3", title: "Gấp 3" },
  { slug: "tong3so", title: "Tổng 3 số" },
  { slug: "1phan3", title: "1 phần 3" },
  { slug: "xien", title: "Xiên" },
  { slug: "doanso", title: "Đoán số" },
];

export const GameList = () => {
  const dispatch = useDispatch();
  const gameOpen = useSelector(getGameOpen);

  const changeGame = (gameSlug: string) => {
    dispatch(setGameOpen(gameSlug));
  };

  useEffect(
    () => {
      if (gameOpen == "") {
        changeGame(MENU[0].slug);
      }
    },
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [gameOpen],
  );

  return (
    <Stack
      direction="row"
      gap={1}
      className="overflow-x-auto m-auto max-w-full"
    >
      {MENU.map((menu, index) => {
        return menu.slug === gameOpen ? (
          <InfoButton key={`header-menu-${index}`}>{menu.title}</InfoButton>
        ) : (
          <DefaultButton
            key={`header-menu-${index}`}
            onClick={() => changeGame(menu.slug)}
          >
            {menu.title}
          </DefaultButton>
        );
      })}
    </Stack>
  );
};
