// pages/roomSet/secondPage/secondPage.js
const app = getApp()
import { deepClone } from '../../../utils/util.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    steps: [{
      desc: '地址'
    },
      {
        desc: '户型'
      },
      {
        desc: '房间'
      }
    ],
    roomData: {},
    houseArea:'',
  },
  nextTepSecond(){
    this.room_hosting = this.selectComponent('#room_hosting');
    wx.nextTick(() => {
      console.log('sdfads')
      if (this.room_hosting.formValidate()) {
        this.setData({
          roomData: this.room_hosting.data.hostingRooms,
        })
        wx.navigateTo({
          url: '../surePage/surePage'
        })
      app.globalHouseData.hostingRooms = this.data.roomData
      }
    })
  },
  onLoad(){
    console.log('houseArea', app.globalHouseData.hostingInfo.houseArea)
    this.setData({
      houseArea: app.globalHouseData.hostingInfo.houseArea
    })
  }
})