const fetch = require('../../utils/api.js')
import { deepClone } from '../../utils/util.js'
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
    houseData:{},//房屋的配置
    roomData:{},//房间的配置
    priceData:{},//价格的数据
    houseArea:'',
    presaveRoomData:{
      id:'',
      roomName:''
    },//提交的数据
    steps:[{
        desc: '房间'
      },
      {
        desc: '价格'
      }
    ]
  },
  nextTepF() {  //第一步
    this.house_hosting = this.selectComponent('#house_hosting');
    console.log(Object.assign({name:'1',"aa":'aa'}, {id:'2',"pctius":{name:'23'}} ))
    // 下一步之前先验证表单
    console.log('房屋data',this.house_hosting.data.hostingInfo)
    wx.nextTick(()=>{
      if (this.house_hosting.formValidate()){
        this.setData({
          houseData: this.house_hosting.data.hostingInfo,
          houseArea: parseInt(this.house_hosting.data.hostingInfo.houseArea)
        })
      }
    })
    console.log(this.data.houseRentType)
    // 如果为整租只有两步，合租散布
    if (this.data.houseRentType*1 === 1) {// 1整租 
      this.setData({
        nextTepFirst: false,
        sureBtnShow: true,
      })
    } else if (this.data.houseRentType*1 === 2) { //2合租
      this.setData({
        nextTepFirst: false,
        nextTepSecond: true,
      })
    }
  },
  nextTepS(){ // 合租房间配置 第二步
    this.room_hosting = this.selectComponent('#room_hosting');
    // 下一步之前先验证表单
    console.log('房间data', this.selectComponent('#room_hosting'))
    wx.nextTick(() => {
      if (this.room_hosting.formValidate()) {
        this.setData({
          roomData: this.room_hosting.data.hostingRooms,
          nextTepFirst: false,
          nextTepSecond: false,
          sureBtnShow:true
        })
      }
    })
  },
  // 第三步提交数据
  submitData: function (e) {
    this.house_price = this.selectComponent('#house_price')
    console.log(this.house_price.data.roomPriceData)
    // wx.nextTick(()=>{
      if (this.house_price.formValidate()) {
        this.setData({
          priceData: deepClone(this.house_price.data.roomPriceData)
        })
      }
    // })
    let hostingInfo = Object.assign(this.data.houseData, this.data.priceData)
    hostingInfo.hostingRooms = deepClone(this.data.roomData)
    console.log('hostingInfo', hostingInfo)
    fetch('/',{
      "method": "completeHostingRoom",
      "params":{
        "id": 1,
        "roomName": '',
        "hostingInfo": deepClone(hostingInfo)
      }
    }).then((res)=>{

    })
  },
  pageEventListener1(e){
    console.log('pageEventListener1', e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let listData = JSON.parse(options.houseRentType)
    // if (!!options.houseRentType){
        this.setData({
          houseRentType: listData.houseRentType,
          'presaveRoomData.id': listData.id,
          'presaveRoomData.roomName': listData.roomName|| '' ,
        })
    // }
    console.log(JSON.parse(options.houseRentType))
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