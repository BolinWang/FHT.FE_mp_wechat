// pages/bill/bill.js
const Ajax = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: "",//高度
    showPullDown: false,
    billList:[],
    pageNo:1,
    scrollTop:0,
  },
  goTel(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.item,
    })
  },
  goTelMes(e){
    Ajax({
      url: '/workBench',
      method: 'urgeMessage4Bill',
      v: '1.3',
      params: {
        billId: e.currentTarget.dataset.item
      }
    }).then(res => {
      let billList = this.data.billList
      billList.forEach((billItem, index) => {
        if (billItem.billId === e.currentTarget.dataset.item) {
          billList[index].todayMsgTimes = 1
        }
      })
      this.setData({
        billList: billList,
      })
      wx.showToast({
        title: '短信发送成功',
        icon: 'success',
        duration: 2000
      })
    })
  },
  getbillList(){
    const that=this
    Ajax({
      url: '/workBench',
      method:'urgeBills',
      v: '1.3',
      params:{
        pageSize: 10,
        pageNo: this.data.pageNo
      }
    }).then(res => {
       wx.hideLoading()
      if (res.data.urgeBills!==null){
        this.setData({
          billList: that.data.billList.concat(res.data.urgeBills)
        })
       }
       
    })
  },
  bindDownLoad(){
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      pageNo: ++this.data.pageNo
    })
    this.getbillList()
  },
  scroll: function (event) {
         //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    // this.setData({
    //   scrollTop : event.detail.scrollTop
    // });
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  高度自适应
    const that = this
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
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
  // onPullDownRefresh: function () {
  //   this.setData({
  //     showPullDown: false
  //   })
  //   wx.showNavigationBarLoading()
  //   setTimeout(() => {
  //     wx.hideNavigationBarLoading() //完成停止加载
  //     wx.stopPullDownRefresh() //停止下拉刷新
  //   }, 200);
  //   this.getbillList()
  // },

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