import {TApiSuccessResponse} from "@/@types/axios";
import {TProject} from "@/@types/project";
import {TTasks} from "@/@types/task";
import {TUser} from "@/@types/user";

export type TBoard = {
  id: number;
  uuid: string;
  title: string;
  description: string;
  created_at: string;
  user: TUser;
  project: TProject;
  tasks: TTasks;
}

export type TBoards = Array<TBoard>;

export type TBoardsQuery = TApiSuccessResponse<{boards: TBoards}>;
export type TBoardQuery = TApiSuccessResponse<{board: TBoard}>;
