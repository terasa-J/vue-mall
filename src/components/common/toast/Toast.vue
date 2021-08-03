<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      isShow: false,
      message: "",
    };
  },
  methods: {
    show(message = "默认提示", duration = 2000) {
      // 显示提示
      this.isShow = true;
      this.message = message;
      // 隐藏提示
      setTimeout(() => {
        this.isShow = false;
      }, duration);
    },
  },
};
</script>
<style scoped>
.toast {
  /* 居中显示 */
  position: fixed;
  left: 50%;
  top: 50%;
  /* 偏移 */
  transform: translate(-50%, -50%);
  z-index: 999;
  padding: 8px 10px;
  color: #fff;
  background: rgba(0, 0, 0, 0.75);
}
</style>