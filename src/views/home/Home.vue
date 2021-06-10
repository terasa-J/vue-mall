<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommond-view :recommends="recommends"> </recommond-view>
    <feature-view></feature-view>
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
    ></tab-control>
    <good-list :goods="goods['pop'].list"></good-list>
    <div style="height: 800px">111</div>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommondView from "./childComps/RecommondView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodList"

import { getHomeMulitdata, getHomeGoods } from "network/home";
import { goodDataMock } from "common/mockData/goods"
export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommondView,
    FeatureView,

    NavBar,
    TabControl,
    GoodList,
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
      goods:{
        "pop":{page:0, list:[]},
        "new":{page:0, list:[]},
        "sell":{page:0, list:[]},
      }
    };
  },
  created() {
    //网络不通，写mock数据
    this.getHomeMulitdata();
    this.getHomeGoods('pop');
  },
  methods: {
    /**
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

        getHomeGoods()
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
    getHomeGoods(type) {
      const res = goodDataMock()
      this.goods[type].list.push(...res.data)
    },
    
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
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
}
</style>
