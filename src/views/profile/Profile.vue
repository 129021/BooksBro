<template>
  <div>
    <nav-bar>
      <template v-slot:default> 个人中心 </template>
    </nav-bar>

    <div style="margin: 50px; margin-top: 100px">
      <van-button round block color="red" @click="tologout"
        >退出登录</van-button
      >
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { logout } from "network/user";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import { useStore } from "vuex";
export default {
  name: "Profile",
  components: {
    NavBar,
  },

  setup() {
    const router = useRouter();
    const store = useStore();

    const tologout = () => {
      logout().then((res) => {
        if (res.status == "204") {
          Toast.success("退出成功！");

          // 清除window.localStroge中的token
          window.localStorage.setItem("token", "");

          store.commit("setIsLogin", false);

          setTimeout(() => {
            router.push({
              path: "/login",
            });
          }, 500);
        }
      });
    };

    return {
      tologout,
    };
  },
};
</script>

<style>
</style>