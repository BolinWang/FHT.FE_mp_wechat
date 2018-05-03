//app.js
App({
  onLaunch: function () {
    
  },
  globalData: {
    sessionId: wx.getStorageSync('sessionId') || null
  }
})