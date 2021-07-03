import { request } from './index'

export function getHomeMulitdata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/goods',
    params: {
      type,
      page
    }
  })
}