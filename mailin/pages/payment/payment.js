// pages/payment/payment.js
const Ajax = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    free: '',
    coupon: '',
    source: null,
    billNo: null,
    couponReceiveId: null,
    money: null,
    gopay: true,
    couponList: [],
    linkUrl: ''
  },

  getcouponList() {
    Ajax({
      url: '/coupon',
      method: 'canUseCoupons',
      params: {
        billNo: this.data.billNo,
      }
    }).then(res => {
      if (res.data.couponList) {
        this.setData({
          couponList: res.data.couponList.filter(item => item.status === 1),
        })
      }
      if (this.data.coupon || this.data.couponList.length) {
        this.setData({
          linkUrl: `/pages/couponChoose/couponChoose?billNo=${this.data.billNo}&money=${this.data.money}`
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.setData({
      billNo: options.billNo,
      money: options.money || null,
      couponReceiveId: options.couponReceiveId || null,
      coupon: options.discountAmount ? `-¥${options.discountAmount}` : ""
    })
    console.log(this.data.billNo)
    this.getcouponList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  goPay() {   // 去支付 
    let that = this
    if (!this.data.gopay) {
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
        miniProgram: true,
        openid: wx.getStorageSync('openId'),
        couponReceiveId: this.data.couponReceiveId
      }
    }).then(res => {
      this.setData({
        gopay: true
      })
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