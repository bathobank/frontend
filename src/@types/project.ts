import {TApiSuccessResponse} from "@/@types/axios";
import {TUser} from "@/@types/user";

export type TProject = {
  id: number;
  uuid: string;
  title: string;
  description: string;
  created_at: string;
  user: TUser;
}

export type TProjects = Array<TProject>;

export type TProjectsQuery = TApiSuccessResponse<{projects: TProjects}>;
export type TProjectQuery = TApiSuccessResponse<{projects: TProject}>;

export type TProjectForm = {
  title: string;
  description: string;
  user_uuid: string;
};

export type TProjectUpdateForm = Omit<TProjectForm, 'user_uuid'>;
