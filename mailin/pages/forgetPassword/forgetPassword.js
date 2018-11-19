// pages/forgetPassword/forgetPassword.js
const Ajax = require('../../utils/api.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textTime: '获取验证码',
    codeDis: false,
    mobile:null,
    vcode:null,
    password:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  getMobile(e){
    this.setData({
      mobile: e.detail.value.replace(/\s+/g, '')
    })
  },
  //获取验证码
  getVcode(e){
    this.setData({
      vcode: e.detail.value.replace(/\s+/g, '')
    })
  },
  //获取密码
  getPassword(e){
    this.setData({
      password: e.detail.value.replace(/\s+/g, '')
    })
  },
  //重置密码
  submit(){
    let that = this
   Ajax({
     url: '/customer',
     method: 'forgetPassword',
     params: {
       mobile: that.data.mobile,
       vcode: that.data.vcode,
       password: that.data.password,
     },
   }).then(res => {
     if (res.code == 0) {

       wx.showToast({
         title: '密码找回成功',
         icon: 'none'
       })
       wx.setStorageSync('sessionId', res.data.sessionId)
       app.globalData.sessionId = res.data.sessionId
       wx.redirectTo({
         url: '../personalCenter/personalCenter'
       })
     }
     }).catch(res => {
     })
  },
  //发送验证码
  sendCode() {
   
    let that = this
    if (!that.data.mobile) {
      wx.showToast({
        title: '手机号码不能为空，请输入手机号码',
        icon: 'none'
      })
      return false
    }
    Ajax({
      url: '/customer',
      method: 'sendCheckcode',
      params: {
        mobile: that.data.mobile,
      },
    }).then(res => {
      if (res.code == 0) {
        wx.showToast({
          title: '短信验证码已发送',
          icon: 'none'
        })
        that.setData({
          phoneCode: "60's"
        })
        //验证倒计时 60s
        let phoneCode = '60'
        let time = setInterval(() => {
          phoneCode--
          that.setData({
            textTime: `${phoneCode}'s`,
            codeDis: true
          })
          if (phoneCode == 0) {
            clearInterval(time)
            that.setData({
              textTime: "重新发送验证码",
              codeDis: false
            })
          }
        }, 1000)
      } 

    }).catch(res => {
    })
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