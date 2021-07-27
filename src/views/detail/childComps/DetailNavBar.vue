<template>
  <div id="detailNavBar">
    <nav-bar>
      <div slot="left" class="back" @click="back">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <span
          v-for="(item, index) in titles"
          :key="index"
          :class="index === currentIndex ? 'active' : ''"
          @click="titleClick(index)"
        >
          {{ item }}</span
        >
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";

export default {
  name: "Detailnavbar",
  components: {
    NavBar,
  },

  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.back {
  margin-top: 3px;
}
.back img {
  width: 15px;
}
.title {
  display: flex;
  font-size: 15px;
}
.title span {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
</style>