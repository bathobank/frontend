import {TApiErrorResponse, TApiSuccessResponse, TParamError} from "@/@types/axios";
import {TCallable} from "@/@types/util";
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

export const defaultOptionReactQueryResponse = <T>(cbSuccess?: (result: T) => void, cbDone?: () => void) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const toast = useToast();

  return {
    onSuccess(result: unknown) {
      const {message, data} = result as unknown as TApiSuccessResponse<[]>;
      toast.success(message);
      cbSuccess && cbSuccess(data as T);
    },
    onError(error: unknown) {
      const {data, responseStatus, message} = error as TApiErrorResponse<TParamError>;
      if (responseStatus === 422) {
        toast.error(buildErrorParam(data));
      } else {
        toast.error(message);
      }
    },
    onSettled() {
      cbDone && cbDone();
    }
  };
}

export const copyContent = (content: string, callback?: TCallable) => {
  const input = document.createElement('input');
  input.setAttribute('value', content);
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
  if (callback) {
    callback();
  }
}

export const formatMoney = (amount: number|string, decimalCount: number = 0, decimal: string = ".", thousands: string = ","): string => {
  if (typeof amount === 'number') {
    amount = String(amount);
  }

  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign: string = Number(amount) < 0 ? "-" : "";

    const i: string = Number(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    const j: number = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount ? decimal + Math.abs(Number(amount) - Number(i)).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    return "";
  }
}
