<template>
  <div class="back-top" @click="backTop"></div>
</template>

<script>
export default {
  name: "BackTop",

  setup(props, { emit }) {
    return {
      backTop: () => {
        emit("bTop");
      },
    };
  },
};
</script>

<style scoped>
.back-top {
  width: 35px;
  height: 35px;
  position: fixed;
  bottom: 80px;
  right: 30px;
  z-index: 20;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  background: url("~assets/images/up.png") no-repeat center center;
}
</style>