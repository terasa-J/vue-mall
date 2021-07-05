import { request } from './index.js'

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export class Goods {
  constructor(itemInfo, columns, services) {
    this.desc = itemInfo.desc
    this.highPrice = itemInfo.highNowPrice
    this.lowPrice = itemInfo.lowPrice
    this.discount = '特价'
    //销量、免邮费
    this.columns = columns
    this.columns.push({ name: 'cFav', desc: '收藏' + itemInfo.cFav })
    this.services = services
  }
}
