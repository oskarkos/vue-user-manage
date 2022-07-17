<template>
  <div
    class="buttonContainer"
    :class="
      buttonType === 'primary'
        ? 'buttonContainer__primary'
        : 'buttonContainer__secondary'
    "
    @click="clickButton"
  >
    <fa-icon v-if="icon" class="buttonContainer__icon" :icon="icon" />
    <p>{{ buttonText }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ButtonIndex",
  emits: ["clickButton"],
  props: {
    buttonText: {
      type: String,
      default: "Button",
    },
    buttonType: {
      type: String,
      default: "primary",
    },
    icon: {
      type: String,
      default: "",
    },
  },
  setup(_, { emit }) {
    const clickButton = () => {
      emit("clickButton");
    };

    return {
      clickButton,
    };
  },
});
</script>

<style lang="scss">
.buttonContainer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  height: 3rem;
  cursor: pointer;
  &__icon {
    margin-right: 1rem;
  }
  p {
    font-size: 1rem;
    font-weight: bold;
  }

  &__primary {
    border: 2px solid $blue-primary;
    background-color: $blue-primary;
    color: white;
    &:hover {
      background-color: white;
      border-color: $blue-primary;
      color: $blue-primary;
    }
  }
  &__secondary {
    border: 2px solid white;
    background-color: white;
    color: $blue-primary;

    &:hover {
      background-color: $blue-primary;
      border-color: white;
      color: white;
    }
  }
}
</style>
