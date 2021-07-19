<template>
  <div id="detail">
    <detail-nav-bar class="detail-navbar" />
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goodInfo="goodInfo" />
      <detail-shop-info :shopInfo="shopInfo" />
      <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad" />
      <detail-params :paramInfo="paramInfo" />
      <detail-comment-info :commentInfo="commentInfo" />
      <good-list :goods="recommends" />
    </scroll>
  </div>
</template>

<script>
import { getMockDeail } from "common/mockData/detail";
import { getMockRecommend } from "common/mockData/recommend";
import { Goods, Shop, GoodsParams } from "network/detail";
import Scroll from "components/common/scroll/Scroll";
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParams from "./childComps/DetailParams";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodList from "components/content/goods/GoodList";

export default {
  name: "Detail",
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParams,
    DetailCommentInfo,
    GoodList,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goodInfo: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
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
      this.shopInfo = new Shop(dataObj.data.shopInfo);
      //4.获取商品详细信息
      this.detailInfo = dataObj && dataObj.data.detailInfo;
      //5.获取参数信息
      this.paramInfo = new GoodsParams(
        dataObj.data.itemParams.info,
        dataObj.data.itemParams.rule
      );
      // 6.获取评论信息
      if (dataObj.data.rateInfo.cRate !== 0) {
        this.commentInfo = dataObj.data.rateInfo.list[0];
      }
      // 7.获取推荐信息
      this.recommends = getMockRecommend()["data"]["list"];
      console.log(this.recommends, "dataObj");
    },
    imgLoad() {
      this.$refs.scroll.refresh();
    },
  },
};
</script>

<style scoped>
/* 不显示底部的首页导航 */
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
/* 顶部导航固定 */
.detail-navbar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>