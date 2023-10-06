import {TProjectForm} from "@/@types/project";
import {PROJECT_CREATE} from "@/utils/api-url";
import axiosInstance from "@/utils/axios";
import {useMutation} from "react-query";

export const PROJECT_CREATE_QK: string = 'project_create_query_key';

export const projectCreateQuery = (param: TProjectForm): Promise<unknown> => {
  return axiosInstance.post(PROJECT_CREATE, param);
};

export const useProjectCreateQuery = () => {
  return useMutation({
    mutationKey: [PROJECT_CREATE_QK],
    mutationFn: projectCreateQuery,
  });
};
