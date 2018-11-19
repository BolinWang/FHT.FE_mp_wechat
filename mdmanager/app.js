//app.js
const Ajax = require('utils/api.js')
App({
  onLaunch: function () {
    // 启动的时候在这里判断登录状态
    this.globalData.sessionId = wx.getStorageSync('sessionId') || null
    this.globalData.openId = wx.getStorageSync('openId') || null
    this.globalData.hasPassword = wx.getStorageSync('hasPassword').toString() || null
    //判断是否是第一次进来
    if (this.globalData.hasPassword === 'false') {
      wx.reLaunch({  //设置密码
        url: '/pages/setPasword/setPasword'
      })

    } else if (!this.globalData.sessionId) {
      wx.reLaunch({    //前去登陆
        url: '/pages/login/login'
      })
    } else {
      // wx.reLaunch({   //个人中心
      //   url: '/pages/personalCenter/personalCenter'
      // })
    }
  },
  globalData: {
    /**
     * globalData 存放全局数据管理
     * @params sessionId 登录鉴权
     * @params userInfo 用户信息
     */
    nickName:'',
    sessionId: null,
    userInfo: null,
    openId: null,
    hasPassword: null
  }
})

