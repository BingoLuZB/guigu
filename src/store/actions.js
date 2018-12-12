import {
  RECEIVE_ADDRESS,
  RECEIVE_FOODS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
}from './mutation-types'
import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo
} from "../api";
export default {
  //异步获取地址
  async getAddress ({commit,state}){
    const geohash = state.latitude + ',' + state.longitude;
    const res = await reqAddress(geohash);
    if(res.code == '0'){
      const address = res.data
      commit(RECEIVE_ADDRESS,{address})
    }
  },

  //异步获去食物列表
   async getFoods ({commit,state}){
    const res = await reqFoodCategorys();
    if(res.code == '0'){
      const foods = res.data
      commit(RECEIVE_FOODS,{foods})
    }
  },
  //异步获取商家列表
  //写法1
   async getShops ({commit,state}){
     const {longitude,latitude} = state;
    // const longitude = state.longitude
     const res = await reqShops(longitude,latitude);
     if(res.code == '0'){
      const shops = res.data
      commit(RECEIVE_SHOPS,{shops})
    }
  },
  //写法2
  // async getShops (obj){
  //   console.log(obj);
  //   const {longitude,latitude} = obj.state;
  //   // const longitude = state.longitude
  //   const res = await reqShops(longitude,latitude);
  //   if(res.code == '0'){
  //     const shops = res.data
  //     obj.commit(RECEIVE_SHOPS,{shops})
  //   }
  // },

  //同步存放用户信息
  saveUser({commit},userInfo){
    commit(RECEIVE_USER_INFO,{userInfo})
  },

  //异步从session获取用户信息
  // async getUserInfo({commit}){
  //   //   const res = await reqUserInfo()
  //   //   if(res.code === 0){
  //   //     const data = res.data
  //   //     commit(RESET_USER_INFO,{data})
  //   //   }
  //   // }

  //退出登录
  resetUserInfo({commit}){
    //现发送请求
    //请求成功的话
    commit(RESET_USER_INFO)
  }
}
