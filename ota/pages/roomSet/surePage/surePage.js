// pages/roomSet/surePage/surePage.js
const fetch = require('../../../utils/api.js')
import { deepClone } from '../../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    steps1: [{
      desc: '房间'
    },
    {
      desc: '价格'
    }
    ],
    steps2: [{
      desc: '地址'
    },
    {
      desc: '户型'
    },
    {
      desc: '房间'
    }
    ],
    steps: [],
    priceData:{},
    hostingInfo:{
    }
  },
  submitData(){
    this.house_price = this.selectComponent('#house_price')
    if (this.house_price.formValidate()) {
      this.setData({
        priceData: deepClone(this.house_price.data.roomPriceData),
        hostingInfo: Object.assign(this.data.hostingInfo, app.globalHouseData.hostingInfo)
      })
      let serviceData = this.house_price.data.serviceData
      if (app.globalHouseData.houseRentType * 1 === 1) {// 1整租 
        this.data.hostingInfo = Object.assign(this.data.hostingInfo, serviceData)
      } if (app.globalHouseData.houseRentType * 1 === 2) { //2 合租
        this.data.priceData = Object.assign(this.data.priceData, serviceData)
        this.data.hostingInfo.hostingRooms = deepClone(this.data.priceData)
      }
      this.setData({
        hostingInfo:this.data.hostingInfo
      })
      console.log('hostingInfo', this.data.hostingInfo)
      fetch('/', {
        "method": "completeHostingRoom",
        "params": {
          "id": '',
          "roomName": '',
          "hostingInfo": deepClone(this.data.hostingInfo)
        }
      }).then((res) => {

      })
    }
  },
  onLoad: function () {
    if (app.globalHouseData.houseRentType * 1 === 1) {
      this.setData({
        steps: deepClone(this.data.steps1)
      })
    } else if (app.globalHouseData.houseRentType * 1 === 2) {
      this.setData({
        steps: deepClone(this.data.steps2)
      })
    }
  }
})