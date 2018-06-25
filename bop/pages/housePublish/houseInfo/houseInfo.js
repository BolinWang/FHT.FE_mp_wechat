// pages/housePublish/houseInfo/houseInfo.js
const app = getApp()
const auditReason = [
  '照片不符合上传规则',
  '房源描述不符合规则',
  '电话信息错误',
  '面积信息错误'
]

const accordPicList = [
  '符合图招',
  '不符合图招'
]
import utils from '../../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    housingType: 2,
    optionsData: {},
    detailData: {},
    picList: [],
    is_model_Hidden: true,
    is_model_title: '',
    is_model_Msg: '',
    showReasons: false,
    crossType: null,
    reviewRemark: ''
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
  navigateIndex(e) {
    let discrepancyReason = e.detail || ''
    const saveApi = this.data.housingType === 2 ? 'saveReviewStatus' : 'saveEstatePublishStatus'
    let saveParams = this.data.housingType === 2 ? {
      reviewCheckId: this.data.detailData.reviewCheckId,
      reviewStatus: this.data.crossType,
      accordPic: this.data.accordPic,
      reviewRemark: this.data.reviewRemark,
      discrepancyReason
    } : {
      estateId: this.data.optionsData.estateId,
      estateTypeId: this.data.optionsData.estateTypeId,
      groupCode: this.data.optionsData.groupCode,
      reviewStatus: this.data.crossType,
      accordPic: this.data.accordPic,
      reviewRemark: this.data.reviewRemark,
      discrepancyReason
    }
    app.fetch('market/review', {
      method: saveApi,
      params: utils.ObjectMap(saveParams)
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
   * 审核通过
   */
  auditCross() {
    this.data.crossType = 2
    let that = this
    wx.showActionSheet({
      itemList: accordPicList,
      itemFontsize: '24rpx',
      success: function (res) {
        const resIndex = res.tapIndex
        that.data.accordPic = 2 - resIndex
        // 不符合图招原因
        if (resIndex === 1) {
          that.setData({
            'reviewRemark': '',
            'showReasons': true,
            'is_model_Hidden': false,
            'is_model_title': accordPicList[resIndex]
          })
          return false
        } 
        that.setData({
          'reviewRemark': '',
          'showReasons': false,
          'is_model_Hidden': false,
          'is_model_title': accordPicList[resIndex],
          'is_model_Msg': '确认审核通过'
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '请选择是否符合图招',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  /**
   * 审核不通过
   */
  auditUncross() {
    this.data.crossType = 3
    let that = this
    wx.showActionSheet({
      itemList: auditReason,
      itemFontsize: '24rpx',
      success: function (res) {
        that.setData({
          'is_model_Hidden': false,
          'is_model_title': '审核不通过原因',
          'is_model_Msg': auditReason[res.tapIndex],
          'reviewRemark': auditReason[res.tapIndex]
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '请选择审核不通过原因',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for (let key in options) {
      if (key !== 'groupCode') {
        options[key] = options[key] * 1
      }
    }
    this.setData({
      'housingType': options.housingType || 2,
      'optionsData': options
    })
    app.fetch('market/review', {
      method: 'queryReviewCheckRoomDetail',
      params: options
    }).then((response) => {
      let detailData = utils.deepClone(response.result)
      let picList = []
      if (options.housingType === 2) {
        detailData.roomInfosFormat = detailData.roomInfos ? detailData.roomInfos[0] : ''
        picList = detailData.picUrls.map((item) => {
          return item.picUrl
        })
      } else {
        picList = detailData.roomTypePicUrls.map((item) => {
          return item.picUrl
        })
      }
      this.setData({
        'detailData': detailData,
        'picList': picList
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