// pages/entryHouse/addRoom/addRoom.js
const fetch = require('../../../utils/api.js')
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
    elTabName:'',
    hostingRooms:[{
      roomName:'房间A',
      leaseStatus: 0 //0-未出租 1-已出租
    }],
    checkedArray:[false],
    roomNum :1,
    allRoomLen:3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
//checked data
  onChange(e) {
    this.data.checkedArray[e.currentTarget.dataset.id] = e.detail
    this.setData({
      checkedArray: this.data.checkedArray
    })
    this.data.hostingRooms[e.currentTarget.dataset.id].leaseStatus = !e.detail?0:1
    this.setData({
      hostingRooms:this.data.hostingRooms
    })
  },
  //添加房间
  addRoom(){
    if (this.data.roomNum === this.data.allRoomLen){
      wx.showToast({
        title: '房间添加完成',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    this.data.hostingRooms.push({
     roomName: '房间' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')[this.data.roomNum],
      leaseStatus: 0 //0-未出租 1-已出租
    })
    this.setData({
      hostingRooms: this.data.hostingRooms,
      roomNum: this.data.hostingRooms.length
    })
  },
  //提交数据
  submitEntry(e){
    let datasetName = e.currentTarget.dataset.name
    console.log('params', this.data.hostingRooms)
    // fetch('/presaveRoom',{
    //   method: 'savePresaveRoom', //保存未完善房源
    //   params: {
    //     hostingInfo:JSON.stringify(this.data.etryHouseData)
    //   }
    // }).then((res)=>{
    if (datasetName === 'continueEntryHouse') {  //继续录入
      wx.redirectTo({
        url: '../../entryHouse/entryHouse', 
      })
    } else if (datasetName === 'saveEntryHouse') {
      wx.redirectTo({
        url: '../../wanShanHouse/wanShanHouse?lr=true',  // 跳转到完善房源页面
      })
    }
  //   })
  }
})