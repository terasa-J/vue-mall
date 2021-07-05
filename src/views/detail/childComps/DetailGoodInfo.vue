<template>
  <div class="base-info" v-if="Object.keys(goodInfo).length > 0">
    <div class="info-desc">{{ goodInfo.desc }}</div>
    <div class="info-price">
      <span class="nowPrice">{{ goodInfo.lowPrice }}</span>
      <span class="highPrice">{{ goodInfo.highPrice }}</span>
      <span class="discount" v-if="goodInfo.discount">{{
        goodInfo.discount
      }}</span>
    </div>
    <div class="info-column">
      <span v-for="(item, index) in goodInfo.columns" :key="index">
        {{ item.desc }}
      </span>
    </div>
    <div class="info-service">
      <span
        class="info-service-item"
        v-for="index in goodInfo.services.length - 1"
        :key="index"
      >
        <img :src="goodInfo.services[index - 1].icon" alt="" />
        <span>{{ goodInfo.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodInfo",
  props: {
    goodInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style scoped>
.base-info {
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}
.info-desc {
  color: #222;
}
.info-price {
  margin-top: 10px;
}
.info-price .nowPrice {
  font-size: 24px;
  color: var(--color-high-text);
}
.info-price .highPrice {
  font-size: 13px;
  margin-left: 5px;
  text-decoration: line-through;
}
.info-price .discount {
  font-size: 12px;
  padding: 2px 5px;
  color: #fff;
  background-color: var(--color-high-text);
  border-radius: 8px;
  margin-left: 8px;

  /* 让元素上浮一些，使用相对定位 */
  position: relative;
  top: -5px;
}
.info-column {
  display: flex;
  justify-content: space-between;
  line-height: 30px;

  margin-top: 15px;
  font-size: 13px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.info-service {
  display: flex;
  justify-content: space-between;
  line-height: 50px;
}
.info-service-item img {
  width: 14px;
  /* position: relative; */
  /* top:-1px */
}
.info-service-item span {
  font-size: 13px;
  color: #333;
}
</style>