<template>
  <div class="good-list">
    <good-list-item v-for="(item, index) in goods" :key="index" :goodItem="item" class="good-list-item"/>
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
.good-list{
  display: flex;  
  justify-content: space-around;
  flex-wrap: wrap;

  padding: 2px;
}

</style>