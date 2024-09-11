import { reqCartList,reqDeleteCartById, reqUpdateCheckedById } from "@/api"

const state = {
    cartList:[]
}
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}
const actions = {
    //获取购物车列表数据
    async getCartList({commit}){
        let result = await reqCartList()
        if(result.code==200){
            commit("GETCARTLIST",result.data)
        }
    },
    //删除购物车某一个产品
    async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code == 200){
            return 'OK'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //修改购物车选中状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked)
        if(result.code == 200){
            return 'OK'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //删除全部勾选产品
    deleteAllCheckedCart({dispatch,getters}){
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item=>{
            let promise = item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):''
            //将返回Promise给数组
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    },
    //全选
    updateAllCartChecked({dispatch,getters},isChecked){
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(item=>{
            let promise =  dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}
const getters = {
    cartList(state){
        return state.cartList[0] || {}
    }
}

export default{
    state,
    mutations,
    actions,
    getters
}