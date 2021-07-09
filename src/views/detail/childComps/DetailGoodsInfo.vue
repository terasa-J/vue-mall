<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>
    <div class="info-list">
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :src="item"
        :key="index"
        @load="imgLoad"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    detailInfo: {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.imageListLength = this.detailInfo.detailImage[0].list.length;
        }
      },
    },
  },
  data() {
    return {
      counter: 0,
      imageListLength: 0,
    };
  },
  methods: {
    imgLoad() {
      // 为了只触发一次，增肌判断逻辑
      if (++this.counter === this.imageListLength) {
        this.$emit("imgLoad");
      }
    },
  },
};
</script>
<style scoped>
.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}
.info-desc {
  margin: 0 20px;
}
.info-desc .start {
  width: 50px;
  /* border-radius: 50%; */
  border: 1px solid rgba(0, 0, 0, 1);
  /* border-left: 5px solid rgba(0, 0, 0, 1); */
  /* border-bottom: 1px solid rgba(0, 0, 0, 1); */
}

.info-desc .desc {
  margin: 20px;
}

.info-desc .end {
  width: 50px;
  border: 1px solid rgba(0, 0, 0, 1);
  float: right;
}

.info-key {
  margin: 20px;
  color: black;
}
.info-list img {
  width: 100%;
}
</style>