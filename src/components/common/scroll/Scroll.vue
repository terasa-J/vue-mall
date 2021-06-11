<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scrool: null,
    };
  },
  mounted() {
    console.log("我激活了");
    setTimeout(() => {
      this.scrool = new BScroll(this.$refs.wrapper, {
        click: true,
        // probeType: 3,
        // pullUpLoad: true,
      });
      console.log("可以加载拉");
    }, 5000);
  },
  methods: {
    /**
     * 定义防抖动函数，防止函数调用频繁，图片加载完成后，再进行重新计算高度的刷新
     */
    debounce(func, delay) {
      let timer;
      return function (...args) {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
      };
    },
  },
};
</script>
<style scoped>
</style>