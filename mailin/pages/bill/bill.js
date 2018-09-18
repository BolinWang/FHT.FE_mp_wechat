// pages/bill/bill.js
const Ajax = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tablist: [{
      value: 0,
      label: '待付账单'
    }, {
      value: 1,
      label: '已付账单'
    }],
    activeTab: 0,
    winHeight: "",//高度
    showPullDown: false,
    status: 1, // 1-未支付，2-已支付
    billList:null,
  },
  tabChoose(e) {   //点击选择
    this.setData({
      activeTab: e.target.dataset.current
    })
  },
  swiperTab(e) {  //滑动选择
    this.setData({
      activeTab: e.detail.current,
      billList: []
    })
    this.getbillList()
  },
  getbillList(){
    Ajax({
      url: '/bill',
      method:'bills',
      v: '2.3',
      params: {
        status: this.data.activeTab+1
      }
    }).then(res => {
      console.log(res.data.bills)
      if (res.data.bills) {
        res.data.bills.forEach((item, index) => {
          item.billFee = -item.billFee
        })
      }
       this.setData({
         billList: res.data.bills,
         showPullDown: true
       })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.activeTab !== undefined) {
      that.setData({
        activeTab: Number(options.activeTab) || 0
      })
    }
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 88;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getbillList()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      showPullDown: false
    })
    wx.showNavigationBarLoading()
    setTimeout(() => {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
    this.getbillList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})