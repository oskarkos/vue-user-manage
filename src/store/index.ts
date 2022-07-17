import { createStore } from "vuex";
import { IUSer } from "../api/types/User";
import { apiClients } from "../api";

const { userClient } = apiClients;

export default createStore({
  state: {
    users: [] as IUSer[],
  },
  getters: {
    getAllUsers: (state) => state.users,
  },
  mutations: {
    setUsers: (state, users: IUSer[]) => {
      state.users = users;
    },
    addUser: (state, user: IUSer) => {
      state.users.push(user);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
  },
  actions: {
    fetchUsers: async ({ commit }) => {
      if (localStorage.getItem("users")) {
        const users = JSON.parse(localStorage.getItem("users") as string);
        commit("setUsers", users);
      } else {
        const { data } = await userClient().getUsers();
        commit("setUsers", data);
      }
    },
    addNewUser: async ({ commit }, user: IUSer) => {
      commit("addUser", user);
    },
  },
  modules: {},
});
