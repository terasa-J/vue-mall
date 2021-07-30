import { ADD_COUNTER, ADD_CART } from "./mutations-types"

export default {
  //{state, commit} =context : 是在context中解耦
  addCartList({ state, commit }, payload) {
    // addCartList(context, payload) {

    //逻辑：如果购物车已存在，则更新商品的count属性+1；不存在，则push进去，并初始化count=1

    //数组中find方法。如果iid一样，则返回item
    let oldProduct = state.cartList.find(item => item.iid === payload.iid)

    if (oldProduct) {
      commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      commit(ADD_CART, payload)
    }
  }
}