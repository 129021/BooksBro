<template>
  <div class="home">
    {{ banner }}
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

import { getHomeAllData } from "@/network/home";

export default {
  name: "Home",

  setup() {
    // banner:ref([]);

    const banner = ref([]);

    onMounted(() => {
      console.log("123");
      getHomeAllData()
        .then((res) => {
          // console.log(banner);
          banner.value = res.data.slides;
        })
        .catch((err) => {});
      // console.log(banner);
    });
    return { banner };
  },
};
</script>


<style lang="css">
.h3 {
  color: var(--color-high-text);
}
</style>