<script>
import { debounce } from "common/utils";

export default {
  data() {
    return {
      itemImgLoadListener: null,
      newRefresh: null,
    };
  },
  mounted() {
    //监听图片加载事件
    //由于放在create可能会存在拿不到dom元素，因此放在mounted中

    //为了减少函数的调用次数，这里使用防抖函数
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100);
    this.itemImgLoadListener = this.$bus.$on("itemImgLoad", () => {
      // this.$refs.scroll.refresh();
      // ...args的作用  refrsh("111","2222")
      this.newRefresh();
    });
  },
};
</script>