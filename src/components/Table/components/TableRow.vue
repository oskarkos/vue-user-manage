<template>
  <div class="tableHeader" :style="cssProps">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "TableHeader",
  components: {},
  props: {
    headerColumns: {
      type: Number,
      required: true,
    },
  },
  setup: (props) => {
    const cssProps = computed(() => {
      return {
        "--header-columns": `repeat(${props.headerColumns}, minmax(0, 2fr))`,
      };
    });
    return { cssProps };
  },
});
</script>
<style lang="scss">
.tableHeader {
  display: grid;
  grid-template-rows: repeat(1, minmax(0, 1fr));
  grid-template-columns: var(--header-columns);
  grid-gap: 1rem;
  &:nth-child(odd) {
    background: $background-secondary;
  }
}
</style>
