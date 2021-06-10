<template>
  <div class="good-item">
    <img :src="good.img" alt="" />
  </div>
</template>

<script>
export default {
  name: "GoodListItem",
  props: {
    good: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  created(){
    console.log(this.good,"good")
  }
};
</script>
<style scoped>
</style>