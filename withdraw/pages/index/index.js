const util = require('../../utils/sha1.js')
const Ajax = require('../../utils/util.js')
let appInstance = getApp()
Page({
  data: {
    username: '',
    password: ""
  },
  onShareAppMessage (res) {
    return {
      imageUrl: '/images/share.png',
      path: '/pages/withdraw/withdraw',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  inputName(e) {
    this.setData({
      username: e.detail.value
    })
  },
  inputPsd(e) {
    this.setData({
      password: e.detail.value ? util.SHA2(e.detail.value) : ''
    })
  },
  //事件处理函数
  bindViewTap: function() { 
    wx.showLoading()
    Ajax({
      url: '/hmsuser',
      method: 'loginByPassword',
      params: {
        'userName': this.data.username,
        'password': this.data.password
      }
    }).then(res => {
      wx.setStorageSync('loginTime', new Date().getTime())
      wx.setStorageSync('sessionId',res.data.sessionId)
      wx.setStorageSync('userMobile',this.data.username)
      appInstance.globalData.sessionId = res.data.sessionId
      wx.redirectTo({
        url: '/pages/withdraw/withdraw'
      })   
      wx.hideLoading()
    }).catch(res => {
    })
  }
})
