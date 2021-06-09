<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommond-view :recommends="recommends"> </recommond-view>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommondView from "./childComps/RecommondView"

import { getHomeMulitdata } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommondView,
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
    };
  },
  created() {
    //网络不通，写mock数据
    getHomeMulitdata().then((res) => {
      console.log(res, "homeRes");
    });
  },
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
