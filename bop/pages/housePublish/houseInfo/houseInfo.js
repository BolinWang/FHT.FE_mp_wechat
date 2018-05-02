// pages/housePublish/houseInfo/houseInfo.js
const app = getApp()
const auditReason = [
  '照片不符合上传规则',
  '房源描述不符合规则',
  '电话信息错误',
  '面积信息错误'
]
import utils from '../../../utils/util'
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
  navigateIndex(e, reviewRemark) {
    app.fetch('market/review', {
      method: 'saveReviewStatus',
      params: utils.ObjectMap({
        reviewCheckId: this.data.detailData.reviewCheckId,
        reviewStatus: this.data.crossType,
        reviewRemark: reviewRemark
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
   * 审核通过
   */
  auditCross() {
    this.data.crossType = 2
    this.setData({
      'reviewRemark': '',
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
    const that = this
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
    app.fetch('market/review', {
      method: 'queryReviewCheckRoomDetail',
      params: {
        reviewCheckId: options.reviewCheckId * 1,
        housingType: 2
      }
    }).then((response) => {
      let detailData = utils.deepClone(response.result)
      detailData.roomInfosFormat = detailData.roomInfos ? detailData.roomInfos[0] : ''
      let picList = detailData.picUrls.map((item) => {
        return item.picUrl
      })
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