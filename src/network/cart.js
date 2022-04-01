import {
    request
} from './request';

export function addCart(data) {
    return request({
        url: "/api/carts",
        method: 'post',
        data
    })
}

// data代表数量
export function modifyCart(id,data) {
    return request({
        url: `/api/carts/${id}`,
        method: 'put',
        data
    })
}

// 选择商品的状态,所有选中的id
export function checkedCart(data) {
    return request({
        url: "/api/carts/checked",
        method: 'patch',
        data
    })
}

// 获取购物车列表
export function getCart(data='') {
    return request({
        url: "/api/carts?"+data,
        method: 'get',
      
    })
}

// 删除购物车中的商品
export function deleteCartItem(id) {
    return request({
        url: `/api/carts/${id}`,
        method: 'delete',
    })
}