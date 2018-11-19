// pages/setPasword/setPasword.js
const app = getApp()
const Ajax = require('../../utils/api.js')
import { SHA2 } from '../../utils/shaEncrypt.js'
import { validatePas } from '../../utils/validate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password:null,
    username:""
  },
  getPsd(e){
    this.setData({
      password: e.detail.value.replace(/\s+/g, '')
    })
  },
   submit(){
     let that=this
     wx.getStorage({
       key: 'MLZFUSERNAME',
       success: (res) => {
         this.setData({
           username: res.data
         })
       }
     })
     if (!validatePas(that.data.password)) {
       wx.showToast({
         icon: 'none',
         title: '密码格式不正确(6-12位)',
       })
       return false
     }
     Ajax({
       url: '/hmsuser',
       method: 'beforeLoginModifyPassword',
       v: '1.2',
       params: {
         userName: that.data.username,
         newPassword: that.data.password,
         oldPassword: SHA2(wx.getStorageSync('oldPassword'))
       },
     }).then(res => { 
        if(res.code==0){
          wx.setStorageSync('hasPassword', 'true')
          wx.setStorageSync('sessionId', res.data.sessionId)
          wx.setStorageSync('nickName', res.data.name)
          app.globalData.nickName = res.data.name
          app.globalData.hasPassword = res.data.sessionId
          wx.redirectTo({
            url: '../personalCenter/personalCenter',
          })
        }
     })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})