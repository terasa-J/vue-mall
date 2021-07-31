import { ADD_COUNTER, ADD_CART } from "./mutations-types"

export default {
  [ADD_COUNTER](state, payload) {
    payload.count += 1
  },
  [ADD_CART](state, payload) {
    // 加入购物车后，初始默认选中状态
    payload.checked = true
    state.cartList.push(payload)
  }
}