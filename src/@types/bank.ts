export type TBank = {
  code: string;
  title: string;
  number: string;
  name: string;
  min: number;
  max: number;
  bank: TBankData
};

export type TBankData = {
  bin: string;
  code: string;
  created_at: string;
  logo: string;
  id: number;
  name: string;
  short_name: string;
  swift_code: string;
};

export type TBankDataResponse<T> = {
  success: boolean;
  message: string;
  data: { banks: T[] }
};
