// pages/setPasword/setPasword.js
const app = getApp()
const Ajax = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password:null,
  },
  getPsd(e){
    this.setData({
      password: e.detail.value
    })
  },
   submit(){
     let that=this
     Ajax({
       url: '/customer',
       method: 'createLoginPassword',
       params: {
         password: that.data.password,
       },
     }).then(res => { 
       console.log(res)
        if(res.code==0){
          wx.setStorageSync('hasPassword', 'true')
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