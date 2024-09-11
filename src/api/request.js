//对axios进行二次封装
import axios from "axios"
//引入进度条
import nprogress from "nprogress"
//引入store
import store from '@/store'
//引入进度条样式
import "nprogress/nprogress.css"

//1:利用axios对象的 方法create,去创建一个axios实例
const requests = axios.create({
    //配置对象
    //路径出现api
    baseURL:"/api",
    timeout:5000,
})
//请求拦截器：发请求之前，可以进行操作
requests.interceptors.request.use((config)=>{
    if(store.state.detail.uuid_token){
        //给请求头添加一个字段
        config.headers.userTempId = store.state.detail.uuid_token
    }
    //携带token给服务器
    // if(store.state.user.token){
    //     config.headers.token = store.state.user.token
    // }
    let token = localStorage.getItem('TOKEN')
    if(token){
        config.headers.token = token
    }
    //config配置对象,内有headers
    nprogress.start()
    return config
})
//响应拦截器
requests.interceptors.response.use((res)=>{
    nprogress.done()
    return res.data
},(error)=>{
    return Promise.reject(new Error('faile'))
})


//对外暴露
export default requests