<template>
  <div id="detial">
    <detail-nav-bar />
    <detail-swiper :topImages="topImages" />
    <detail-good-info :goodInfo="goodInfo"/>
    <detail-shop-info :shopInfo="shopInfo"/>
  </div>
</template>

<script>
import { getMockDeail } from "common/mockData/detail";
import { Goods, Shop } from "network/detail";
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailGoodInfo from "./childComps/DetailGoodInfo";
import DetailShopInfo  from  "./childComps/DetailShopInfo";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailGoodInfo,
    DetailShopInfo
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goodInfo: {},
      shopInfo: {}
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
      //1.获取顶部轮播图数据
      this.topImages = dataObj && dataObj.data.topImages;
      //2.获取商品信息
      this.goodInfo = new Goods(
        dataObj.data.itemInfo,
        dataObj.data.itemServices.columns,
        dataObj.data.itemServices.services
      );
      //3.获取商家信息
      this.shopInfo = new Shop(dataObj.data.shopInfo)
      console.log(this.shopInfo)
    },
  },
};
</script>

<style lang="scss" scoped>
</style>