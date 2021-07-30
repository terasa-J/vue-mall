<template>
  <div id="detail">
    <detail-nav-bar class="detail-navbar" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goodInfo="goodInfo" />
      <detail-shop-info :shopInfo="shopInfo" />
      <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad" />
      <detail-params ref="params" :paramInfo="paramInfo" />
      <detail-comment-info ref="comments" :commentInfo="commentInfo" />
      <good-list ref="recommends" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop" />
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
import DetailBottomBar from "./childComps/DetailBottomBar";
import BackTop from "components/content/backTop/BackTop";
import GoodList from "components/content/goods/GoodList";
import { itemLoadMixins, backTopMixins } from "common/mixins.js";
// 不知道为啥，需要单独引入。mixins也有
import { debounce } from "common/utils";

export default {
  name: "Detail",
  mixins: [itemLoadMixins, backTopMixins],
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParams,
    DetailCommentInfo,
    DetailBottomBar,
    BackTop,
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
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex: 0,
    };
  },
  created() {
    this.iid = this.$route.query.iid;
    //获取详情数据
    this.getDetailData();
  },
  mounted() {
    //初始化每个组件的offSetTop
    this.getThemeTopYs = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comments.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      // 添加一个最大值，为了优化【内容滚动时候，对应主题标红】功能的判断条件
      this.themeTopYs.push(Number.MAX_VALUE);
    });
  },
  destroyed() {
    //1.撤销监听图片加载
    this.$bus.$off("itemImgLoad", this.itemImgLoadListener);
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
      // console.log(this.recommends, "dataObj");
    },
    imgLoad() {
      // this.$refs.scroll.refresh();
      this.newRefresh();
      this.getThemeTopYs();
    },
    // 点击标题，滚动到对应主题
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index]);
    },
    // 内容滚动时候，
    contentScroll(position) {
      //1.对应主题标红

      //根据当前Y值比较
      const length = this.themeTopYs.length;
      //优化前：
      // for (let i = 0; i < length; i++) {
      //   if (
      //     // this.currentIndex !== i 这个条件为了，防止频繁判断
      //分开判断，防止数组越界
      //     this.currentIndex !== i &&
      //     (
      //       (i < length - 1 &&
      //       positionY >= this.themeTopYs[i] &&
      //       positionY < this.themeTopYs[i + 1])
      //        ||
      //       (i === length - 1 && positionY >= this.themeTopYs[i])
      //     )
      //   ) {
      //     this.currentIndex = i;
      //     this.$refs.nav.currentIndex = this.currentIndex;
      //   }
      // }

      //优化后：hack做法
      //length-1：this.themeTopYs增加了最大值属性，所以最后一个不需要循环
      const positionY = -position.y;
      for (let i = 0; i < length - 1; i++) {
        if (
          // this.currentIndex !== i 这个条件为了，防止频繁判断
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      //2.是否显示返回按钮
      this.listenBackTop(position);
    },
    //添加购物车
    addCart() {
      //1.获取购物车需要显示的信息
      const product = {};
      product.imge = this.topImages[0];
      product.title = this.goodInfo.title;
      product.desc = this.goodInfo.desc;
      product.price = this.goodInfo.lowPrice;
      product.iid = this.iid;
      //2.将商品放到购物车中 vueX
      this.$store.dispatch("addCartList", product);

      console.log(this.$store.state.cartList)
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
  /* 44px:头部顶烂   49px:底部购物车 */
  height: calc(100% - 44px - 49px);
}
</style>