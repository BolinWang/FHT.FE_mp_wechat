// pages/checkIn/checkIn.js
const Ajax = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail: '',
    index:0,
    userInfo:'',
    mobile:'',
    monthNumList:[],//租房期限
    monthNumIndex:0,
    startDateIndex:'',
    startDateList:[],
    rentTypeId:'', //租凭类型
    referrerMobile:'',//推荐人手机号码
    startDate:'',//入住日期
    monthNum:'', //租凭期限
    dateTime:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = JSON.parse(options.userInfo)
    userInfo.cardNo = userInfo.cardNo.substr(0, 4) + '*******' + userInfo.cardNo.substr(12) 
    this.setData({
      orderDetail: JSON.parse(options.detail) || '',
      userInfo: userInfo || ''
    })
   console.log(this.data.orderDetail)
    wx.getStorage({
      key: 'MLZFUSERNAME',
      success: (res) => {
        this.setData({
          mobile: res.data.substr(0, 3) + "****" + res.data.substr(7)
        })
      }
    })
  },
  bindKeyInput(e){
    this.setData({
      referrerMobile: e.detail.value.replace(/\s+/g, '')
    })
  },
  goSubmit(){
    if (!this.data.startDate){
      wx.showToast({
        title: '请选择入住日期',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    let that = this
    let satrt = this.data.startDate.length > 10 ? this.data.startDate.substring(5) : this.data.startDate
    let params={
      orderType: 1,
      type: this.data.orderDetail.rentType,
      channelType: 2,
      contactName: this.data.orderDetail.contactName,
      contactMobile: this.data.orderDetail.contactMobile,
      contactCardType: this.data.orderDetail.contactCardType,
      contactCardNo: this.data.orderDetail.contactCardNo,
      contactGender: '1',
      orderNo: this.data.orderDetail.orderNo,
      housingType: this.data.orderDetail.housingType,
      roomId: this.data.orderDetail.roomId,
      rentTypeId: this.data.rentTypeId, //租凭类型
      referrerMobile: this.data.referrerMobile,//推荐人手机号码
      startDate: satrt,//入住日期
      monthNum: this.data.monthNum //租凭期限
  }
    console.log(params.startDate)
    Ajax({
      url: '/order',
      method: 'createOrder',
      v: '3.2.0',
      params:params
    }).then(response =>{
      let contractNo = response.data.orderNo //传订单号也能处理
      console.log(response)
      wx.showModal({
        title: '提示',
        content: '点击确认前去签约',
        success: (res) => {
          if (res.confirm) {
            this.checkPdf(contractNo).then(res => {
              wx.navigateTo({
                url: `/pages/sign/sign?contractNo=${contractNo}&activeTab=${0}`
              })
            })
            // wx.redirectTo({
            //   url: `/pages/sign/sign?contractNo=${contractNo}&activeTab=${0}`
            // })
          } else if (res.cancel) {
            wx.redirectTo({
              url: '../personalCenter/personalCenter'
            })
          }
        }
      })
    })
  },
  checkPdf(item) {  //校验合同
    return new Promise((resolve, reject) => Ajax({
      url: '/contract',
      method: 'orderContract',
      v: '3.2.0',
      params: {
        orderNo: item
      }
    }).then(res => {
      if (!res.data.canSign) {
        wx.showToast({
          title: '合同正在生成中，请稍后重试',
          icon: 'none',
          duration: 2000
        })
      } else {
        resolve(res)
      }
    }))
  },
  bindPickermonth(e){
    let index = e.detail.value;
    this.setData({
      monthNumIndex: index,
      monthNum: this.data.monthNumList[index]
    })
  },
  bindPickerStartDate(e){
    let index = e.detail.value;
    this.setData({
      startDateIndex: index,
      startDate: this.data.startDateList[index]
    })
  },
  bindPickerChange(e){
    let index = e.detail.value;
    let currentId = this.data.orderDetail.rentTypes[index].id; // 这个id就是选中项的id
    let monthNumIndex = this.data.orderDetail.rentTypes[index].period.indexOf(12)
    this.setData({
      rentTypeId: currentId,
      monthNumList: this.data.orderDetail.rentTypes[index].period,
      startDateList: this.data.orderDetail.rentTypes[index].datePeriod,
      monthNumIndex: monthNumIndex,
      startDateIndex: '',
    })
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let monthNumIndex = this.data.orderDetail.rentTypes[0].period.indexOf(12)
    this.setData({
      monthNumList: this.data.orderDetail.rentTypes[0].period,
      startDateList: this.data.orderDetail.rentTypes[0].datePeriod,
      monthNumIndex: this.data.orderDetail.rentTypes[0].period.indexOf(12),
      rentTypeId: this.data.orderDetail.rentTypes[this.data.index].id,
      monthNum: this.data.orderDetail.rentTypes[0].period[monthNumIndex]
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