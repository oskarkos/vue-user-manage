<template>
  <div
    class="mainLayout"
    :class="menuOpened ? 'mainLayout__sideBarOpen' : 'mainLayout__sideBarClose'"
  >
    <SideBar :is-open="menuOpened" />
    <div class="mainLayout__content">
      <NavBar :is-open="menuOpened" @clickIcon="toggleMenu" />
      <router-view />
    </div>
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
  width: 100%;
  background-color: $background-primary;
  &__content {
    @include flexColumn;
    width: 100%;
    height: 100vh;
    padding-top: 6.5rem;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
  }
  &__sideBarOpen {
    padding: 0 3rem 0 19rem;
  }
  &__sideBarClose {
    padding: 0 3rem 0 7.5rem;
  }
}
</style>
