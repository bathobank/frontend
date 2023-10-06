import {TTasksQuery} from "@/@types/task";
import {BOARD_GET_TASK, buildDataUrl} from "@/utils/api-url";
import axiosInstance from "@/utils/axios";
import {dehydrate, DehydratedState, QueryClient, useQuery} from "react-query";

export const TASK_GET_ALL_QK: string = 'task_get_all_query_key';


export const taskAllQuery = (boardUuid: string): Promise<TTasksQuery> => {
  const url = buildDataUrl(BOARD_GET_TASK, {uuid: boardUuid})
  return axiosInstance.get(url);
};

export const useTaskAllQuery = (boardUuid: string): TTasksQuery|undefined => {
  const { data } = useQuery({
    queryKey: [TASK_GET_ALL_QK],
    queryFn: () => taskAllQuery(boardUuid),
  });
  return data;
};

export const prefetchTaskAllQuery = async (boardUuid: string): Promise<DehydratedState> => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([TASK_GET_ALL_QK], () => taskAllQuery(boardUuid));
  return dehydrate(queryClient);
};
