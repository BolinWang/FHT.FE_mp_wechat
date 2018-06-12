// pages/markTiger/markTiger.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    spiltRate: '',
    mobile: '',
    managerMobile: '',
    is_model_Hidden: true,
    is_model_title: '',
    is_model_Msg: ''
  },

  /**
   * 监听输入框
   */
  bindKeyInput(e) {
    let setObj = {}
    setObj[e.currentTarget.id] = e.detail.value
    this.setData(setObj)
  },

  /**
   * 标记飞虎队
   */
  markTiger() {
    if (!this.data.mobile) {
      wx.showToast({
        title: '请输入主账号手机号',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!this.data.managerMobile) {
      wx.showToast({
        title: '请输入城市管家手机号',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!app.validate.validateMobile(this.data.mobile) || !app.validate.validateMobile(this.data.managerMobile)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!this.data.spiltRate) {
      wx.showToast({
        title: '请输入出房服务费率',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    this.setData({
      'is_model_Hidden': false,
      'is_model_title': '信息无误',
      'is_model_Msg': '确认标记为飞虎队'
    })
  },

  /**
   * 标记成功跳转首页
   */
  navigateIndex() {
    app.fetch('market/apply', {
      method: 'initFlyOrg',
      params: {
        mobile: this.data.mobile,
        spiltRate: this.data.spiltRate
      }
    }).then((response) => {
      app.fetch('https://flying-api.mdguanjia.com/api/manager/addTempOrg', {
        orgId: response.orgId,
        orgName: response.orgName,
        orgMobile: this.data.mobile,
        managerMobile: this.data.managerMobile
      },{
        isFlying: true
      }).then((response) => {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.navigateBack()
        }, 1500)
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '标记为飞虎队'
    })
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