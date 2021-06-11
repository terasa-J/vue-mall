<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
    <my-scroll class="content" ref="scroll">
      <home-swiper :banners="banners" />
      <recommond-view :recommends="recommends" />
      <feature-view />
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      />
      <good-list :goods="currentGoodType"/>
    </my-scroll>
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

import { getHomeMulitdata, getHomeGoods } from "network/home";
import {
  mockPopGoods,
  mockNewGoods,
  mockSellGoods,
} from "common/mockData/goods";

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
    };
  },
  computed: {
    currentGoodType() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    //网络不通，写mock数据
    // this.getHomeMulitdata();
    this.getHomeMockGoods();
  },
  methods: {
    /**
     *  无效网络请求
     *  初始化 banners、recommends
     */
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

    /**
     *  初始化 流行、新款、精选
     */
    // getHomeGoods(type) {
    //   getHomeGoods(type)
    //     .then((res) => {
    //       console.log(res + "请求getHomeGoods");
    //     })
    //     .catch((err) => {
    //       console.log(err + "请求getHomeGoods");
    //     });
    // },
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
    },
    getHomeMockGoods() {
      this.goods["pop"].list.push(...mockPopGoods().data);
      this.goods["new"].list.push(...mockNewGoods().data);
      this.goods["sell"].list.push(...mockSellGoods().data);
    },
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
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
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
