import {HISTORY_WIN} from "@/utils/api-url";
import axiosInstance from "@/utils/axios";
import {useQuery} from "react-query";
import {THistoriesQuery} from "@/@types/history";

const USER_HISTORIES_QK: string = 'user_histories_query_key';

export const historyWin = (limit: number = 10): Promise<THistoriesQuery> => {
  const url: string = HISTORY_WIN + '?limit=' + limit;
  return axiosInstance.get(url);
}

export const useHistoryWin = (limit: number = 10): THistoriesQuery | undefined => {
  const {data} = useQuery({
    queryKey: [USER_HISTORIES_QK],
    queryFn: () => historyWin(limit),
    retry: 0
  });
  return data;
}
