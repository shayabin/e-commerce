import { reqGetSearchInfo } from "@/api"
//search模块的小仓库
const state = {
    searchList:{}
}
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}
const actions = {
    async getSearchList({commit},params={}){ //若没传，就用空对象
        //调用前，至少传递一个空对象
        let result = await reqGetSearchInfo(params)
        if(result.code == 200){
            commit('GETSEARCHLIST',result.data)
        }
    }
}
//计算属性，为了简化数据
const getters = {
    //当前仓库的state，不是大仓库的state
    //如果网络不好，至少返回一个空数组
    goodsList(state){
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}