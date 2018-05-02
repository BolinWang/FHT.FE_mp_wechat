//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {
      name: '用户'
    }
  },

  /**
   * 通过sessionId获取用户信息
   */
  getUseInfo() {
    app.fetch('user', {
      method: 'queryUserDetail',
      params: {}
    }).then((response) => {
      this.setData({
        'userInfo.name': response.name
      })
    })
  },
  
  /**
   * 退出登录
   */
  fedLoginout() {
    app.fetch('user', {
      method: 'logout',
      params: {}
    }).then((response) => {
      wx.removeStorage({
        key: 'BOP_ADMIN',
        success: function (res) {
          wx.reLaunch({
            url: '/pages/login/login'
          })
        }
      })
    })
  },

  /**
   * 跳转路由
   */
  navigateTo(e){
    const urlPath = e.currentTarget.dataset.path
    wx.navigateTo({
      url: `/pages/${urlPath}/${urlPath}`
    })
  },

  onLoad: function () {
    if (app.globalData.sessionId) {
      this.getUseInfo(app.globalData.sessionId)
    }
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
