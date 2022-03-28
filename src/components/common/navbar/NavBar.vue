<template>
  <div class="nav-bar">
    <div class="left" @click="goback">
      <slot name="left">
        <img src="~assets/images/left.png" alt="" />
      </slot>
    </div>
    <div class="center">
      <slot>default</slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "NavBar",

  setup() {
    const router = useRouter();

    const goback = () => {
      //   console.log("goback");
      //   router.go(delta:-1);
      router.go(-1);
    };

    return {
      goback,
    };
  },
};
</script>

<style  scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
  height: 45px;
  line-height: 45px;
  text-align: center;
  box-shadow: 0 2px 0 rgba(100, 100, 100, 0.1);
  display: flex;
}

.left,
.right {
  width: 60px;
}

.left img {
  width: 45px;
  height: 45px;
  padding: 13px;
}
.nav-bar .center {
  flex: 1;
  /* background-color: red; */
}
</style>