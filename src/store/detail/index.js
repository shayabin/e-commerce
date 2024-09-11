import { reqGoodsInfo,reqAddOrUpdateShopCart } from "@/api"
import {getUUID} from '@/utils/uuid_token'
const state={
    goodInfo:{},
    //游客的临时身份
    uuid_token:getUUID()
}
const mutations={
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo
    //     console.log(goodInfo);
    }
}
const actions={
    //获取产品信息
    async getGoodInfo({commit},skuid){
        let result = await reqGoodsInfo(skuid)
        if(result.code == 200){
            commit('GETGOODINFO',result.data)
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart(commit,{skuId,skuNum}){
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        //当前函数如果执行，返回promise
        if(result.code == 200){
            return "OK"
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters={
    //路径导航简化的数据
    categoryView(state){
        //初始是空对象，拿不到数据
        return state.goodInfo.categoryView || {}
    },
    //简化产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    //产品的售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }
}
export default{
    state,
    mutations,
    actions,
    getters
}