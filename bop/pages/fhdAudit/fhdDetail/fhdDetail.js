// pages/fhdAudit/fhdDetail/fhdDetail.js
import utils from '../../../utils/util'
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
    detailData: {},
    is_model_Hidden: true,
    is_model_title: '',
    is_model_Msg: '',
    showTextarea: false,
    crossType: null
  },

  /**
   * 查看图片
   */
  previewImg(e) {
    const _this = this.data
    const currentImg = e.currentTarget.dataset.imgsrc
    const currentType = e.currentTarget.dataset.type
    wx.previewImage({
      current: currentImg,
      urls: _this.detailData[currentType] || []
    })
  },

  /**
   * 审核完成跳转列表页
   */
  navigateIndex(e, reason) {
    const saveAuditApi = this.data.detailData.type === 1 ? 'auditPersonal' : 'auditBusiness'
    app.fetch('market/audit', {
      method: saveAuditApi,
      params: utils.ObjectMap({
        ...this.data.detailData,
        status: this.data.crossType,
        gmtCreate: '',
        reason
      })
    },{
      response: true
    }).then((response) => {
      if (response.message !== '操作成功') {
        wx.showModal({
          title: '审核结果变更为【不通过】',
          content: response.message || '银行卡信息有误',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack()
            }
          }
        })
      }else {
        wx.showToast({
          title: '操作成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.navigateBack()
        }, 1500)
      }
    })
  },

  /**
   * 获取textarea值
   */
  getTextvalue(e) {
    this.navigateIndex(e, e.detail)
  },

  /**
   * 审核通过
   */
  auditCross() {
    this.data.crossType = 1
    this.setData({
      'is_model_Hidden': false,
      'showTextarea': false,
      'is_model_title': '信息无误',
      'is_model_Msg': '确认审核通过'
    })
  },

  /**
   * 审核不通过
   */
  auditUncross() {
    this.data.crossType = 2
    this.setData({
      'is_model_Hidden': false,
      'is_model_title': '审核不通过',
      'showTextarea': true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const queryData = JSON.parse(options.detail)
    wx.setNavigationBarTitle({
      title: queryData.type === 2 ? '企业机构审核' : '个人机构审核'
    })
    let filterBank = defaultBankMap.filter((bank) => bank.value === queryData.accountBank)
    queryData.accountBank = filterBank.length > 0 ? filterBank[0].name : ''
    this.setData({
      'detailData': queryData
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