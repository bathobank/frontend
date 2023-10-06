export const PROJECT_GET_ALL: string = 'api/v1/project/all';
export const PROJECT_CREATE: string = 'api/v1/project/create';
export const PROJECT_UPDATE: string = 'api/v1/project/{uuid}';
export const PROJECT_DELETE: string = 'api/v1/project/{uuid}';
export const BOARD_GET_ALL: string = 'api/v1/board/all/{uuid-project}';
export const BOARD_GET_PATH: string = 'api/v1/board/paths';
export const BOARD_GET_TASK: string = 'api/v1/board/{uuid}/task';
export const BOARD_GET_ONE: string = 'api/v1/board/{uuid}';
export const BOARD_CREATE: string = 'api/v1/board/create';
export const BOARD_EDIT: string = 'api/v1/board/{uuid}';
export const BOARD_DELETE: string = 'api/v1/board/{uuid}';

export const buildDataUrl = (url: string, param: {[key: string]: string|number}): string => {
  for (const key in param) {
    url = url.replace(`{${key}}`, String(param[key]));
  }
  return url;
}
