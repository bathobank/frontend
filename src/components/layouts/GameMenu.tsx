import { useDispatch, useSelector } from "react-redux";

import { getGameOpen, setGameOpen } from "@/stores/slices/game";

type TGame = { slug: string; title: string };

const GameList: TGame[] = [
  { slug: "cltx", title: "CLTX" },
  { slug: "cltx2", title: "CLTX+2" },
  { slug: "gap3", title: "Gấp 3" },
  { slug: "tong3so", title: "Tổng 3 số" },
  { slug: "1phan3", title: "1 phần 3" },
  { slug: "xien", title: "Xiên" },
  { slug: "doanso", title: "Đoán số" },
];

export const GameMenu = () => {
  const dispatch = useDispatch();
  const gameOpen: string = useSelector(getGameOpen);

  const changeGame = (gameSlug: string) => {
    dispatch(setGameOpen(gameSlug));
  };

  return (
    <>
      {GameList.map((game: TGame, index: number) => (
        <div
          key={`game-menu-${index}`}
          onClick={() => changeGame(game.slug)}
          className={
            `px-3 py-4 rounded-2 fw-bold text-center item-menu-game-choose ` +
            (gameOpen === game.slug ? "active" : "")
          }
        >
          {game.title}
        </div>
      ))}
    </>
  );
};
