// pages/personalCenter/personalCenter.js
const app = getApp()
import Ajax from '../../utils/api.js'
import { passwordHidden } from '../../utils/validate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hrefavatarUrl: '../../images/Group.jpg',
    sessionId: null,
    vatarUrl:'',
    nickName: '' ,
    mobile: '',
    billCount: '', // 未处理账单数 
    financeOrderCount: ''  //未处理订单数 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nickName:app.globalData.nickName || wx.getStorageSync('nickName')
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  //退出
  dropOut(){
    wx.removeStorageSync('hasPassword')
    wx.removeStorageSync('nickName')
    wx.removeStorage({
      key: 'sessionId',
      success: function (res) {
        wx.reLaunch({
          url: '/pages/login/login'
        })
      }
    })
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