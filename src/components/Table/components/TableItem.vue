<template>
  <div class="tableItem" :style="cssProps">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "TableItem",
  components: {},
  props: {
    colsToTake: {
      type: Number,
      required: true,
    },
  },
  setup: (props) => {
    const cssProps = computed(() => {
      return {
        "--cols-to-take": `span ${props.colsToTake} / span ${props.colsToTake}`,
      };
    });
    return {
      cssProps,
    };
  },
});
</script>
<style lang="scss">
.tableItem {
  @include flexRow;
  text-align: left;
  justify-content: flex-start;
  height: 4.6rem;
  padding: 0.5rem;
  grid-column: var(--cols-to-take);
}
</style>
