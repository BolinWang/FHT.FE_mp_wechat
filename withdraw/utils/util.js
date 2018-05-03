const BASEURL = 'https://api.mdguanjia.com/hms/api'
const fetch = function(config) {
  let defaultConfig = {
    devId: '5555998cccf2492db015c442f087f00a',
    sessionId: wx.getStorageSync('sessionId')
  };
  
  if (config || typeof config === 'object') {

    var objExp=new RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/)
    let postUrl = objExp.test(config.url) ? config.url : (BASEURL + config.url)

    if (config.params && typeof config.params === 'object') {
      config.params = Object.assign(config.params, defaultConfig)
    } else {
      config.params = JSON.parse(JSON.stringify(defaultConfig))
    }
    let postParam = {
      method: config.method,
      params: config.params
    }
    return new Promise((resolve,reject) => {
      wx.request({
        url: postUrl,
        method: 'POST',
        data: postParam,
        success (response){
          let res = response.data
          if (res.code != '0') {
            wx.showToast({
              title: res.message || '系统异常',
              icon: 'none'
            })
            reject(res)
          } else {
            resolve(res)
          }     
        },
        fail (res) {
          reject(res)
        }
      })
    
    })
  } else {
    return 
  }
  
  
}
module.exports = fetch


