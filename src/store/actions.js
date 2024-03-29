import {
    getCart
} from 'network/cart';
const actions = {
    updateCart({
        commit
    }) {
        getCart().then(res => {
            // console.log(res);
            commit('addCart', {
                count: res.data.data.length||0
            })
        })
    }
}

export default actions;