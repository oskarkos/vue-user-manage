<template>
  <HelloWorldVue msg="prueba" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorldVue from "../../components/HelloWorld.vue";

export default defineComponent({
  name: "HomeView",
  components: { HelloWorldVue },
  setup() {
    return {};
  },
});
</script>

<style lang="scss"></style>
