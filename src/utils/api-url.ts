export const BANKS_URI: string = 'api/v1/banks';
export const BANK_RECEIVE_URI: string = 'api/v1/bank-receives';

export const buildDataUrl = (url: string, param: {[key: string]: string|number}): string => {
  for (const key in param) {
    url = url.replace(`{${key}}`, String(param[key]));
  }
  return url;
}
