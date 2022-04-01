<template>
  <div>
    <nav-bar>
      <template v-slot:default> 商品详情:{{ id }} </template>
    </nav-bar>

    <van-image
      width="100%"
      lazy-load
      style="margin-top: 50px"
      :src="detail.cover_url"
    />

    <van-card
      style="text-align: left"
      :num="detail.stock"
      :price="detail.price + '.00'"
      :desc="detail.description"
      :title="detail.title"
    >
      <template #tags>
        <van-tag plain type="danger">热卖</van-tag>
        <van-tag plain type="danger">新书</van-tag>
      </template>
      <template #footer>
        <van-button type="warning" @click="handlerAddCart"
          >加入购物车</van-button
        >
        <van-button type="danger" @click="goToCart">立即购买</van-button>
      </template>
    </van-card>

    <van-tabs v-model:active="active">
      <van-tab title="概述">
        <div class="content" v-html="detail.details"></div>
      </van-tab>
      <van-tab title="评论"> </van-tab>
      <van-tab title="相关">
        <goods-list :goods="like_goods"></goods-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, reactive, toRefs } from "vue";
import { getDetail } from "network/detail";
import GoodsList from "components/content/goods/GoodsList";
import { addCart, getCart } from "network/cart";
import { Toast } from "vant";
import { useStore } from "vuex";
export default {
  name: "Detail",
  components: {
    NavBar,
    GoodsList,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    let id = ref(0);

    let book = reactive({
      detail: {},
      like_goods: [],
      comments: [],
    });

    let active = ref(1);

    onMounted(() => {
      id.value = route.query.id;

      // 获取商品详情信息
      getDetail(id.value).then((res) => {
        // console.log(res);
        book.detail = res.data.goods;
        book.like_goods = res.data.like_goods;
      });
    });

    // 添加购物车
    const handlerAddCart = () => {
      // console.log('add shopcart');
      addCart({ goods_id: book.detail.id, num: 1 }).then((res) => {
        // console.log(res);
        if (res.status == "201" || res.status == "204") {
          Toast.success("成功加入到购物车");
          store.dispatch("updateCart");
        }
      });
    };
    // 立即购买
    const goToCart = () => {
      // console.log('buy right now');
      addCart({ goods_id: book.detail.id, num: 1 }).then((res) => {
        // console.log(res);
        if (res.status == "201" || res.status == "204") {
          Toast.success("成功加入到购物车");
          store.dispatch("updateCart");

          // 跳转到购物车页面
          router.push({ path: "/shopcart" });
        }
      });
    };

    return {
      id,
      ...toRefs(book),
      active,
      handlerAddCart,
      goToCart,
    };
  },
};
</script>

<style scoped>
</style>

<style >
.content {
  padding: 10px;
}

.content img {
  max-width: 100%;
  height: auto;
}
</style>