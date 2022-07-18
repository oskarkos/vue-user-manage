<template>
  <div
    class="todoCard"
    :class="todo.completed ? 'todoCard__itemCompleted' : undefined"
  >
    <div class="todoCard__itemLeft">
      <fa-icon
        class="todoCard__icon"
        :class="
          todo.completed ? 'todoCard__completed' : 'todoCard__notCompleted'
        "
        :icon="
          todo.completed
            ? 'fa-solid fa-circle-check'
            : 'fa-regular fa-circle-check'
        "
        @click="changeTodoState(todo.id)"
      />
      <div class="todoCard__item-text">
        <p>
          {{ todo.title.charAt(0).toUpperCase() + todo.title.slice(1) }}
        </p>
      </div>
    </div>
    <fa-icon
      class="todoCard__icon todoCard__completed"
      icon="fa-solid fa-trash-can"
      @click="deleteTodo(todo.id)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ITodos } from "../../../api/types/Todos";

export default defineComponent({
  name: "TodoCard",
  props: {
    todo: {
      type: Object as PropType<ITodos>,
      required: true,
    },
  },
  setup: (_, { emit }) => {
    const changeTodoState = (id: string | number) => {
      emit("changeTodoState", id);
    };

    const deleteTodo = (id: string | number) => {
      emit("deleteTodo", id);
    };

    return { changeTodoState, deleteTodo };
  },
});
</script>
<style lang="scss">
.todoCard {
  @include flexRow;
  width: 100%;
  border-radius: 10px;
  justify-content: space-between;
  background-color: white;
  padding: 1rem 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1px solid white;

  &__itemLeft {
    @include flexRow;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
  }
  &__icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    cursor: pointer;
  }
  &__itemCompleted {
    border: 1px solid $blue-primary;
    background-color: $background-secondary;
  }
  &__notCompleted {
    color: $text-disabled;
  }
  &__completed {
    color: $blue-primary;
  }
}
</style>
