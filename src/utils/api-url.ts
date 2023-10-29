export const BANKS_URI: string = 'api/v1/banks';
export const BANK_RECEIVE_URI: string = 'api/v1/bank-receives';
export const AUTH_REGISTER_URI: string = 'api/v1/auth/register';
export const AUTH_LOGIN_URI: string = 'api/v1/auth/login';
export const AUTH_LOGOUT_URI: string = 'api/v1/auth/logout';
export const AUTH_CHANGE_PASSWORD_URI: string = 'api/v1/auth/password';
export const AUTH_GET_USER_URI: string = 'api/v1/auth/user';
export const USER_BANK_RECEIVE_GET: string = 'api/v1/user/bank-receive';
export const USER_BANK_RECEIVE_UPDATE: string = 'api/v1/user/bank-receive';
export const USER_HISTORIES: string = 'api/v1/user/histories';
export const USER_USE_GIFT_CODE: string = 'api/v1/user/gift-code';
export const MISSION_URI: string = 'api/v1/mission';
export const JACKPOT_URI: string = 'api/v1/jackpot';
export const HAS_ORDER_WAIT: string = 'api/v1/user/has_order_wait';

export const buildDataUrl = (url: string, param: {[key: string]: string|number}): string => {
  for (const key in param) {
    url = url.replace(`{${key}}`, String(param[key]));
  }
  return url;
}
