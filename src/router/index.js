//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
//使用插件
Vue.use(VueRouter)
//store
import store from '@/store'

//先把VueRouter原型对象的push|replace,先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//重写push|replace
//第一个参数：告诉原来push方法，往哪里跳
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }  
}

//配置路由
let router = new VueRouter({
    //配置路由
    routes,
    scrollBehavior (to, from, savePosition){
        //返回的y代表滚动条在跳转后的最上端
        return {y:0}
    }
})

//全局守卫
router.beforeEach(async(to,from,next)=>{
    let token = localStorage.getItem('TOKEN')
    let name = store.state.user.userInfo.name

    if(token){
        //已登录不能去login
        if(to.path == '/login'){
            next('/')
        }else{
            if(name){
                next()
            }else{
                try{
                    await store.dispatch('getUserInfo')
                    next()
                }catch(error){
                    console.log(error.message);
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    }else{
        if(to.path.indexOf('/trade') != -1 || to.path.indexOf('/pay') != -1 || to.path.indexOf('/center') != -1)
            next('/login?redirect='+to.path)
        else
            next()
    }
})

export default router