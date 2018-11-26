// pages/personalCenter/personalCenter.js
const fetch = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hrefavatarUrl: '../../images/Group.svg',
    sessionId:null,
    nickName:'邓冬明',
    mobile:'13098776787',
    enterHouseShow:false  // 点击录入房源展示弹层
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // });
    this.getPersonal()
    // this.getOrderNum()
  },
  // 获取个人信息
  getPersonal(){
    let that = this
    // fetch('/user',{
    //   method:'info',
    //   sessionId: wx.getStorageSync('OTA_sessionId')
    // })
  },
  //展示录入房源弹层
  showEnterHouse(){
    this.setData({
      enterHouseShow:true
    })
  },
  //关闭录入房源弹层
  closeEnterHouse(){
    this.setData({
      enterHouseShow: false
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
    this.setData({
      enterHouseShow: false
    })
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