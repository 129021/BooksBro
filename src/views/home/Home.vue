<template>
  <div id="home">
    <nav-bar>
      <template v-slot:default> 图书兄弟 </template>
    </nav-bar>

    <div class="wrapper">
      <div class="content">
        <div class="banners">
          <img src="~assets/images/1.png" alt="" />
        </div>

        <recommend :recommends="recommends"></recommend>

        <tab-control
          :titles="['畅销', '新书', '精选']"
          @tabClick="tabClick"
        ></tab-control>

        <GoodsList :goods="showGoods"></GoodsList>
      </div>
    </div>
  </div>
</template>

<script >
import NavBar from "components/common/navbar/NavBar";
import Recommend from "views/home/ChildComps/Recommend";
import TabControl from "components/content/tabControl/TabControl";

import { getHomeAllData, getHomeGoods } from "network/home";
import { onMounted, ref, reactive, computed } from "vue";
import GoodsList from "components/content/goods/GoodsList";

import BS from "better-scroll";

export default {
  name: "Home",
  components: {
    NavBar,
    Recommend,
    TabControl,
    GoodsList,
  },

  setup() {
    const recommends = ref([]);
    // 临时变量
    let temid = ref(0);

    // 商品列表数据的模型
    const goods = reactive({
      sales: { page: 0, list: [] },
      recommend: { page: 0, list: [] },
      new: { page: 0, list: [] },
    });

    let currentType = ref("sales");
    const showGoods = computed(() => {
      return goods[currentType.value].list;
    });

    onMounted(() => {
      getHomeAllData().then((res) => {
        // console.log(res.data.goods);
        recommends.value = res.data.goods.data;
      });

      getHomeGoods("sales").then((res) => {
        // console.log(res);
        goods.sales.list = res.data.goods.data;
      });

      getHomeGoods("recommend").then((res) => {
        // console.log(res);

        goods.recommend.list = res.data.goods.data;
      });

      getHomeGoods("new").then((res) => {
        // console.log(res);
        goods.new.list = res.data.goods.data;
      });

      // console.log(goods);

      // 创建better-scroll对象
      let bs = new BS(document.querySelector(".wrapper"),{
        probeType:3, //0,1,2,3只要在运动就触发scroll事件
        click:true,
      });
    });

    const tabClick = (index) => {
      temid.value = index;
      let types = ["sales", "new", "recommend"];
      currentType.value = types[index];
    };

    return {
      recommends,
      temid,
      tabClick,
      goods,
      showGoods,
    };
  },
};
</script>

<style scoped>
.banners img {
  width: 100%;
  height: auto;
  margin-top: 45px;
}

#home {
  height: 100vh;
  position: relative;
}

.wrapper {
  position: absolute;
  top: 45px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: hidden;
  /* background: red; */
}
</style>