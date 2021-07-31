<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLenght }})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list />
    <!-- 底部按钮 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    ...mapGetters(["cartLenght"]),
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background: var(--color-tint);
  color: #fff;
}
</style>
