<template>
  <van-swipe
    v-if="banners.length"
    class="my-swipe"
    :autoplay="3000"
    indicator-color="white"
  >
    <van-swipe-item v-for="(item, index) in banners" :key="index">
      <img class="bannerImg" v-lazy="item.img_url" alt="" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: "HomeSwiper",
  props: {
    banners: Array,
    default() {
      return [];
    },
  },
};
</script>

<style scoped>
/* .my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
} */

.bannerImg {
  width: 100%;
  height: 150px;
}
</style>