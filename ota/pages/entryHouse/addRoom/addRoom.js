// pages/entryHouse/addRoom/addRoom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:2,
    steps: [
      {
        // text: '步骤一',
        desc: '地址'
      },
      {
        // text: '步骤二',
        desc: '户型'
      },
      {
        // text: '步骤二',
        desc: ' 房间'
      }
    ],
    roomlist:['房间A','房间B'],
    checkedArray:['false']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //changedata
  onChange(e, detail) {
    console.log(e.currentTarget.dataset.id)
    console.log(e)
    this.data.checkedArray[0] = e.detail
    console.log(this.data.checkedArray[0])
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