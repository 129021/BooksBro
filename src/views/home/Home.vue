<template>
  <div id="home">
    <nav-bar>
      <template v-slot:default> 图书兄弟 </template>
    </nav-bar>

    <tab-control
      :titles="['畅销', '新书', '精选']"
      @tabClick="tabClick"
      v-show="isTabFixed"
    ></tab-control>

    <div class="wrapper">
      <div class="content">
        <div ref="banref">
          <!-- <div class="banners">
            <img src="~assets/images/1.png" alt="" />
          </div> -->
          <home-swiper  :banners="banners">
          </home-swiper>

          <recommend :recommends="recommends"></recommend>
        </div>

        <tab-control
          :titles="['畅销', '新书', '精选']"
          @tabClick="tabClick"
        ></tab-control>

        <GoodsList :goods="showGoods"></GoodsList>
      </div>
    </div>

    <back-top v-show="isTabFixed" @bTop="bTop"></back-top>
  </div>
</template>

<script >
import NavBar from "components/common/navbar/NavBar";
import Recommend from "views/home/ChildComps/Recommend";
import TabControl from "components/content/tabControl/TabControl";
// 回到顶部
import BackTop from "components/common/backtop/BackTop";

import { getHomeAllData, getHomeGoods } from "network/home";
import { onMounted, ref, reactive, computed, watchEffect, nextTick } from "vue";
import GoodsList from "components/content/goods/GoodsList";

import BS from "better-scroll";

// 导入轮播图组件
import HomeSwiper from "views/home/HomeSwiper/HomeSwiper";

export default {
  name: "Home",
  components: {
    NavBar,
    Recommend,
    TabControl,
    GoodsList,
    BackTop,
    HomeSwiper,
  },

  methods: {},

  setup() {
    const recommends = ref([]);
    // 临时变量
    let temid = ref(0);

    // 商品列表数据的模型
    const goods = reactive({
      sales: { page: 1, list: [] },
      recommend: { page: 1, list: [] },
      new: { page: 1, list: [] },
    });

    let currentType = ref("sales");
    const showGoods = computed(() => {
      return goods[currentType.value].list;
    });

    let bs = reactive({});

    let isTabFixed = ref(false);

    // 获取banner和recommend的高度
    let banref = ref(null);

    // 轮播图数据
    let banners = ref([]);

    onMounted(() => {
      getHomeAllData().then((res) => {
        // console.log(res.data.goods);
        recommends.value = res.data.goods.data;

        banners.value = res.data.slides;
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
      bs = new BS(document.querySelector(".wrapper"), {
        probeType: 3, //0,1,2,3只要在运动就触发scroll事件
        click: true,
        pullUpLoad: true, //上拉加载更多
      });

      // 触发滚动事件
      bs.on("scroll", (position) => {
        // console.log('banner+recommend的高度是：'+banref.value.offsetHeight);
        // console.log(position.y);

        // isTabFixed.value,一定不能忘了value
        isTabFixed.value = -position.y > banref.value.offsetHeight;
      });

      // 上拉加载数据
      bs.on("pullingUp", () => {
        console.log("上拉加载更多...");

        // console.log(document.querySelector("content").clientHeight);

        const page = goods[currentType.value].page + 1;
        console.log("当前类型:" + currentType.value + "当前页：" + page);
        getHomeGoods(currentType.value, page).then((res) => {
          goods[currentType.value].list.push(...res.data.goods.data);
          goods[currentType.value].page += 1;
        });

        // 完成上拉，等数据请求完成，要将数据展示出来
        bs.finishPullUp();
        bs.refresh();
      });

      // nextTick(() => {
      //   // 重新计算高度
      //   bs && bs.refresh();
      // });
    });

    const tabClick = (index) => {
      temid.value = index;
      let types = ["sales", "new", "recommend"];
      currentType.value = types[index];

      nextTick(() => {
        // 重新计算高度
        bs && bs.refresh();
      });
    };

    // 监听：任何一个变量有变化
    watchEffect(() => {
      nextTick(() => {
        // 重新计算高度
        bs && bs.refresh();
      });
    });
    const bTop = () => {
      // console.log('click to top');
      bs.scrollTo(0, 0, 500);
    };

    return {
      recommends,
      temid,
      tabClick,
      goods,
      showGoods,
      isTabFixed,
      banref,
      bTop,
      banners,
      
    };
  },
};
</script>

<style scoped>
.banners img {
  width: 100%;
  height: auto;
  /* margin-top: 45px; */
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