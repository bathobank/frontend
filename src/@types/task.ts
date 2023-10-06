import {TApiSuccessResponse} from "@/@types/axios";
import {TBoard} from "@/@types/board";
import {TUser} from "@/@types/user";

export type TTask = {
  id: number;
  uuid: string;
  title: string;
  description: string;
  created_at: string;
  user: TUser;
  board: TBoard;
};
export type TTasks = Array<TTask>;
export type TTasksQuery = TApiSuccessResponse<{tasks: TTasks}>
export type TTaskQuery = TApiSuccessResponse<{task: TTask}>
