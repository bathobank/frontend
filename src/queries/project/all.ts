import {TProjectsQuery} from "@/@types/project";
import {PROJECT_GET_ALL} from "@/utils/api-url";
import axiosInstance from "@/utils/axios";
import {useQuery} from "react-query";

export const PROJECT_GET_ALL_QK: string = 'project_get_all_query_key';

export const projectAllQuery = (): Promise<TProjectsQuery> => {
  return axiosInstance.get(PROJECT_GET_ALL);
};

export const useProjectAllQuery = (): TProjectsQuery|undefined => {
  const { data } = useQuery({
    queryKey: [PROJECT_GET_ALL_QK],
    queryFn: () => projectAllQuery(),
  });
  return data;
};
