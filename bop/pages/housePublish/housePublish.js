// pages/housePublish/housePublish.js
const app = getApp()
import utils from '../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    auditList: [],
    keyword: '',
    placeholder: '搜索',
    placeholderStyle: 'text-align: center',
    showClear: false,
    startSearch: false,
    pageNo: 1,
    totalPages: 1,
    isLoading: false,
    isLoadTotal: false
  },

  formatHouseResource(item) {
    return `${item.province}/${item.city}/${item.region}`
  },

  formatRoomName(item) {
    let unitCodeStr = item.unitCode ? (item.unitCode + '单元 ') : '',
      buildingNameStr = item.buildingName ? (item.buildingName + '幢 ') : '';
    return ('【' + item.subdistrictName + '】' +
      buildingNameStr + unitCodeStr +
      item.floorName + '楼 ' + item.roomNo + '号 ' + '- ' + (item.roomName || '整套房间'));
  },
  
  /**
   * 获取页面数据
   */
  getAuditList(type) {
    app.fetch('market/review', {
      method: 'queryReviewCheckListByPage',
      params: utils.ObjectMap({
        reviewStatus: 1,
        housingType: 2,
        keyword: this.data.keyword,
        pageNo: this.data.pageNo,
        pageSize: 9999
      })
    }).then((response) => {
      if (!response.list || response.list.length === 0) {
        wx.showToast({
          title: '查询无数据',
          icon: 'none',
          duration: 2000
        })
        this.setData({
          'auditList': [],
          'totalPages': 1
        })
        return false
      }
      response.list.map((item) => {
        item.publishTimeStr = utils.formatTime(item.publishTime)
        item.houseName = this.formatRoomName(item)
        item.houseResource = this.formatHouseResource(item)
        item.typeStr = ['普通', '金融', '金融申请中'][item.houseFinanceType - 1] || '数据错误'
      })
      if (type === 'loadMore') {
        this.setData({
          'isLoading': false,
          'auditList': this.data.auditList.concat(response.list)
        })
      } else {
        this.setData({
          'auditList': response.list,
          'totalPages': response.totalPages || 1
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
    const reviewCheckId = this.data.auditList[targetIndex].reviewCheckId
    wx.navigateTo({
      url: 'houseInfo/houseInfo?reviewCheckId=' + reviewCheckId
    })
  },

  /**
   * 搜索
   */
  startSearch() {
    this.setData({
      'auditList': [],
      'startSearch': true,
      'placeholder': '输入小区/公寓/房源编码',
      'placeholderStyle': 'text-align: left'
    })
  },

  /**
   * 取消搜索
   */
  cancelSearch() {
    this.setData({
      'startSearch': false,
      'keyword': '',
      'placeholder': '搜索',
      'placeholderStyle': 'text-align: center'
    })
    this.getAuditList()
  },

  /**
   * 查询数据
   */
  searchData(e) {
    this.setData({
      'keyword': e.detail.value,
      'showClear': e.detail.value.length > 0
    })
    if (e.detail.value.length > 0) {
      this.getAuditList()
    }else{
      this.setData({
        'auditList': []
      })
    }
  },

  /**
   * 清空输入框
   */
  clearKeyword() {
    this.setData({
      'keyword': '',
      'showClear': false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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