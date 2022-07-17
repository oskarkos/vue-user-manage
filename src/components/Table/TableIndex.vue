<template>
  <div class="table">
    <span class="table__title">{{ titleTable }}</span>
    <slot name="tableHeader"></slot>
    <slot name="tableContent"> </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "TableIndex",
  components: {},
  props: {
    titleTable: {
      type: String,
      default: "",
    },
  },
  setup: () => {
    return {};
  },
});
</script>
<style lang="scss">
.table {
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-auto-rows: auto;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.02);
  border-radius: 5px;
  gap: 2px;
  overflow: scroll;
  font-size: 0.9rem;
  font-weight: 500;
  &__title {
    text-align: left;
    margin: 1rem 0.5rem;
    font: 1.2rem;
    color: $title-primary;
    font-weight: bold;
  }
}
</style>
