// pages/billDetail/billDetail.js
const Ajax = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    billNo:null,
    billDescList:null,
    payStype:null,
    showModalStatus: true,
    poplist:null,
    billMoney:null
  },
  hideModal(){
    this.setData({
      showModalStatus: true,
      poplist:null
    })
  },
  getDesc(e){
    this.setData({
      showModalStatus: false,
      poplist: e.currentTarget.dataset.item
    })
  },
  showPic() {
    console.log(1111)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
     this.setData({
       billNo: options.billNo,
       billMoney: options.billMoney
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getbillDetail()
  },
  getbillDetail(){
    Ajax({
      url: '/bill',
      method: 'billDetail',
      v: '3.0.6',
      params: {
        billNo: this.data.billNo
      }
    }).then(res => {
      console.log(res)
      this.setData({
        payStype: res.data.pop(),
        billDescList:res.data
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