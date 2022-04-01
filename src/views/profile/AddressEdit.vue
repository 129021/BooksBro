<template>
  <nav-bar>
    <template v-slot:default> {{ title }} </template>
  </nav-bar>

  <!-- show-postal -->
  <!-- show-search-result
    :search-result="searchResult" -->
  <!-- @change-detail="onChangeDetail" -->
  <van-address-edit
    style="margin-top: 50px"
    :area-list="areaList"
    :address-info="addressInfo"
    :show-delete="type == 'edit'"
    show-set-default
    :area-columns-placeholder="['请选择', '请选择', '请选择']"
    @save="onSave"
    @delete="onDelete"
    :value="code"
  />

  <!-- <van-area title="标题" :area-list="areaList" /> -->
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { Toast } from "vant";

import { areaList } from "@vant/area-data";
import {
  addAddress,
  editAddress,
  deleteAddress,
  getAddressList,
  addAddressDetail,
} from "network/address";
import { reactive, onMounted, toRefs, computed } from "vue";
import { tdist } from "utils/address";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "AddressEdit",
  components: {
    NavBar,
  },
  setup() {
    const state = reactive({
      addressInfo: {},
      type: "add",
      addressId: "",
      title: "",
      code: "",
    });
    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      // 接收query传过来的参数
      const { type, addressId } = route.query;
      state.type = type;
      //   console.log(type);
      state.addressId = addressId;
      //   console.log(addressId);

      if (type == "edit") {
        addAddressDetail(addressId).then((res) => {
          //   console.log(res);
          const addressDetail = res.data;

          //   let _areaCode = "";
          //   let province = areaList.province_list;

          //   Object.entries(areaList.county_list).forEach(([id, text]) => {
          //     // 先找出当前对应的区
          //     if (text == addressDetail.county) {
          //       // 找到区对应的几个省份
          //       const provinceIndex = province.findIndex(
          //         (item) => item.id.substr(0, 2) == id.substr(0, 2)
          //       );
          //       // 找到区对应的几个市区
          //       // eslint-disable-next-line no-unused-vars
          //       const cityItem = Object.entries(areaList.city_list).filter(
          //         ([cityId, city]) => cityId.substr(0, 4) == id.substr(0, 4)
          //       )[0];
          //       // 对比找到的省份和接口返回的省份是否相等，因为有一些区会重名
          //       if (
          //         province[provinceIndex].text == addressDetail.province &&
          //         cityItem[1] == addressDetail.city
          //       ) {
          //         _areaCode = id;
          //       }
          //     }
          //   });

          state.addressInfo = {
            name: addressDetail.name,
            tel: addressDetail.phone,
            province: addressDetail.province,
            city: addressDetail.city,
            county: addressDetail.county,
            addressDetail: addressDetail.address,
            isDefault: !!addressDetail.is_default,
            // areaCode: _areaCode,
          };
        });
      }
    });

    const title = computed(() => {
      return state.type == "add" ? "添加地址" : "编辑地址";
    });
    const onSave = (content) => {
      //   console.log(content);
      const params = {
        name: content.name,
        address: content.addressDetail,
        phone: content.tel,
        province: content.province,
        city: content.city,
        county: content.county,
        is_default: content.isDefault ? 1 : 0,
      };

      if (state.type == "edit") {
        editAddress(state.addressId, params);
      } else if (state.type == "add") {
        addAddress(params);
      }

      // console.log(res);
      Toast.success("保存成功！");

      setTimeout(() => {
        router.back();
      }, 500);
    };
    const onDelete = () => {
      deleteAddress(state.addressId).then((res) => {
        // console.log(res);
        Toast.success("删除成功");
        setTimeout(() => {
          router.back();
        }, 500);
      });
    };
    // const onChangeDetail = (val) => {
    //   if (val) {
    //     searchResult.value = [
    //       {
    //         name: "黄龙万科中心",
    //         address: "杭州市西湖区",
    //       },
    //     ];
    //   } else {
    //     searchResult.value = [];
    //   }
    // };

    return {
      onSave,
      onDelete,

      areaList,
      ...toRefs(state),
      title,
    };
  },
};
</script>

<style >
.edit .van-field__body textarea {
  height: 26px !important;
}

.address-edit-box {
  margin-top: 44px;
}

.van-address-edit .van-button--danger {
  background: var(--color-tint);
  border-color: var(--color-tint);
  color: white;
}
.van-address-edit .van-switch--on {
  background: var(--color-tint);
}
</style>