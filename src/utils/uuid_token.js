import {v4 as uuidv4} from 'uuid'
export const getUUID = ()=>{
    //看一看本地存储是否有
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    if(!uuid_token){
        //如果没有，生成一个游客临时身份
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
}