import {
    request
} from './request';


// 创建订单
export function createOrder(params) {
    return request({
        url: "/api/orders",
        method: 'post',
        params,
    })
}
// 获取订单预览
export function getOrderPreview() {
    return request({
        url: "/api/orders/preview",
        method: 'get',

    })
}
// 支付订单
export function payOrder(order, params) {
    return request({
        url: `/api/orders/${order}/pay`,
        method: 'get',
        params,
    })
}
// 查询支付状态
export function getPayStatus(order) {
    return request({
        url: `/api/orders/${order}/status`,
        method: 'get',

    })
}
// 获取订单列表 params:page, title,status,include
export function getOrderList(params) {
    return request({
        url: "/api/orders",
        method: 'get',
        params,
    })
}
// 订单详情params:include
export function getOrderDetail(order) {
    return request({
        url: `/api/orders/${order}`,
        method: 'get',
        params: {
            include: 'orderDetails.goods,address,user'
        }
    })
}


// 确认收货
// /api/orders/{order}/confirm
export function confirmOrder(order) {
    return request({
        url: `/api/orders/${order}/confirm`,
        method: 'patch',
    })
}

// 物流详情
export function expressDetail(order) {
    return request({
        url: `/api/orders/${order}/express`,
        method: 'get',
    })
}


