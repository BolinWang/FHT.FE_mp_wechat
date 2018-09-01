// pages/couponChoose/couponChoose.js
const Ajax = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canuse:null,
    source:'',
    orderBillNo:'',
    couponList:null,
    coupon:null,
    couponName:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      source: options.source,
      orderBillNo: options.billNo
    })
  },
  chooseActive(e){
    let canIf = e.currentTarget.dataset.inf.status
    if (canIf == 1){
      this.setData({
        canuse: e.currentTarget.dataset.inf.couponId,
        coupon: e.currentTarget.dataset.inf.id,
        couponName: e.currentTarget.dataset.inf.couponName
      })
    }
    
  },
  go(){
    let that = this
    Ajax({
      url: '/coupon',
      method: 'useCoupons',
      params: {
        billNo: this.data.orderBillNo,
        couponReceiveId: this.data.coupon,

      }
    }).then(res => {
      wx.navigateTo({
        url: `/pages/payment/payment?billNo=${that.data.orderBillNo}&source=${that.data.source}money=${res.data.billActualFee}&couponReceiveId=${this.data.coupon}&couponName=${this.data.couponName}`,
      })

    })
   
  },
  getcouponList(){
    let that =this
   Ajax({
     url: '/coupon',
     method: 'canUseCoupons',
     params: {
       billNo: this.data.orderBillNo,
     }
   }).then(res =>{

     this.setData({
       couponList: res.data.couponList
     })
     res.data.couponList.forEach(function (value, key, arr) {
       if (value.ifPredete==true){
         that.setData({
           canuse: value.couponId
         })
       }
     })
   })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     this.getcouponList()
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