export type TUser = {
  id: number;
  uuid: string;
  nickname: string;
  created_at: string;
  telegram_id?: string;
  money_daily: number;
};

export type TUserQuery = {
  user: TUser;
};

export type TUserCreate = {
  nickname: string;
  password: string;
  password_confirm: string;
};

export type TUserLogin = {
  nickname: string;
  password: string;
};
