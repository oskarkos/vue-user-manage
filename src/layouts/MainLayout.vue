<template>
  <div
    class="mainLayout"
    :class="menuOpened ? 'mainLayout__sideBarOpen' : 'mainLayout__sideBarClose'"
  >
    <SideBar :is-open="menuOpened" />
    <NavBar :is-open="menuOpened" @clickIcon="toggleMenu" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SideBar from "@/components/Menu/SideBar.vue";
import NavBar from "@/components/Menu/NavBar.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    SideBar,
    NavBar,
  },
  props: {},
  setup: (props) => {
    const menuOpened = ref(true);
    const toggleMenu = () => {
      menuOpened.value = !menuOpened.value;
    };
    return {
      menuOpened,
      toggleMenu,
    };
  },
});
</script>
<style lang="scss">
.mainLayout {
  @include flexColumn;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100vh;
  width: 100%;
  background-color: $background-primary;
  &__sideBarOpen {
    padding: 0 3rem 0 19rem;
  }
  &__sideBarClose {
    padding: 0 3rem 0 7.5rem;
  }
}
</style>
