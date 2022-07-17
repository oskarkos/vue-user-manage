import { AxiosInstance, AxiosResponse } from 'axios';
import { apiAxiosInstanceWithoutAuth } from '../instances/apiAxiosInstance';
import { IUSer } from '../types/User';

export interface IUserClient {
  getUsers(): Promise<AxiosResponse<IUSer[]>>;
}

export function buildUserClient(
  httpInstance: AxiosInstance = apiAxiosInstanceWithoutAuth,
): IUserClient {
  return {
    getUsers() {
      return httpInstance.get<IUSer[]>('users');
    },
  };
}

export default buildUserClient;
