<template>
  <div class="navBar">
    <div class="navBar__leftSide">
      <fa-icon
        class="navBar__leftSide-icon"
        :icon="isOpen ? 'fa-solid fa-bars' : 'fa-solid fa-bars-staggered'"
        @click="emitClickIcon"
      />
      <h3 class="navBar__leftSide-subtitle">Dashboard</h3>
    </div>
    <div>
      <p>Juan</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavBar",
  components: {},
  emits: ["clickIcon"],
  props: {
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  setup: (props, { emit }) => {
    function emitClickIcon() {
      emit("clickIcon");
    }
    return { emitClickIcon };
  },
});
</script>
<style lang="scss">
.navBar {
  @include flexRow;
  width: 100%;
  justify-content: space-between;
  height: 4.6rem;
  padding: 0 2rem;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(43, 45, 55, 0.02);
  &__leftSide {
    @include flexRow;
    color: $subtitle-primary;
    font-weight: normal;
    &-icon {
      font-size: 1rem;
      margin-right: 1rem;
      cursor: pointer;
    }
    &-subtitle {
      font-size: 0.9rem;
      font-weight: normal;
    }
  }
}
</style>
