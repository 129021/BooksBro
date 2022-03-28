<template>
  <div>
    <nav-bar>
      <template v-slot:default> 图书兄弟 </template>
    </nav-bar>

    <div class="banners">
      <img src="~assets/images/1.png" alt="" />
    </div>

    <recommend :recommends="recommends"></recommend>

    <tab-control
      :titles="['畅销', '新书', '精选']"
      @tabClick="tabClick"
    ></tab-control>

  </div>
</template>

<script >
import NavBar from "components/common/navbar/NavBar";
import Recommend from "views/home/ChildComps/Recommend";
import TabControl from "components/content/tabControl/TabControl";

import { getHomeAllData } from "network/home";
import { onMounted, ref, reactive } from "vue";
export default {
  name: "Home",
  components: {
    NavBar,
    Recommend,
    TabControl,
  },

  setup() {
    const recommends = ref([]);
    // 临时变量
    let temid = ref(0);

    onMounted(() => {
      getHomeAllData().then((res) => {
        // console.log(res.data.goods);
        recommends.value = res.data.goods.data;
      });
    });

    const tabClick = (index) => {
      temid.value = index;
    };

    return {
      recommends,
      temid,
      tabClick,
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
</style>