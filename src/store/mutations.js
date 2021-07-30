import { ADD_COUNTER, ADD_CART } from "./mutations-types"

export default {
  [ADD_COUNTER](state, payload) {
    payload.count += 1
  },
  [ADD_CART](state, payload) {
    state.cartList.push(payload)
  }
}