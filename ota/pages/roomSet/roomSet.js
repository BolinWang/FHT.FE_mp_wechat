// pages/roomSet/roomSet.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nextTepShow:true,
    houseRentType: '',// 1整租 2合租
    nextTepFirst:true,
    nextTepSecond:false,
    sureBtnShow:false,
    active:0,
    steps:[{
        desc: '房间'
      },
      {
        desc: '价格'
      }
    ]
  },
  submitData: function (e) {
    this.room_hosting = this.selectComponent('#room_hosting')
  },
  pageEventListener1(e){
    console.log('pageEventListener1', e)
  },
  onMyEvent(){
    console.log('onMyEvent')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!!options.houseRentType){
        this.setData({
          houseRentType: options.houseRentType
        })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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