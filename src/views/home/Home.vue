<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
    <!-- 吸顶效果 -->
    <tab-control
        class="tab-control-top"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControlTop"
        v-show="isOffsetTop"
      />

    <my-scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
      <recommond-view :recommends="recommends" />
      <feature-view />
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl"
      />
      <good-list :goods="currentGoodType" />
    </my-scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommondView from "./childComps/RecommondView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodList";
import MyScroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMulitdata, getHomeGoods } from "network/home";
import {
  mockPopGoods,
  mockNewGoods,
  mockSellGoods,
} from "common/mockData/goods";

import { debounce } from 'common/utils'

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommondView,
    FeatureView,

    NavBar,
    TabControl,
    GoodList,
    MyScroll,
    BackTop,
  },
  data() {
    return {
      banners: [
        {
          link: "https://image.baidu.com/",
          img: require("assets/img/home/1.jpg"),
        },
        {
          link: "https://image.baidu.com/",
          img: require("assets/img/home/2.jpg"),
        },
        {
          link: "https://image.baidu.com/",
          img: require("assets/img/home/3.jpg"),
        },
        {
          link: "https://image.baidu.com/",
          img: require("assets/img/home/4.jpg"),
        },
      ],
      recommends: [
        {
          link: "https://www.w3school.com.cn/",
          img: require("assets/img/home/recommend1.jpg"),
          title: "推荐1号",
        },
        {
          link: "https://www.w3school.com.cn/",
          img: require("assets/img/home/recommend2.jpg"),
          title: "推荐2号",
        },
        {
          link: "https://www.w3school.com.cn/",
          img: require("assets/img/home/recommend3.jpg"),
          title: "推荐3号",
        },
        {
          link: "https://www.w3school.com.cn/",
          img: require("assets/img/home/recommend4.jpg"),
          title: "推荐4号",
        },
      ],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      //获取吸顶距离
      tabControlOffSet: 0 ,
      //判断是否需要吸顶
      isOffsetTop:false,
      //记录滚动Y轴的位置
      scrollY:0,
    };
  },
  computed: {
    currentGoodType() {
      return this.goods[this.currentType].list;
    },
  },
  destroyed(){
    // console.log("hoem destroyed")
  },
  activated(){
    // console.log("hoem activated")
    this.$refs.scroll.scrollTo(0, this.scrollY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    this.scrollY = this.$refs.scroll.getScrollY()
    // console.log("hoem deactivated",this.scrollY)
  },
  created() {
    //网络不通，写mock数据
    // this.getHomeMulitdata();
    this.getHomeMockGoods("pop");
    this.getHomeMockGoods("new");
    this.getHomeMockGoods("sell");
  },
  mounted() {
    //监听图片加载事件
    //由于放在create可能会存在拿不到dom元素，因此放在mounted中

    //为了减少函数的调用次数，这里使用防抖函数
    const refrsh = debounce(this.$refs.scroll.refresh, 100)
    this.$bus.$on("goodImgLoad", () => {
      // this.$refs.scroll.refresh();
      // ...args的作用  refrsh("111","2222")
      refrsh()
    });
  },
  methods: {
    /**
     *  网络请求相关--无效
     */
    //初始化 banners、recommends
    getHomeMulitdata() {
      getHomeMulitdata()
        .then((res) => {
          console.log(res + "请求getHomeMulitdata");
        })
        .catch((err) => {
          console.log(err + "请求getHomeGoods");
        });

      getHomeGoods();
    },
    //初始化 流行、新款、精选
    // getHomeGoods(type) {
    //   getHomeGoods(type)
    //     .then((res) => {
    //       console.log(res + "请求getHomeGoods");
    //     })
    //     .catch((err) => {
    //       console.log(err + "请求getHomeGoods");
    //     });
    // },
    //获取mock数据
    getHomeMockGoods(type) {
      return new Promise((resolve, reject) => {
        switch (type) {
          case "pop":
            this.goods["pop"].list.push(...mockPopGoods().data);
            break;
          case "new":
            this.goods["new"].list.push(...mockNewGoods().data);
            break;
          case "sell":
            this.goods["sell"].list.push(...mockSellGoods().data);
            break;
        }
        resolve();
      });
    },
    /**
     * 事件监听类相关
     */
    //tab类型切换
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 由于吸顶有多个组件，这这里需要设置点击那个
      this.$refs.tabControl.currentIndex = index
      this.$refs.tabControlTop.currentIndex = index
    },
    //返回顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    //获取实时位置监听
    contentScroll(position) {
      //1.设置当前位置>500,显示backTop按钮
      this.isShowBackTop = -position.y > 500;

      //2.获取tabControl吸顶位置
      this.isOffsetTop = -position.y > this.tabControlOffSet
    },
    //加载到底部，刷新更多
    async loadMore() {
      await this.getHomeMockGoods(this.currentType).then(() => {
        this.$refs.scroll.finishPullUp();
      });
    },
    //吸顶距离判断
    swiperImgLoad(){
      //this.$refs.tabControl:获取到的是一个组件
      //this.$refs.tabControl.$el:获取到的是一个元素，可以获取相关的属性
      //offsetTop 指 obj 距离上方或上层控件的位置，整型，单位像素。
      this.tabControlOffSet = this.$refs.tabControl.$el.offsetTop
      // console.log(this.tabControlOffSet)
    }
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
/* 在better-scroll中无效，如果使用原生滚动，则有效 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

/* 在better-scroll中无效，如果使用原生滚动，则有效 */
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */

.tab-control-top{
  position: relative;
  z-index: 9;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* .content {
  overflow: hidden;
  height: calc(100% - 93px);
  margin-top: 44px;
} */
</style>
