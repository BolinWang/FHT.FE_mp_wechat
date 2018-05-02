// pages/bindCard/bindCard.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    userName: '',
    userCardNo: '',
    is_model_Hidden: true,
    is_model_title: '',
    is_model_Msg: ''
  },

  /**
   * 监听输入框
   */
  bindKeyInput(e) {
    let setObj = {}
    const targetId = e.currentTarget.id
    if (targetId === 'userCardNo') {
      e.detail.value = e.detail.value.replace(/[\s]/g, '').replace(/(\d{4})(?=\d)/g, "$1 ")
    }
    setObj[targetId] = e.detail.value
    this.setData(setObj)
  },

  /**
   * 标记飞虎队
   */
  bindCard() {
    if (!this.data.mobile) {
      wx.showToast({
        title: '请输入主账号手机号',
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
    if (!this.data.userName) {
      wx.showToast({
        title: '请输入开户人姓名',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!this.data.userCardNo) {
      wx.showToast({
        title: '请输入银行卡号',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    this.setData({
      'is_model_Hidden': false,
      'is_model_title': '信息无误',
      'is_model_Msg': '确认绑定银行卡'
    })
  },

  /**
   * 绑定成功跳转首页
   */
  navigateIndex() {
    app.fetch('market/apply', {
      method: 'bindWithdrawCard',
      params: {
        mobile: this.data.mobile,
        userName: this.data.userName,
        userCardNo: this.data.userCardNo.replace(/ /g, "")
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '绑定银行卡'
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