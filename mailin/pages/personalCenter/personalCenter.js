// pages/personalCenter/personalCenter.js
const app = getApp()
import Ajax from '../../utils/api.js'
import { passwordHidden } from '../../utils/validate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hrefavatarUrl: '../../images/Group.svg',
    sessionId: null,
    vatarUrl:'',
    nickName: '',
    mobile: '',
    billCount: '', // 未处理账单数 
    financeOrderCount: ''  //未处理订单数 
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
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    this.getPersonal()
    this.getOrderNum()
  },
  //获取个人信息
  getPersonal(){
    let that = this
    Ajax({
      url: '/customer',
      method: 'getCustomerInfo',
      params: {
        sessionId: wx.getStorageSync('sessionId'),
        openId:null
      }
    }).then(res => {
      if (res.data.avatarUrl){
        this.setData({
          avatarUrl: res.data.avatarUrl
        })
      }
      this.setData({
        nickName: res.data.nickName ||'',
        mobile: passwordHidden(res.data.mobile),
      })
       wx.hideLoading()
    })

  },
  // 获取订单 / 账单数目
  getOrderNum () {
    let that = this
    Ajax({
      url: '/room',
      method: 'myHome',
      params: {
        sessionId: wx.getStorageSync('sessionId'),
        openId: null
      }
    }).then(res => {
      this.setData({
        billCount: res.data.unHandleOrder.billCount, // 未处理账单数 
        financeOrderCount: res.data.unHandleOrder.financeOrderCount  //未处理订单数 
      })
    })   
  },
  //退出
  dropOut(){
     wx.removeStorageSync('hasPassword')
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
    this.getPersonal()
    this.getOrderNum()
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