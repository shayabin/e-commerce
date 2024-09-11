import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from "@/api"
import {setToken,removeToken} from '@/utils/token'

//登录与注册的模块
const state = {
    code:'',
    // token:'',
    userInfo:{}
}
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    // USERLOGIN(state,token){
    //     state.token = token
    // },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    CLEAR(state){
        state.userInfo = {}
        removeToken()
    }
}
const actions = {
    //获取验证码
    async getCode({commit},phone){
        let result = await reqGetCode(phone)
        //console.log(result);
        //（以下操作一般不用）正常直接发送到用户手机，用户自己输入，这里省钱
        if(result.code == 200){
            commit("GETCODE",result.data)
            return 'OK'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user)
        console.log(result);
        if(result.code==200){
            return 'OK'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //用户登录
    async userLogin({commit},data){
        let result = await reqUserLogin(data)
        if(result.code==200){
            // commit("USERLOGIN",result.data.token)
            //持久化存储token
            // localStorage.setItem('TOKEN',result.data.token)
            setToken(result.data.token)
            return 'OK'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        // console.log(result)
        if(result.code == 200){
            commit('GETUSERINFO',result.data)
            return 'OK'
        }else{
            return Promise.reject(new Error('未登录（游客）'))
        }
    },
    //退出登录
    async userLogout({commit}){
        let result = await reqLogout()
        if(result.code == 200){
            commit('CLEAR')
            return 'OK'
        }else{
            return Promise.reject(new Error('退出登录失败'))
        }
    }
}
const getters = {}
export default{
    state,
    mutations,
    actions,
    getters
}