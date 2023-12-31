import axios from './axios'
/**
已提交,等待调度 100
已调度,缺货中 110
中心库房采购中  111
中心库房有货物,正在送往分站库房  112
已调度,订单进行中  120
商品已经就绪,等待发出 121
退货商品取回中  122
投递员已领货,任务配送中  130
已完成 140
已退订 141
失败150
购买订单(直接付款型)310
购买订单(货到付款型)311
退货订单 320
换货订单 330
其他订单 340
缺货中   200
中心库房采购中  201
中心库房有货物,正在送往分站库房   202
商品已经就绪,等待分配  210
商品已经就绪,等待发出  211
任务执行中   220
投递员已领货,任务配送中  221
退货商品取回中   222
已完成  230
退订中止 231
失败 240
任务单类型
配送任务(直接付款型) 410
配送任务(货到付款型)  411
配送任务(退货取货) 420
配送任务(换货型)  430
其他任务 440
 */
const numMap = new Map([
    [100, "已提交,等待调度"],
    [110,"已调度,缺货中"],
    [111,"中心库房采购中"],
    [112, "中心库房有货物,正在送往分站库房"],
    [120,"已调度,订单进行中"],
    [121,"商品已经就绪,等待发出"],
    [122,"退货商品取回中"],
    [130,"投递员已领货,任务配送中"],
    [140,"已完成"],
    [141,"已退订"],
    [150,"失败"],
    [310,"购买订单(直接付款型)"],
    [311,"购买订单(货到付款型)"],
    [320,"退货订单"],
    [330,"换货订单"],
    [340,"其他订单"],
    [200,"缺货中"],
    [201,"中心库房采购中"],
    [202,"中心库房有货物,正在送往分站库房"],
    [210,"商品已经就绪,等待分配"],
    [211,"商品已经就绪,等待发出"],
    [220,"任务执行中"],
    [221,"投递员已领货,任务配送中"],
    [222,"退货商品取回中"],
    [230,"已完成"],
    [231,"退订中止"],
    [240,"失败"],
    [410,"配送任务(直接付款型)"],
    [411,"配送任务(货到付款型)"],
    [420,"配送任务(退货取货)"],
    [430,"配送任务(换货型)"],
    [440,"其他任务"],
    [10,"中心库房"],
    [11,"分站库房"],
    [30,"等待确认"],
    [31,"完成"],
    [32,"其他"],
    [41,"货到付款"],
    [40,"先付后到 "],
    [51,"是"],
    [50,"否"],
    [0,"中心库房"],
    [1,"第一分站"],
    [20,"调度(正常订单)"],
    [21,"调度(换货订单)"],
    [22,"退货"],
    [32,"其他"],
    ]
);

const stringMap = new Map(
    [
        [ "已提交,等待调度",100],
        ["已调度,缺货中",110],
        ["中心库房采购中",111],
        ["中心库房有货物,正在送往分站库房",112],
        ["已调度,订单进行中",120],
        ["商品已经就绪,等待发出",121],
        ["退货商品取回中",122],
        ["投递员已领货,任务配送中",130],
        ["已完成",140],
        ["已退订",141],
        ["失败",150],
        ["购买订单(直接付款型)",310],
        ["购买订单(货到付款型)",311],
        ["退货订单",320],
        ["换货订单",330],
        ["其他订单",340],
        ["缺货中",200],
        ["中心库房采购中",201],
        ["中心库房有货物,正在送往分站库房",202],
        ["商品已经就绪,等待分配",210],
        ["商品已经就绪,等待发出",211],
        ["任务执行中",220],
        ["投递员已领货,任务配送中",221],
        ["退货商品取回中",222],
        ["已完成",230],
        ["退订中止",231],
        ["失败",240],
        ["配送任务(直接付款型)",410],
        ["配送任务(货到付款型)",411],
        ["配送任务(退货取货)",420],
        ["配送任务(换货型)",430],
        ["其他任务",440],
        ["中心库房",10],
        ["分站库房",11],
        ["等待确认",30],
        ["完成",31],
        ["其他",32],
        ["货到付款",41],
        ["先付后到 ",40],
        ["是",51],
        ["否",50],
        ["调度(正常订单)",20],
        ["调度(换货订单)",21],
        ["退货",22],
        ["其他",32],
    ]
);
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


export const paramToString =(param)=>{
    if (numMap.has(param)){
        return numMap.get(param)
    }else {
        return param
    }

}

export const stringToParam=(string)=> {

    if (stringMap.has(string)){
        return stringMap.get(string)
    }else {
        return string
    }
}