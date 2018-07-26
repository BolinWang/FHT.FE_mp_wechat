// pages/markTiger/markTiger.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    splitFee: '35',
    mobile: '',
    volumn: '',
    managerList: '',
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
    if (!this.data.index) {
      wx.showToast({
        title: '请选择城市管家',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!app.validate.validateMobile(this.data.mobile)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!this.data.splitFee) {
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
    app.fetch('market/audit', {
      method: 'markFlying',
      params: {
        mobile: this.data.mobile,
        splitFee: this.data.splitFee,
        id: this.data.managerList[this.data.index].id,
        volumn: this.data.volumn
      }
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
  },

  /**
   * 选择城市管家
   */
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '标记为飞虎队'
    })
    app.fetch('market/audit', {
      method: 'queryCityManager',
      params: {}
    }).then((response) => {
      response.map((item) => {
        item.nameAndMobile = `${item.name} ${item.mobile}`
      })
      this.setData({
        'managerList': response
      })
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