import {TApiErrorResponse, TApiSuccessResponse, TParamError} from "@/@types/axios";
import {useToast} from "@/hooks/useToast";
// eslint-disable-next-line import/named
import {v4} from 'uuid';

export const uuidv4 = (): string => {
  return v4();
};

export const buildErrorParam = (errors: TParamError): string => {
  const errorMgs: string[] = [];
  for (const error of Object.values(errors)) {
    for (const errMgs of error) {
      errorMgs.push(errMgs);
    }
  }
  return errorMgs.join(', ');
}

export const defaultOptionReactQueryResponse = (cbSuccess?: () => void) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const toast = useToast();

  return {
    onSuccess(data: unknown) {
      const {message} = data as TApiSuccessResponse<[]>;
      toast.success(message);
      cbSuccess && cbSuccess();
    },
    onError(error: unknown) {
      const {data} = error as TApiErrorResponse<TParamError>;
      toast.error(buildErrorParam(data));
    }
  };
}
