import {buildDataUrl, PROJECT_DELETE} from "@/utils/api-url";
import axiosInstance from "@/utils/axios";
import {useMutation} from "react-query";

export const PROJECT_DELETE_QK: string = 'project_delete_query_key';

export const projectDeleteQuery = (uuid: string): Promise<unknown> => {
  const url = buildDataUrl(PROJECT_DELETE, {uuid});
  return axiosInstance.delete(url);
};

export const useProjectDeleteQuery = () => {
  return useMutation({
    mutationKey: [PROJECT_DELETE_QK],
    mutationFn: projectDeleteQuery,
  });
};
