import axios from './axios'

export const getMenu = (param) => {
    return axios.request({
        url: '/permission/getMenu',
        method: 'post',
        data: param
    })
}

export const getData = () => {
    return axios.request({
        url: '/home/getData',
        method: 'get'
    })
}

export const getUser = (params) => {
    return axios.request({
        url: '/user/getUser',
        method: 'get',
        params
    })
}

export const getOrders = (params) =>{
    return axios.request({
        url: '/order/getOrders',
        method: 'get',
        params
    })

}

export const getRequest= (params) =>{
    return axios.request({
        url: params.url,
        method: 'get',
        data:params.data,
    })

}
export const postRequest= (params) =>{
    return axios.request({
        url: params.url,
        method: 'post',
        data:params.data,
    })

}
