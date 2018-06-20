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
    pageSize: 10,
    totalPages: 1,
    isLoading: false,
    isLoadTotal: false,
    housingType: 2 // 2: 分散式 1: 集中式
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
   * 选项卡分散式/集中式切换
   */
  menuTap: function (e) {
    //获取到绑定的数据
    var current = e.currentTarget.dataset.current
    // 初始化数据
    this.setData({
      auditList: [],
      keyword: '',
      placeholder: '搜索',
      placeholderStyle: 'text-align: center',
      showClear: false,
      startSearch: false,
      pageNo: 1,
      pageSize: 10,
      totalPages: 1,
      isLoading: false,
      isLoadTotal: false,
      housingType: current * 1
    })
    this.getAuditList()
  },
  
  /**
   * 获取页面数据
   */
  getAuditList(type) {
    app.fetch('market/review', {
      method: 'queryReviewCheckListByPage',
      params: utils.ObjectMap({
        reviewStatus: 1,
        housingType: this.data.housingType,
        keyword: this.data.keyword,
        pageNo: this.data.pageNo,
        pageSize: this.data.pageSize
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
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        return false
      }
      response.list.map((item) => {
        item.publishTimeStr = utils.formatTime(item.publishTime)
        if (this.data.housingType === 2) {
          item.houseName = this.formatRoomName(item)
        }
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
          'totalPages': response.record ? Math.ceil(response.record / this.data.pageSize) : 1
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
    const rowData = this.data.auditList[targetIndex]
    let params = this.data.housingType === 2 ? {
      housingType: 2,
      reviewCheckId: rowData.reviewCheckId
    } : {
      housingType: 1,
      estateId: rowData.estateId,
      estateTypeId: rowData.estateTypeId,
      groupCode: rowData.groupCode
    }
    let navUrlParams = ''
    for (let key in params) {
      let param = key + "=" + params[key] + '&'
      navUrlParams += param
    }
    wx.navigateTo({
      url: 'houseInfo/houseInfo?' + navUrlParams
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
      'showClear': false,
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