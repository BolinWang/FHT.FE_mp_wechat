// pages/roomSet/nextPage/nextPage.js
import { deepClone } from '../../../utils/util.js'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active:0,
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
    steps:[],
    houseData:{},
  },
  nextTepF(){
    this.house_hosting = this.selectComponent('#house_hosting');
    wx.nextTick(() => {
      if (this.house_hosting.formValidate()) {
        this.setData({
          houseData: this.house_hosting.data.hostingInfo
        })
        if (app.globalHouseData.houseRentType*1 === 1) {//整租
          wx.navigateTo({
            url: '../surePage/surePage',
          })
        }
        if (app.globalHouseData.houseRentType*1 === 2) { //合租
          wx.navigateTo({
            url: '../secondPage/secondPage',
          })
        }
        app.globalHouseData.hostingInfo = deepClone(this.house_hosting.data.hostingInfo)
      }
    })
    console.log(1111, app.globalHouseData.houseRentType)
  },
  onLoad:function(){
    if (app.globalHouseData.houseRentType*1 === 1){
      this.setData({
        steps: deepClone(this.data.steps1)
      })
    } else if (app.globalHouseData.houseRentType*1 === 2){
      this.setData({
        steps: deepClone(this.data.steps2)
      })
    }
  },
  onUnload(){
    wx.navigateBack({
      delta: 1
    })
  }
})