//引入mockjs
import Mock from 'mockjs'
//把JSON数据引入
//webpack默认暴露:JSON，图片
import banner from './banner.json'

//mock数据:
//第一个参数：请求地址
//第二个参数：请求的数据
Mock.mock("/mock/banner",{code:200,data:banner})
