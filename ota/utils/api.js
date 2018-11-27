const defaultConfig = {
  version: "1.0.1",
  timestamp: new Date().getTime(),
  reqId: "wx_OTA",
  sign: "wx_OTA"
}
// basePath api请求路径

//测试
const basePath = 'https://test.mdguanjia.com/otastarter/'

// 线上
// const basePath = 'https://api.mdguanjia.com/otastarter'

const fetch = (url, data, params = {}) => {
  // wx.showLoading({
  //   title: '加载中',
  // })
  const promise = new Promise((resolve, reject) => {
    let that = this
    let postData = Object.assign(data, defaultConfig)
    // 登录不需要做sessionId鉴权
    if (postData.method !== 'login') {
      postData.sessionId = wx.getStorageSync('OTA_sessionId')
    }
    wx.request({
      url: basePath + url,
      data: postData,
      method: params.method || 'POST',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
        // 响应业务分析
        if (res.data.code == 0) {
          resolve(res.data.data)
        } else if (res.data.code == 1016) {
          wx.removeStorage({
            key: 'OTA_sessionId',
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
            duration: 3000
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

module.exports = fetch
