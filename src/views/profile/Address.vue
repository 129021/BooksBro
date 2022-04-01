<template>
  <div class="address-box">
    <nav-bar>
      <template v-slot:default> 地址管理 </template>
    </nav-bar>

    <!-- disabled-text="以下地址超出配送范围" -->
    <!-- :disabled-list="disabledList" -->
    <van-address-list
      style="padding-top: 50px"
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { reactive, ref, onMounted, toRefs } from "vue";
import { Toast } from "vant";
import { useRouter, useRoute } from "vue-router";
import { getAddressList } from "network/address";

export default {
  name: "Address",
  components: {
    NavBar,
  },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      chosenAddressId: "1",
      list: [],
    });

    onMounted(() => {
      getAddressList().then((res) => {
        // console.log(res);
        if (res.data.data.length == 0) {
          state.list = [];
          return;
        }
        state.list = res.data.data.map((item) => {
          return {
            id: item.id,
            name: item.name,
            tel: item.phone,
            address: `${item.province} ${item.city} ${item.county} ${item.address}`,
            isDefault: !!item.is_default,
          };
        });
      });
    });

    const onAdd = () => {
      router.push({ path: "/addressedit", query: { type: "add" } });
    };
    const onEdit = (item) => {
      router.push({
        path: "/addressedit",
        query: { type: "edit", addressId: item.id },
      });
    };

    return {
      onAdd,
      onEdit,
      ...toRefs(state),
    };
  },
};
</script>

<style scoped>
.address-box {
  height: 300px;
}

.address-item {
  margin-top: 45px;
}
</style>
<style >
.van-radio__icon {
  display: none;
}
.van-button {
  background: var(--color-tint);
  border-color: var(--color-tint);
}
.van-address-list__bottom {
  bottom: 100px;
  background: white;
}
van-address-list {
  border: none;
}
</style>

