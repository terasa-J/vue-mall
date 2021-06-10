<template>
  <div class="good-list">
    <good-list-item v-for="(item, index) in goods" :key="index" :good="item" />
  </div>
</template>

<script>
import GoodListItem from "./GoodListItem.vue";

export default {
  name: "GoodList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodListItem,
  },
};
</script>
<style scoped>
</style>