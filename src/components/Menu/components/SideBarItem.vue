<template>
  <div
    class="sideBarItem"
    :class="isOpen ? 'sideBarItem__open' : 'sideBarItem__close'"
  >
    <router-link class="sideBarItem__link" :to="routeUrl">
      <fa-icon
        class="sideBarItem__link-icon"
        :class="
          isOpen
            ? 'sideBarItem__link-icon-open'
            : 'sideBarItem__link-icon-close'
        "
        v-if="icon"
        :icon="icon"
      />
      <span class="sideBarItem__link-label" v-if="isOpen">{{ label }}</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SideBarItem",
  components: {},
  props: {
    routeUrl: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  setup: (props) => {
    return {};
  },
});
</script>
<style lang="scss">
.sideBarItem {
  @include flexRow;
  width: 100%;
  height: 2rem;
  margin: 1rem 0;
  cursor: pointer;
  &__link {
    @include flexRow;
    text-decoration: none;
    font-size: 1rem;
    padding: 0.5rem 0;
    color: $blue-secondary;
    &-icon {
      color: $blue-primary;
      &-open {
        margin-right: 1.5rem;
      }
      &-close {
        margin: 0;
      }
    }
  }
  &__open {
    justify-content: flex-start;
  }
  &__close {
    justify-content: center;
  }
}
</style>
