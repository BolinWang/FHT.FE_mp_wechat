const app = getApp()
// basePath api请求路径
//测试
// const basePath = 'https://dev.mdguanjia.com/hms/api'
//线上

const basePath = 'https://api.mdguanjia.com/hms/api'
let version='1.0'
const fetch = (config) => {
  let defaultConfig = {
    // v: "1.0",
     timestamp: new Date().getTime(),
    //  reqId: "0010C2379272774D6EC087B917CE2A71438DEF90",
    // sign: "8F4C4A8E9D850EDD9692DE38723D0543"
    sessionId: wx.getStorageSync('sessionId'),
    hasPassword: wx.getStorageSync('hasPassword'),
    devId: 'h5',
    reqId: 'h5'
  }

  // wx.getSystemInfo({
  //   success: function (res) {
  //     defaultConfig.devId = res.model;
  //   },
  // })
  return  new Promise((resolve, reject) => {

    let that = this  //后面需要更改整合
    config.params= Object.assign(config.params, defaultConfig)
    let postData = {
      method: config.method,
      params: config.params,
      v: config.v||version
    }
    wx.request({
      url: basePath + config.url,
      data: postData,
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success:(res) => {
        if (res.data.code == 0) {
          resolve(res.data)
        } else if (res.data.code == 1016) {
          wx.removeStorageSync('hasPassword')
          wx.removeStorage({
            key: 'sessionId',
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
          reject(res.data)
        }
      },
      fail: (e) => {
        reject('网络出错')
      }
      
    })
  });
  // return promise
}

module.exports = fetch
