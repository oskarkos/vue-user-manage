<template>
  <div class="todoContainer">
    <div class="todoContainer__button">
      <Button
        class="todoContainer__button-addUser"
        button-type="primary"
        icon="fa-solid fa-plus"
        button-text="Add a task"
        @click="toggleModal(true)"
      ></Button>
    </div>
    <div class="todoContainer__list">
      <TodoCard
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @changeTodoState="changeTodoState"
        @deleteTodo="deleteTodo"
      />
    </div>
    <Modal :show="showModal" @closeModal="toggleModal(false)">
      <div class="modalContent">
        <h2>Add new task</h2>
        <div class="modalContent__input">
          <Input
            class="modalContent__input-title"
            placeholder="Task title"
            v-model="newTaskTitle"
          />
        </div>
        <Button
          class="modalContent__button-confirm"
          button-type="primary"
          icon="fa-solid fa-check"
          button-text="Confirm"
          @click="addTodo"
        ></Button>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ITodos } from "../../api/types/Todos";
import { uuid } from "vue-uuid";
import Button from "../../components/Button/ButtonIndex.vue";
import Modal from "../../components/Modal/ModalIndex.vue";
import Input from "../../components/Input/InputIndex.vue";
import TodoCard from "./components/TodosCard.vue";

export default defineComponent({
  name: "UsersTodosView",
  components: {
    Button,
    Modal,
    Input,
    TodoCard,
  },
  setup: () => {
    const route = useRoute();
    const store = useStore();
    const userId = computed(() => route.params.id);
    const newTaskTitle = ref("");
    const showModal = ref(false);
    const todos = computed(() =>
      store.getters
        .getTodosByUserId(userId.value)
        .sort(
          (x: ITodos, y: ITodos) => Number(x.completed) - Number(y.completed)
        )
    );
    onMounted(() => {
      getTodos();
    });

    const addTodo = async () => {
      await store.dispatch("addTodo", {
        id: uuid.v4(),
        title: newTaskTitle.value,
        completed: false,
        userId: Number(userId.value),
      });
      newTaskTitle.value = "";
      toggleModal(false);
    };

    const getTodos = async () => {
      try {
        await store.dispatch("fetchUserTodos", userId.value);
      } catch (error) {
        console.log(error);
      }
    };

    const deleteTodo = async (id: string) => {
      await store.dispatch("deleteTodo", id);
    };

    const changeTodoState = async (id: string) => {
      await store.dispatch("changeTodoState", id);
    };

    const toggleModal = (show: boolean) => {
      showModal.value = show;
    };

    return {
      todos,
      route,
      showModal,
      toggleModal,
      addTodo,
      newTaskTitle,
      deleteTodo,
      changeTodoState,
    };
  },
});
</script>
<style lang="scss">
.todoContainer {
  @include flexColumn;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  row-gap: 2rem;
  &__button {
    width: 12.2rem;
    &-addUser {
      justify-content: flex-start;
      padding: 0 1.5rem;
    }
  }
  &__list {
    @include flexColumn;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    overflow: scroll;
    row-gap: 1rem;
  }
}
.modalContent {
  @include flexColumn;
  width: 100%;
  height: 100%;
  row-gap: 1rem;
  color: $blue-primary;
  & h2 {
    margin: 0;
  }
  &__input {
    @include flexColumn;
    align-items: flex-start;
    width: 100%;
    row-gap: 1rem;
  }
  &__button {
    margin-top: 1rem;
    width: 100%;
  }
}
</style>
