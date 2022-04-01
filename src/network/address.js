import {request} from './request';


// 添加地址
export function addAddress(params){
    return request({
        url:"/api/address",
        method:'post',
        params,
    })
}

// 编辑地址
export function editAddress(id,parmas){
    return request({
        url:`/api/address/${id}`,
        method:'put',
        parmas,
    })
}

// 删除地址
export function deleteAddress(id){
    return request({
        url:`/api/address/${id}`,
        method:'delete',
   
    })
}

// 地址列表
export function getAddressList(){
    return request({
        url:"/api/address",
        method:'get',

    })
}


// 地址详情
export function addAddressDetail(id){
    return request({
        url:`/api/address/${id}`,
        method:'get',
      
    })
}