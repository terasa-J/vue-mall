<template>
  <div id="detial">
    <detail-nav-bar />
    <detail-swiper :topImages="topImages" />
    <detail-good-info :goodInfo="goodInfo"/>
  </div>
</template>

<script>
import { getMockDeail } from "common/mockData/detail";
import { Goods } from "network/detail";
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailGoodInfo from "./childComps/DetailGoodInfo";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailGoodInfo,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goodInfo: null,
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
      let dataObj = getMockDeail()[this.iid];
      this.topImages = dataObj && dataObj.data.topImages;
      this.goodInfo = new Goods(
        dataObj.data.itemInfo,
        dataObj.data.itemServices.columns,
        dataObj.data.itemServices.services
      );
    },
  },
};
</script>

<style lang="scss" scoped>
</style>