import {TBoardQuery} from "@/@types/board";
import {BOARD_GET_ONE, buildDataUrl} from "@/utils/api-url";
import axiosInstance from "@/utils/axios";
import {dehydrate, DehydratedState, QueryClient, useQuery} from "react-query";

export const BOARD_GET_ONE_QK: string = 'board_get_one_query_key';

export const boardOneQuery = (uuid: string): Promise<TBoardQuery> => {
  const url = buildDataUrl(BOARD_GET_ONE, {uuid});
  return axiosInstance.get(url);
};

export const useBoardOneQuery = (uuid: string): TBoardQuery | undefined => {
  const {data} = useQuery({
    queryKey: [BOARD_GET_ONE_QK],
    queryFn: () => boardOneQuery(uuid),
  });
  return data;
};

export const prefetchBoardOneQuery = async (uuid: string): Promise<DehydratedState> => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([BOARD_GET_ONE_QK], () => boardOneQuery(uuid));
  return dehydrate(queryClient);
};
