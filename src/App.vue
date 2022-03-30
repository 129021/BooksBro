<template>
  <!-- <router-view /> -->

  <router-view v-slot="{ Component }">
    <transition>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>

  <nav>
    <router-link to="/" class="tabbar-item">
      <div class="icon"><i class="iconfont icon-31shouye"></i></div>
      <div>首页</div>
    </router-link>
    <router-link to="/category" class="tabbar-item">
      <div class="icon"><i class="iconfont icon-fenlei"></i></div>
      <div>分类</div>
    </router-link>
    <router-link to="/shopcart" class="tabbar-item">
      <div class="icon">
        <van-badge :content="0" max="9">
          <i class="iconfont icon-gouwuche"></i>
        </van-badge>
      </div>
      <div>购物车</div></router-link
    >
    <router-link to="/profile" class="tabbar-item">
      <div class="icon"><i class="iconfont icon-yonghu-xianxing"></i></div>
      <div>我的</div></router-link
    >
  </nav>
</template>

<style >
@import "./assets/css/base.css";

/* 引入字体文件 */
@import "./assets/css/iconfont.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  background-color: #f6f6f6;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}

nav a {
  font-weight: bold;
  color: var(--color-text);
}

nav a.router-link-exact-active {
  color: #42b983;
}

nav .tabbar-item {
  flex: 1;
  text-align: center;
  height: 50px;
  font-size: var(--font-size);
}
.tabbar-item .icon {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: center;
  display: inline-block;
}
</style>
