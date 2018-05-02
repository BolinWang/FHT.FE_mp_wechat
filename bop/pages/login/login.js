// pages/login/login.js

const app = getApp()

Page({
  data: {
    mobile: '',
    password: ''
  },
  /**
   * 登录获取sessionId
   */
  getSessionId() {
    if (!this.data.mobile) {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!app.validate.validateMobile(this.data.mobile)) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!this.data.password) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    app.fetch('user', {
      method: 'login',
      params: {
        mobile: this.data.mobile,
        password: this.data.password
      }
    }).then((response) => {
      app.globalData.sessionId = response.sessionId
      wx.setStorage({
        key: "BOP_ADMIN",
        data: response.sessionId
      })
      wx.redirectTo({
        url: '../index/index'
      })
    })
  },

  /**
   * 监听输入框
   */
  bindKeyInput(e) {
    let setObj = {}
    setObj[e.currentTarget.id] = e.detail.value
    this.setData(setObj)
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '复恒运营小助手',
      path: '/pages/login/login',
      success: function (res) {

      },
      fail: function (res) {

      }
    }
  }
})