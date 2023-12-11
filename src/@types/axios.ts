export type TApiSuccessResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};

export type TApiErrorResponse<T> = TApiSuccessResponse<T> & {
  responseStatus: number;
};

export type TParamError = {
  [key: string]: string[];
};
