// pages/bindCard/bindCard.js
const app = getApp()
const defaultBankMap = [
  { value: "01000000", name: "邮储银行" },
  { value: "01020000", name: "工商银行" },
  { value: "01030000", name: "农业银行" },
  { value: "01040000", name: "中国银行" },
  { value: "01050000", name: "建设银行" },
  { value: "03010000", name: "交通银行" },
  { value: "03020000", name: "中信银行" },
  { value: "03030000", name: "光大银行" },
  { value: "03040000", name: "华夏银行" },
  { value: "03050000", name: "民生银行" },
  { value: "03060000", name: "广发银行" },
  { value: "03070000", name: "平安银行" },
  { value: "03080000", name: "招商银行" },
  { value: "03090000", name: "兴业银行" },
  { value: "03100000", name: "浦发银行" },
  { value: "03160000", name: "浙商银行" },
  { value: "04012900", name: "上海银行" },
  { value: "04031000", name: "北京银行" },
  { value: "04083320", name: "宁波银行" },
  { value: "04233310", name: "杭州银行" },
  { value: "04256020", name: "东莞银行" },
  { value: "04375850", name: "珠海华润" },
  { value: "04791920", name: "包商银行" },
  { value: "05083000", name: "江苏银行" },
  { value: "64135810", name: "广州银行" },
  { value: "64895910", name: "广东南粤" }
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobileInput: true,
    queryData: {
      orgId: '',
      mobile: '',
      name: '',
      idNo: '',
      accountName: '',
      accountIdNo: '',
      cardNo: ''
    },
    index: '0',
    bankIndex: '',
    cardTypeList: [
      {name: '个人账户', value: 1},
      {name: '对公账户', value: 3}
    ],
    bankList: defaultBankMap,
    is_model_Hidden: true,
    is_model_title: '',
    is_model_Msg: ''
  },

  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      bankIndex: ''
    })
  },
  bankChange: function (e) {
    this.setData({
      bankIndex: e.detail.value
    })
  },

  /**
   * 监听输入框
   */
  bindKeyInput(e) {
    const targetId = e.currentTarget.id
    // if (targetId === 'cardNo') {
    //   e.detail.value = e.detail.value.replace(/[\s]/g, '').replace(/(\d{4})(?=\d)/g, "$1 ")
    // }
    this.data.queryData[targetId] = e.detail.value
    this.setData(this.data.queryData)
  },
  
  searchByMobile() {
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
    app.fetch('market/audit', {
      method: 'queryByMobile',
      params: {
        mobile: this.data.mobile
      }
    }).then((response) => {
      this.setData({
        'mobileInput': false,
        'queryData': response
      })
    })
  },

  /**
   * 绑定银行卡
   */
  bindCard() {
    if (!this.data.accountName) {
      wx.showToast({
        title: '请输入开户人姓名',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!this.data.cardNo) {
      wx.showToast({
        title: '请输入银行卡号',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (this.data.index * 1 === 0 && !this.data.accountIdNo) {
      wx.showToast({
        title: '请输入开户人身份证',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (this.data.index * 1 === 1 && !this.data.bankIndex) {
      wx.showToast({
        title: '请选择开户行',
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
    app.fetch('market/audit', {
      method: 'updateBankCard',
      params: {
        ...this.data.queryData,
        cardType: this.data.index * 1 === 1 ? 3 : 1,
        bankCode: this.data.bankIndex ? defaultBankMap[this.data.bankIndex].value : '',
        bankName: this.data.bankIndex ? defaultBankMap[this.data.bankIndex].name : ''
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