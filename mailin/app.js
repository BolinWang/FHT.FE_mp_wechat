//app.js
const Ajax = require('utils/api.js')
App({
  onShow: function () {
    // 启动的时候可以在这里判断登录状态
    this.globalData.sessionId = wx.getStorageSync('sessionId') || null
    this.globalData.openId = wx.getStorageSync('openId') || null
    this.globalData.hasPassword = wx.getStorageSync('hasPassword').toString() || null
    let that = this
    if (!this.globalData.openId){
      wx.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求
           console.log(res)
            Ajax ({
              url: '/payment',
              method:'openId',
              params: {
                code: res.code
              }
            }).then(response =>{
              that.globalData.openId = response.data.openid
              wx.setStorageSync('openId', response.data.openid)
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      });
    }
    //判断是否是第一次进来
    if (this.globalData.hasPassword === 'false') {
      wx.reLaunch({  //设置密码
        url: '/pages/setPasword/setPasword'
      })
    
    } else if (!this.globalData.sessionId){
      wx.reLaunch({    //前去登陆
        url: '/pages/login/login'
      })
    } else {
      wx.reLaunch({   //个人中心
        url: '/pages/personalCenter/personalCenter'
      })
    }
  },
  globalData: {
    /**
     * globalData 存放全局数据管理
     * @params sessionId 登录鉴权
     * @params userInfo 用户信息
     */
    sessionId: null ,
    userInfo: null,
    openId: null,
    hasPassword: null
  }
})

