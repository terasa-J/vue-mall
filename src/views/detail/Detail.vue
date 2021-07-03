<template>
  <div id="detial">
    <detail-nav-bar />
    <detail-swiper :topImages="topImages" />
  </div>
</template>

<script>
import { getMockDeail } from "common/mockData/detail";
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
  },
  data() {
    return {
      iid: null,
      topImages: [],
    };
  },
  created() {
    this.iid = this.$route.query.iid;
    //获取详情数据
    this.getDetailData();
  },
  methods: {
    //获取详情数据(mock)
    getDetailData() {
      console.log(this.iid)
      this.topImages = getMockDeail()[this.iid] && getMockDeail()[this.iid].data.topImages;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>