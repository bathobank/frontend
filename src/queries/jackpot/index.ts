import {TJackpotResponse} from "@/@types/jackpot";
import {JACKPOT_URI} from "@/utils/api-url";
import axiosInstance from "@/utils/axios";
import {useQuery} from "react-query";

export const JACKPOT_GET_ALL_QK: string = 'jackpot_get_all_query_key';

export const jackpotQuery = (): Promise<TJackpotResponse> => {
  return axiosInstance.get(JACKPOT_URI);
};

export const useJackpotQuery = (): TJackpotResponse|undefined => {
  const { data } = useQuery({
    queryKey: [JACKPOT_GET_ALL_QK],
    queryFn: () => jackpotQuery(),
  });
  return data;
};
