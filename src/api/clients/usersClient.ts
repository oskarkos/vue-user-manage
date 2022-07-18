import { AxiosInstance, AxiosResponse } from "axios";
import { apiAxiosInstanceWithoutAuth } from "../instances/apiAxiosInstance";
import { ITodos } from "../types/Todos";
import { IUSer } from "../types/User";

export interface IUserClient {
  getUsers(): Promise<AxiosResponse<IUSer[]>>;
  getUserTodos(userId: number): Promise<AxiosResponse<ITodos[]>>;
}

export function buildUserClient(
  httpInstance: AxiosInstance = apiAxiosInstanceWithoutAuth
): IUserClient {
  return {
    getUsers() {
      return httpInstance.get<IUSer[]>("users");
    },
    getUserTodos(userId: number) {
      return httpInstance.get<ITodos[]>(`todos?userId=${userId}`);
    },
  };
}

export default buildUserClient;
