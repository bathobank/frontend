import {TProjectUpdateForm} from "@/@types/project";
import {buildDataUrl, PROJECT_UPDATE} from "@/utils/api-url";
import axiosInstance from "@/utils/axios";
import {useMutation} from "react-query";

export const PROJECT_UPDATE_QK: string = 'project_update_query_key';

export const projectUpdateQuery = (uuid: string, param: TProjectUpdateForm): Promise<unknown> => {
  const url = buildDataUrl(PROJECT_UPDATE, {uuid});
  return axiosInstance.put(url, param);
};

export const useProjectUpdateQuery = (uuid: string) => {
  return useMutation({
    mutationKey: [PROJECT_UPDATE_QK, uuid],
    mutationFn: (param: TProjectUpdateForm) => projectUpdateQuery(uuid, param),
  });
};
