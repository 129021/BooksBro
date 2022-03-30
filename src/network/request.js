import axios from 'axios';



export function request(config) {
    const instance = axios.create({
        baseURL: "https://api.shop.eduwork.cn",
        timeout: 5000,

    })


    // 请求拦截
    instance.interceptors.request.use(config => {
        // 如果有一些接口需要认证才可以访问，就在这统一设置

        // 直接放行
        return config;
    }, err => {

    })

    // 响应拦截
    instance.interceptors.response.use(res => {
        // console.log(res);
        return res
    }, err => {
        // 如果有需要授权才可以访问的接口，统一去login授权

        // 如果有错误，这里面会处理
    })


    return instance(config);
}