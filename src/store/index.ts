import { createStore } from "vuex";
import { IUSer } from "../api/types/User";
import { apiClients } from "../api";
import { ITodos } from "../api/types/Todos";

const { userClient } = apiClients;

export default createStore({
  state: {
    users: [] as IUSer[],
    todos: [] as ITodos[],
  },
  getters: {
    getAllUsers: (state) => state.users,
    getTodosByUserId: (state) => (userId: number) => {
      return state.todos.filter((todo) => todo.userId === Number(userId));
    },
  },
  mutations: {
    setUsers: (state, users: IUSer[]) => {
      state.users = users;
    },
    setTodos: (state, todos: ITodos[]) => {
      state.todos = todos;
    },
    addUser: (state, user: IUSer) => {
      state.users.push(user);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    addTodo: (state, todo: ITodos) => {
      state.todos.push(todo);
    },
    deleteTodo: (state, id: string) => {
      state.todos = state.todos.filter((t) => t.id !== id);
    },
    changeTodoState: (state, id) => {
      const todo = state.todos.find((t) => t.id == id);
      if (todo) {
        todo.completed = !todo.completed;
      }
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
    fetchUserTodos: async ({ commit }, userId: number) => {
      const { data } = await userClient().getUserTodos(userId);
      commit("setTodos", data);
    },
    addNewUser: ({ commit }, user: IUSer) => {
      commit("addUser", user);
    },
    addTodo: ({ commit }, todo: ITodos) => {
      commit("addTodo", todo);
    },
    deleteTodo: ({ commit }, todoId: string) => {
      commit("deleteTodo", todoId);
    },
    changeTodoState: ({ commit }, todoId: string) => {
      commit("changeTodoState", todoId);
    },
  },
  modules: {},
});
