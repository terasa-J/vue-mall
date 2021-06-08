import { request } from './index'

export function getHomeMulitdata() {
  return request({
    url: '/home/multidata'
  })
}