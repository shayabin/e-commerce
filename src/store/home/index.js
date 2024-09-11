import {reqCategoryList, reqGetBannerList} from "@/api"
//home模块的小仓库
const state = {
    //根据接口返回值进行初始化，数组或对象
    categoryList:[],
    bannerList:[]
}
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    }
}
const actions = {
    //通过API接口函数，向服务器发请求，获取服务器数据
    async categoryList({commit}){
        let result = await reqCategoryList()
        if(result.code==200){
            commit("CATEGORYLIST",result.data)
        }
    },
    async getBannerList({commit}){
        let result = await reqGetBannerList();
        // console.log(result);
        if(result.code == 200){
            commit("GETBANNERLIST",result.data)
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}