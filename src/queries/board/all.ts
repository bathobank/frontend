import {TBoardsQuery} from "@/@types/board";
import {BOARD_GET_ALL, buildDataUrl} from "@/utils/api-url";
import axiosInstance from "@/utils/axios";
import {useQuery} from "react-query";

export const BOARD_GET_ALL_QK: string = 'board_get_all_query_key';

export const boardAllQuery = (uuidProject: string): Promise<TBoardsQuery> => {
  const url: string = buildDataUrl(BOARD_GET_ALL, {
    'uuid-project': uuidProject
  });
  return axiosInstance.get(url);
};

export const useBoardAllQuery = (uuidProject: string): TBoardsQuery|undefined => {
  const { data } = useQuery({
    queryKey: [BOARD_GET_ALL_QK, uuidProject],
    queryFn: () => boardAllQuery(uuidProject),
  });
  return data;
};
