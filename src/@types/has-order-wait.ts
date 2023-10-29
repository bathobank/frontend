import {TApiSuccessResponse} from "@/@types/axios";

export type THasOrderWait = boolean;

export type THasOrderWaitResponse = TApiSuccessResponse<{has_order_wait: THasOrderWait}>;
