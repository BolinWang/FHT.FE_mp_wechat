//app.js
const defaultConfig = {
  version: "1.0",
  timestamp: new Date().getTime(),
  reqId: "0010C2379272774D6EC087B917CE2A71438DEF90",
  sign: "8F4C4A8E9D850EDD9692DE38723D0543"
}
const basePath = 'https://api.mdguanjia.com/bop/'
App({
  onLaunch: function () {
    // 判断sessionId跳过登录
    const _this = this
    wx.getStorage({
      key: 'BOP_ADMIN',
      success: function (res) {
        _this.globalData.sessionId = res.data
        wx.reLaunch({
          url: '/pages/index/index'
        })
      }
    })
  },
  validate: {
    validateMobile(str) {
      const reg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
      return reg.test(str);
    },
  },
  globalData: {
    userInfo: null,
    sessionId: ''
  },
  fetch: function (url, data) {
    wx.showLoading({
      title: '加载中',
    })
    const promise = new Promise((resolve, reject) => {
      let that = this
      let postData = Object.assign(data, defaultConfig)
      if (postData.method != 'login') {
        postData.sessionId = that.globalData.sessionId
      }
      wx.request({
        url: basePath + url,
        data: postData,
        method: 'POST',
        header: { 'content-type': 'application/json' },
        success: function (res) {
          setTimeout(function () {
            wx.hideLoading()
          }, 1000)
          if (res.data.code == 0) {
            resolve(res.data.data)
          } else if (res.data.code == 1016) {
            wx.removeStorage({
              key: 'BOP_ADMIN',
              success: function (res) {
                wx.reLaunch({
                  url: '/pages/login/login'
                })
              }
            })
          } else {
            wx.showToast({
              title: res.data.message || '网络异常',
              icon: 'none',
              duration: 2000
            })
            reject(res.data.message)
          }
        },
        error: function (e) {
          reject('网络出错')
        }
      })
    });
    return promise
  }
})