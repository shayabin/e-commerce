import Vue from 'vue'
import App from './App.vue'
//三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { Button,MessageBox } from 'element-ui'
//第一个参数：组件名 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
Vue.component(Button.name,Button)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
//引入路由
import router from '@/router'
//引入仓库
import store from '@/store'
//引入MockServe.js
import '@/mock/mockServe'
//引入swiper样式
import "swiper/css/swiper.css"
// //测试
// import {reqCategoryList} from '@/api'
// reqCategoryList()

//统一接口api文件夹里面全部请求函数
import * as API from '@/api'
// console.log(API);

import shenLi from '@/assets/1-removebg.png'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  //懒加载默认图片
  loading:shenLi
})

//引入自定义插件
import myPlugins from '@/plugins/myPlugins'
Vue.use(myPlugins,{
  name:'upper'
})

//引入表单校验插件
import '@/plugins/validate'

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  //配置全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  //注册路由
  router,
  //注册仓库
  store
}).$mount('#app')
