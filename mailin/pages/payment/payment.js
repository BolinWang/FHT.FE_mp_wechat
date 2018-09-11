// pages/payment/payment.js
const Ajax = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
   free:'',
   coupon:'选择优惠卷',
   source:null,
   billNo:null,
   couponReceiveId:null,
   money:null,
   gopay:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
 
  onLoad: function (options) {
    this.setData({
      source: options.source,
      billNo: options.billNo,
      money: options.money||null,
      couponReceiveId: options.couponReceiveId||null,
      coupon: options.couponName || "选择优惠卷"
    })
    console.log(this.data.billNo)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getOrder()
  },
  getOrder(){
    // Ajax({
    //   url: '/coupon',
    //   method: 'selectConpon',
    //   v: '3.2.0',
    //   params: {
    //     source: this.data.source,
    //     orderBillNo: this.data.billNo,
    //     couponId: '-1'
    //   }
    // }).then(res => {
    //   this.setData({
    //     free: res.data.actualFee
    //   })
    //   if (res.data.ifPredete){
    //     this.setData({
    //       coupon: res.data.preCouponDesc
    //     })
    //   }
    // })
  },
  goPay(){   // 去支付 
    let that =this
    if (!this.data.gopay){
      return
    }
    this.setData({
      gopay: false
    })
    Ajax({
      url: '/payment',
      method: 'wechatSign',
      params: {
        signType: 'MD5',
        tradeNo: this.data.billNo,
        miniProgram:true,
        openid: wx.getStorageSync('openId'),
        couponReceiveId: this.data.couponReceiveId
      }
    }).then(res => {
      console.log(res)
      wx.requestPayment({
        'timeStamp': res.data.timestamp.toString(), //时间戳
        'nonceStr': res.data.nonceStr,  //随机字符串
        'package': res.data.packageName, //  统一下单接口返回的 prepay_id 参数值
        'signType': 'MD5',           // 签名算法，暂支持 MD5
        'paySign': res.data.sign,
        'success': function (response) {
          wx.redirectTo({
             url: `/pages/paymentSucces/paymentSucces?money=${that.data.money}`,
          })
        },
        'fail': function (response) {
        }
      })
    })

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