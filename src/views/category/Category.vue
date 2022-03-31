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
        />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { ref, reactive, onMounted, computed } from "vue";

import { getCategory, getCategoryGoods } from "network/category.js";

export default {
  name: "Category",
  components: {
    NavBar,
  },

  setup() {
    let active = ref(0);
    let categories = ref([]);
    let activeName = ref(1);
    let act = ref(1);
    let currentId = ref(0);

    let currentOrder = ref("sales");

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
    });

    // 排序选项卡
    const onClickTab = (index) => {
      let orders = ["sales", "price", "comments_count"];
      console.log("排序的序号：" + orders[index]);
      currentOrder.value = orders[index];

      getCategoryGoods(currentOrder.value, currentId.value).then((res) => {
        // console.log(res);
        goods[currentOrder.value].list = res.data.goods.data;
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