const mutations = {
    setIsLogin(state, payLoad) {
        state.user.isLogin = payLoad;
    },

    // 购物车数量变化的方法
    addCart(state, payLoad) {
        state.cartCount = payLoad.count
    }
}

export default mutations;