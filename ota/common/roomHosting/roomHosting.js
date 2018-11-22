// pages/configureHouse/configureHouse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: '0',
    steps: [
      {
        desc: '房间'
      },
      {
        desc: '价格'
      }
    ],
    hostingInfo:{  // 房源参数
      contactMobile:'', //看房人电话
      houseArea:'',//房间面积
      houseDesc: '',//房间描述
      houseDirection: 1, //朝向
      facilityItems:'',//房间设施
      pictures: [{
        "imageName": "imageName",
        "isBase64": 1,
        "src": "src"
      }],
    }
  },
  methods: {
    nextTep() {
      console.log('nextStep')
    }
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