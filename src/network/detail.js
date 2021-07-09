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

export class Shop {
  constructor(shopInfo) {
    this.shopLogo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.cSells = shopInfo.cSells
    this.cGoods = shopInfo.cGoods
    this.score = shopInfo.score
    this.score.push({ "isBetter": true, "name": "价格合理", "score": "8.88" })
  }
}

export class GoodsParams {
  constructor(info, rule) {
    this.image = info.images ? info.images[0] : ''
    this.infos = Object.entries(info.set)
    this.sizes = rule.tables
  }
}