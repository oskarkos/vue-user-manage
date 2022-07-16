<template>
  <div class="sideBar" :class="isOpen ? 'sideBar__open' : 'sideBar__close'">
    <div class="sideBar__logo">
      <h1>{{ isOpen ? "System" : "S" }}</h1>
    </div>
    <div class="sideBar__menu">
      <SideBarItem
        v-for="(item, index) in sideBarDataWithOpen"
        :key="index"
        :route-url="item.routeUrl"
        :label="item.label"
        :icon="item.icon"
        :is-open="item.isOpen"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import SideBarItem from "./components/SideBarItem.vue";
import { sideBarData } from "./data/SideBarData";

export default defineComponent({
  name: "SideBar",
  components: { SideBarItem },
  props: {
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  setup: (props) => {
    const sideBarDataWithOpen = computed(() =>
      sideBarData.map((item) => {
        return {
          ...item,
          isOpen: props.isOpen,
        };
      })
    );
    return { sideBarDataWithOpen };
  },
});
</script>
<style lang="scss">
.sideBar {
  @include flexColumn;
  align-items: flex-start;
  justify-content: flex-start;
  position: fixed;
  left: 0;
  padding: 0 1.5rem;
  height: 100vh;
  background: white;
  box-shadow: 4px 0px 4px rgba(43, 45, 55, 0.02);
  &__logo {
    @include flexRow;
    & h1 {
      font-size: 2rem;
      font-weight: 500;
      color: black;
    }
  }
  &__open {
    width: 16rem;
  }
  &__close {
    width: 4.5rem;
  }
  &__menu {
    @include flexColumn;
    justify-content: flex-start;
    width: 100%;
  }
}
</style>
