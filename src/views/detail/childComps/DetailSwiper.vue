<template>
  <div>
    <swiper class="detail-swiper">
      <swiper-item v-for="(item,index) in topImages" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import Swiper from "components/common/swiper/Swiper.vue";
import SwiperItem from "components/common/swiper/SwiperItem.vue";
export default {
  components: { Swiper, SwiperItem },
  name: "Detailswiper",
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {};
  },

  methods: {},
};
</script>

<style lang="css" scoped>
.detail-swiper{
  height: 300px;
  overflow: hidden;
}
</style>