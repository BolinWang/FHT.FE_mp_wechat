// pages/login/login.js
const fetch = require('../../utils/api.js')
import { SHA2 } from '../../utils/shaEncrypt.js'
import { validateMobile } from '../../utils/validate.js'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      id: '0',
      title: '密码登录'
    }, {
      id: '1',
      title: '验证码登录'
    }],
    tabActive: '0',
    mobile: null,
    textTime: '获取验证码',
    codeDis: false,
    vcode: null,  //验证码
    password: null,
    username: null,
    activeInput: null
  },
  goLogin() {   //账号密码登陆
    if (!this.data.username) {
      wx.showToast({
        icon: 'none',
        title: '手机号不能为空',
      })
    } else if (!this.data.password) {
      wx.showToast({
        icon: 'none',
        title: '请输入密码',
      })
    } else if (!validateMobile(this.data.username)) {
      wx.showToast({
        icon: 'none',
        title: '手机号码格式不正确',
      })
    } else {
      this.submitLogin()
    }

  },
  submitLogin() {
    let that = this
    wx.redirectTo({
      url: '../personalCenter/personalCenter'
    })
    fetch('/customer',
     {
      method: 'loginByPassword',
      params: {
        username: that.data.username,
        password: SHA2(that.data.password)
      }
    },{
      method:'GET'
    }).then(res => {
      if (res.code == 0) {
        wx.showToast({
          icon: 'none',
          title: '登录成功',
        })
        wx.setStorage({
          key: 'MLZFUSERNAME',
          data: that.data.username,
        })
        wx.setStorageSync('OTA_sessionId', res.data.sessionId)
        app.globalData.sessionId = res.data.sessionId
        wx.redirectTo({
          url: '../personalCenter/personalCenter'
        })
      }
    })
  },
  // 获取手机号码
  getMobile(e) {
    this.setData({
      mobile: e.detail.value.replace(/\s+/g, '')
    })
  },
  getUsername(e) {
    this.setData({
      username: e.detail.value.replace(/\s+/g, '')
    })
  },
  //获取密码
  getPassword(e) {
    this.setData({
      password: e.detail.value.replace(/\s+/g, '')
    })
  },
  tapName(e) {
    const tabId = e.currentTarget.dataset.id;
    this.setData({
      tabActive: tabId
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