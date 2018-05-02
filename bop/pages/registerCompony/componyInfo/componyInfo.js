// pages/registerCompony/componyInfo/componyInfo.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    mobile: '',
    is_model_Hidden: true,
    is_model_title: '',
    is_model_Msg: '',
    organizationStepOneVO: {}
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
   * 注册
   */
  registerPerson() {
    if (!this.data.name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!this.data.mobile) {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!app.validate.validateMobile(this.data.mobile)) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    app.fetch('market/organization', {
      method: 'saveOrg',
      params: JSON.stringify({
        organizationStepOneVO: {
          ...this.data.organizationStepOneVO,
          status: 1
        },
        organizationNewPermVO: {
          organizationPermTemplateId: this.data.organizationPermTemplateId
        },
        organizationNewUserVO: {
          mobile: this.data.mobile,
          name: this.data.name
        }
      })
    }).then((response) => {
      this.setData({
        'is_model_Hidden': false,
        'is_model_title': '账号注册成功！',
        'is_model_Msg': '初始密码为123456'
      })
    })
  },

  /**
   * 跳转首页
   */
  navigateIndex() {
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },

  /**
   * 获取企业模板ID
   */
  getTemplateId() {
    app.fetch('market/organization', {
      method: 'queryTemplateList',
      params: {}
    }).then((response) => {
      const filterArr = response.result.filter((item) => {
        return item.type === 2
      })
      let organizationPermTemplateId = filterArr[0].organizationPermTemplateId
      this.setData({
        'organizationPermTemplateId': organizationPermTemplateId
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTemplateId()
    this.setData({
      'organizationStepOneVO': JSON.parse(options.organizationStepOneVO)
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