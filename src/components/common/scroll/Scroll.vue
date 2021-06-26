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
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
      message: "hahah",
    };
  },
  mounted() {
    //1.创建scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      //控制div等类级标签能否点击。默认为false
      click: true,
      //设置为3，才能实时监听滚动位置
      probeType: this.probeType,
      //监听底部下拉加载
      pullUpLoad: this.pullUpLoad,
    });

    //2.监听实时滚动
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });

    //3.监听底部下拉加载
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
    scrollTo(x, y, time = 500) {
      // console.log(this.scroll)
      this.scroll.scrollTo(x, y, time);
    },
    //加载完毕一次后需要，调用次方法。否则无法进行再次加载
    finishPullUp(){
      this.scroll.finishPullUp();
    }
  },
};
</script>
<style scoped>
</style>