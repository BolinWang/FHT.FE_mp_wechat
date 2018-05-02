// pages/signAudit/signDetail/signDetail.js
import utils from '../../../utils/util'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: {},
    picList: [],
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
    if (_this.detailData.type === 3) {
      return false
    }
    const currentImg = e.currentTarget.dataset.imgsrc
    wx.previewImage({
      current: currentImg, 
      urls: _this.picList
    })
  }, 
  
  /**
   * 审核完成跳转列表页
   */
  navigateIndex(e, reject_remark) {
    app.fetch('market/audit', {
      method: 'handle',
      params: utils.ObjectMap({
        auditId: this.data.detailData.id,
        status: this.data.crossType,
        reject_remark: reject_remark
      })
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
   * 获取textarea值
   */
  getTextvalue(e) {
    this.navigateIndex(e, e.detail)
  },

  /**
   * 审核通过
   */
  auditCross() {
    this.data.crossType = 2
    this.setData({
      'is_model_Hidden': false,
      'is_model_title': '信息无误',
      'is_model_Msg': '确认审核通过'
    })
  },
  
  /**
   * 审核不通过
   */
  auditUncross() {
    this.data.crossType = 3
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
      title: queryData.type === 2 ? '企业签章审核' : '个人签章审核'
    })
    const getUrls = (queryData.type === 2
      ? queryData.licensePicUrls
      : queryData.electronicSealUrl)
    let picList = getUrls ? getUrls.split(',') : []
    this.setData({
      'detailData': queryData,
      'picList': picList
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