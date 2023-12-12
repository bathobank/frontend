export type TCallable<T = null, D = void> = (param?: T) => D;
export type TTryCatchError = {
  message: string;
};
