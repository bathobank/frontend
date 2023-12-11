export type TStartGame = (gameGroup: string, gameType: string) => void;

type TTypeGameEnd = {
  end: Array<string>;
  ratio: number;
};

type TTypeGameSum2End = {
  sum2end: Array<string>;
  ratio: number;
};

type TTypeGameSum3End = {
  sum3end: Array<string>;
  ratio: number;
};

export type TGame = {
  "1phan3": Record<string, TTypeGameEnd>;
  cltx: Record<string, TTypeGameEnd>;
  cltx2: Record<string, TTypeGameSum2End>;
  doanso: Record<string, TTypeGameEnd>;
  gap3: {
    G3: Record<string, TTypeGameEnd>;
  };
  tong3so: {
    S: Record<string, TTypeGameSum3End>;
  };
  xien: Record<string, TTypeGameSum2End>;
};
