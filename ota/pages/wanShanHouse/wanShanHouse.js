// pages/wanShanHouse/wanShanHouse.js
const fetch = require('../../utils/api.js')
import Dialog from '../../components/dialog/dialog';
import { deepClone } from '../../utils/util.js'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    popupShow:false,
    editData:'',
    lr:false,
    presaveRoomList:{
      "小区A": [{
        "id": 1,
        "buildingName": "1幢",
        "unitCode": "1单元",
        "roomNo": "209",
        "roomName": "啦啦",
        "houseRentType": 1
      },
        {
          "id": 1,
          "buildingName": "1幢",
          "unitCode": "1单元",
          "roomNo": "209",
          "roomName": "啦啦",
          "houseRentType": 1
        }],
      "小区B": [{
        "id": 2,
        "buildingName": "2幢",
        "unitCode": "2单元",
        "roomNo": "203",
        "roomName": "嘻嘻",
        "houseRentType": 2
      }]
    }   // 列表数据
  },
  //获取小区房间的接口
  getHouseData(){
    fetch('/presaveRoom',{
      method: 'queryPresaveRoomList'
    }).then((res)=>{
       this.setData({
         presaveRoomList:res.data
       })
    })
  },
  //点击房间编辑
  entryRoomPz(e){
    this.setData({
      popupShow: false,
    })
    setTimeout(()=>{
      this.setData({
        popupShow: true,
      })
    },500)
    this.setData({
      editData: e.currentTarget.dataset.name
    })
    app.globalHouseData.houseRentType = this.data.editData.houseRentType
    app.globalHouseData.id = this.data.editData.id
    app.globalHouseData.roomName = this.data.editData.roomName
    console.log(app.globalHouseData.houseRentType)
  },
  canclePopup(){
    this.setData({
      popupShow: false
    })
  },
  deletHouse(){
    let params={
      id: this.data.editData.id
    }
    if (this.data.editData.houseRentType === 2){
      params.roomName = this.data.editData.roomName
    }
    Dialog.confirm({
      title: '',
      message: '确定删除房源吗？'
    }).then(() => {
      fetch('/presaveRoom', {
        method: 'deletePresaveRoom',
        params: params
      }).then((res) => {
        this.getHouseData();
        this.setData({
          popupShow: false
        })
      })
    }).catch(() => {
      
    });
  },
  editHouseFun(){
    wx.navigateTo({
      url: '../roomSet/nextPage/nextPage?houseRentType=' + JSON.stringify(this.data.editData)
    })
  },
  onHide() { 
    console.log(1234567)
    this.setData({
      popupShow: false
    })
  },
  onLoad: function (options) {  
    this.setData({
      lr:true
    })
  },
  onUnload(options){
    if(this.data.lr){// 判断是不是从录入进入完善房源
      wx.navigateBack({
        delta: 2
      })
    }else{
      wx.navigateBack({
        delta: 1
      })
    }
  }
})