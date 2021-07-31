<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :isChecked="isSelectAll" />
      <span>全选</span>
    </div>

    <div class="total-price">合计￥{{ totalPrice }}</div>

    <div class="calculate">去计算({{ checkedLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/common/checkButton/CheckButton";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        this.cartList
          // 过滤选中的商品
          .filter((item) => {
            return item.checked;
          })
          // 汇总价格
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          // 保留2位小数
          .toFixed(2)
      );
    },
    checkedLength() {
      return this.cartList.filter((item) => {
        return item.checked;
      }).length;
    },
    isSelectAll() {
      //逻辑： 如果有一个不选中，则返回false。反之为true
      // 1.先判空
      if (this.cartList.length === 0) {
        return false;
      }
      //2.检查元素，使用find高阶函数
      //this.cartList.find((item) => !item.checked)：返回一个item对象，这个商品为不选中（checked=false）
      // 如果有不选中的对象，则isSelectAll = false, 所以前面进行了取反
      // console.log(this.cartList.find((item) => !item.checked));
      return !this.cartList.find((item) => !item.checked);

      // 使用filter函数
      // return !this.cartList.filter((item) => !item.checked).length;
    },
  },
};
</script>
<style scoped>
.bottom-bar {
  display: flex;
  height: 40px;
  line-height: 40px;
  background: #eee;
  font-size: 14px;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.total-price {
  flex: 1;
  margin-left: 20px;
}

.calculate {
  width: 100px;
  text-align: center;
  color: #fff;
  background: orangered;
}
</style>