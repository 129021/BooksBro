<template>
  <nav-bar>
    <template v-slot:default> 商品分类 </template>
  </nav-bar>

  <div id="mainbox">
    <div class="ordertab">
      <van-tabs v-model:active="act" @click="onClickTab">
        <van-tab title="销量排序"></van-tab>
        <van-tab title="价格排序"></van-tab>
        <van-tab title="评论排序"></van-tab>
      </van-tabs>
    </div>

    <van-sidebar v-model="active" class="leftmenu">
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item
          v-for="(item, index) in categories"
          key="item.id"
          :title="item.name"
          :name="item.name"
        >
          <van-sidebar-item
            v-for="child in item.children"
            :key="child.id"
            :title="child.name"
            @click="getGoods(child.id)"
          />
        </van-collapse-item>
      </van-collapse>
    </van-sidebar>

    <div class="goodslist">
      <div class="content">
        <van-card
          :num="item.comments_count"
          :tag="item.comments_count > 0 ? '热卖' : '新品'"
          :price="item.price"
          :desc="item.updated_at"
          :title="item.title"
          :thumb="item.cover_url"
          :lazy-load="true"
          v-for="item in showGoods"
          :key="item.id"
          @click="itemClick(item.id)"
        />
      </div>
    </div>

    <back-top v-show="isTabFixed" @bTop="bTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { ref, reactive, onMounted, computed, watchEffect, nextTick } from "vue";

import { getCategory, getCategoryGoods } from "network/category.js";

import BScroll from "better-scroll";

import BackTop from "components/common/backtop/BackTop";

import { useRouter } from "vue-router";
export default {
  name: "Category",
  components: {
    NavBar,
    BackTop,
  },

  setup() {
    let active = ref(0);
    let categories = ref([]);
    let activeName = ref(1);
    let act = ref(1);
    let currentId = ref(0);

    let currentOrder = ref("sales");

    let bs = reactive({});

    // 显示返回按钮的变量
    let isTabFixed = ref(false);

    const router = useRouter();

    const goods = reactive({
      sales: { page: 1, list: [] },
      price: { page: 1, list: [] },
      comments_count: { page: 1, list: [] },
    });

    // 显示的goodslist
    const showGoods = computed(() => {
      return goods[currentOrder.value].list;
    });

    const init = () => {
      getCategoryGoods("sales", currentId.value).then((res) => {
        console.log(res);
        goods.sales.list = res.data.goods.data;
      });

      getCategoryGoods("price", currentId.value).then((res) => {
        // console.log(res);
        goods.price.list = res.data.goods.data;
      });

      getCategoryGoods("comments_count", currentId.value).then((res) => {
        // console.log(res);
        goods.comments_count.list = res.data.goods.data;
      });
    };

    onMounted(() => {
      getCategory().then((res) => {
        // console.log(res);
        categories.value = res.data.categories;
      });

      init();

      bs = new BScroll(document.querySelector(".goodslist"), {
        probeType: 3, //0,1,2,3只要在运动就触发scroll事件
        click: true,
        pullUpLoad: true, //上拉加载更多
      });

      // 注册滚动事件
      bs.on("scroll", (position) => {
        // console.log('banner+recommend的高度是：'+banref.value.offsetHeight);
        // console.log(position.y);

        // isTabFixed.value,一定不能忘了value
        isTabFixed.value = -position.y > 300;
      });

      // 上拉加载更多
      bs.on("pullingUp", () => {
        console.log("上拉加载更多...");

        const page = goods[currentOrder.value].page + 1;

        getCategoryGoods(currentOrder.value, currentId.value).then((res) => {
          // console.log(res);
          goods[currentOrder.value].list.push(...res.data.goods.data);
          goods[currentOrder.value].page += 1;

          bs && bs.refresh();
        });
        // console.log(document.querySelector("content").clientHeight);

        // 完成上拉，等数据请求完成，要将数据展示出来
        bs.finishPullUp();
        bs.refresh();
      });
    });

    // 排序选项卡
    const onClickTab = (index) => {
      let orders = ["sales", "price", "comments_count"];
      console.log("排序的序号：" + orders[index]);
      currentOrder.value = orders[index];

      getCategoryGoods(currentOrder.value, currentId.value).then((res) => {
        // console.log(res);
        goods[currentOrder.value].list = res.data.goods.data;

        bs && bs.refresh();
      });
    };

    // 通过分类得到get商品

    const getGoods = (cid) => {
      currentId.value = cid;
      // console.log(cid);
      console.log(currentId.value);
      // init();
      getCategoryGoods(currentOrder.value, currentId.value).then((res) => {
        // console.log(res);
        goods[currentOrder.value].list = res.data.goods.data;
      });

      bs && bs.refresh();
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
    const itemClick = (id) => {
      router.push({ path: "/detail", query: { id } });
    };

    return {
      active,
      categories,
      activeName,
      act,
      onClickTab,
      currentOrder,
      getGoods,
      currentId,
      goods,
      showGoods,
      init,
      bs,
      isTabFixed,
      bTop,
      itemClick,
    };
  },
};
</script>


<style scoped >
#mainbox {
  display: flex;
  margin-top: 45px;
}

.ordertab {
  height: 50px;
  position: fixed;
  top: 45px;
  left: 130px;
  right: 0;
  z-index: 1000;
}

.leftmenu {
  width: 130px;

  background-color: green;
  position: fixed;
  top: 95px;
}

.goodslist {
  flex: 1;
  position: absolute;
  top: 94px;
  left: 130px;
  right: 0;
  height: 100vh;
  padding: 0 10px;
}
</style>

<style >
.van-card__content {
  text-align: left;
}

.van-card__thumb {
  width: 68px;
}

.van-image {
  width: 68px;
}
.van-image__img {
  width: 68px;
}
</style>