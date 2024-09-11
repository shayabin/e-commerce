//API接口统一管理
import requests from "./request";
import mockRequests from './mockAjax'

//三级联动的接口   
//  /api/product/getBaseCategoryList   get 无参数

export const reqCategoryList = ()=> requests({url:'/product/getBaseCategoryList',method:'get'})

//获取banner,Home轮播图接口
export const reqGetBannerList = ()=>mockRequests.get('/banner')

//获取搜索模块接口
// {
//     "category3Id":"61",
//     "categoryName":"手机",
//     "keyword":"小米",
//     "order":"1:desc",
//     "pageSize":10,
//     "props":["1:1700-2799:价格","2:6.65-6.74英寸:屏幕尺寸"],
//     "trademark":"4:小米"
// }
//当前接口，给服务器传递一个默认的参数至少是一个空对象
export const reqGetSearchInfo =(params)=>requests({
    url:"/list",
    method:"post",
    data:params
})

//获取商品详情分类的接口
export const reqGoodsInfo = (skuId)=>requests({
    url:`/item/${skuId}`,
    method:"get",
})

//将产品添加到购物车（获取更新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({
    url:`/cart/addToCart/${skuId}/${skuNum}`,
    method:"post"
})

//获取购物车列表的接口
export const reqCartList = ()=>requests({
    url:'/cart/cartList',
    method:'get'
})

//删除购物车商品的接口
export const reqDeleteCartById = (skuId) => requests({
    url:`/cart/deleteCart/${skuId}`,
    method:'delete'
})

//修改商品选中的状态
export const reqUpdateCheckedById = (skuId,isChecked)=>requests({
    url:`/cart/checkCart/${skuId}/${isChecked}`,
    method:'get'
})

//获取验证码
export const reqGetCode = (phone)=>requests({
    url:`/user/passport/sendCode/${phone}`,
    method:'get'
})

//注册
export const reqUserRegister = (data)=>requests({
    url:`/user/passport/register`,
    data,
    method:'post'
})

//登录
export const reqUserLogin = (data)=>requests({
    url:`/user/passport/login`,
    data,
    method:'post'
})

//获取用户信息（token）
export const reqUserInfo = () =>requests({
    url:'/user/passport/auth/getUserInfo',
    method:'get'
})

//退出登录
export const reqLogout = ()=>requests({
    url:'/user/passport/logout',
    method:'get'
})

//获取用户地址接口
export const reqAddressInfo = ()=>requests({
    url:'/user/userAddress/auth/findUserAddressList',
    method:'get'
})

//获取商品清单
export const reqOrderInfo = ()=>requests({
    url:'/order/auth/trade',
    method:'get'
})

//提交订单的接口
export const reqSubmitOrder = (tradeNo,data)=>requests({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method:'post'
})

//用订单号捞取支付信息
export const reqPayInfo = (orderId)=>requests({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'get'
})

//获取支付订单状态
export const reqPayStatus = (orderId)=>requests({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
})

//获取个人中心的数据
export const reqMyOrderList = (page,limit)=>requests({
    url:`/order/auth/${page}/${limit}`,
    method:'get'
})

