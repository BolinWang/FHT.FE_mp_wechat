// pages/signAudit/signAudit.js
const app = getApp()

import utils from '../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    auditList: [],
    pageNo: 1,
    totalPages: 1,
    isLoading: false,
    isLoadTotal: false
  },
  /**
   * 获取页面数据
   */
  getAuditList(type) {
    app.fetch('market/audit', {
      method: 'list',
      params: {
        type: '2,3',
        status: 1,
        pageNo: this.data.pageNo,
        pageSize: 10
      }
    }).then((response) => {
      if (!response.content || response.content.length === 0) {
        wx.showToast({
          title: '查询无数据',
          icon: 'none',
          duration: 2000
        })
        return false
      }
      response.content.map((item) => {
        item.typeStr = ['个人电子签章', '企业电子签章'][3 - item.type] || '数据错误'
      })
      if (type === 'loadMore'){
        this.setData({
          'isLoading': false,
          'auditList': this.data.auditList.concat(response.content)
        })
      } else {
        this.setData({
          'auditList': response.content,
          'totalPages': response.totalPages
        })
      }
      if (type === 'refresh') {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
   * 获取详情数据
   */
  getDetailData(e) {
    const targetIndex = e.currentTarget.dataset.index
    const cloneObj = utils.deepClone(this.data.auditList[targetIndex])
    const { id, gmtCreate, principal, electronicSealUrl,
      principalIdCard, licensePicUrls, type, epName, uscc
    } = cloneObj

    let detailObj = {
      id, gmtCreate, principal,
      principalIdCard, licensePicUrls, 
      electronicSealUrl, type, epName, uscc
    }
    wx.navigateTo({
      url: 'signDetail/signDetail?detail=' + JSON.stringify(detailObj)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '电子签章审核'
    })
    this.setData({
      'totalPages': 1
    })
    this.getAuditList()
  },

  onShow: function (options) {
    this.setData({
      'totalPages': 1
    })
    this.getAuditList()
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh() {
    wx.showNavigationBarLoading()
    this.setData({
      'isLoading': false,
      'isLoadTotal': false,
      'pageNo': 1
    })
    this.getAuditList('refresh')
  },

  /**
   * 上拉加载
   */
  onReachBottom() {
    if (this.data.pageNo >= this.data.totalPages) {
      this.setData({
        'isLoadTotal': true,
        'isLoading': false
      })
    } else {
      this.data.pageNo++
      this.setData({
        'isLoading': true
      })
      this.getAuditList('loadMore')
    }
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