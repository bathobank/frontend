import { HAS_ORDER_WAIT } from "@/utils/api-url";
import axiosInstance from "@/utils/axios";
import { useQuery } from "react-query";
import { THasOrderWaitResponse } from "@/@types/has-order-wait";

export const HAS_ORDER_WAIT_QK: string = "has_order_wait_query_key";

export const hasOrderWaitQuery = (): Promise<THasOrderWaitResponse> => {
  return axiosInstance.get(HAS_ORDER_WAIT);
};

export const useHasOrderWaitQuery = (): THasOrderWaitResponse | undefined => {
  const { data } = useQuery({
    queryKey: [HAS_ORDER_WAIT_QK],
    queryFn: () => hasOrderWaitQuery(),
    retry: 0,
    staleTime: 5000,
  });
  return data;
};
