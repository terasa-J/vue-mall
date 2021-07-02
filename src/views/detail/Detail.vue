<template>
  <div>详情页{{ iid }}</div>
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
    };
  },
  created() {
    this.iid = this.$route.query.iid;
    console.log(this.$route.query);
  },
};
</script>
<style scoped>
</style>