import { buildUserClient, IUserClient } from "../api/clients/usersClient";

export type TypeApiClients = {
  userClient: () => IUserClient;
};

export const apiClients: TypeApiClients = {
  userClient: buildUserClient,
};
