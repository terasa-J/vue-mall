import Vue from 'vue'
import Vuex from "vuex"

//抽取属性
import mutations from './mutations'
import actions from './actions'

//1.安装插件
Vue.use(Vuex)

const state = {
  //购物车对象
  cartList: []
}


//2.创建对象
const store = new Vuex.Store({
  state,
  // 里面的方法建议结构单一，可以抽取到actions中
  mutations,
  actions
})

//3.导出对象
export default store;