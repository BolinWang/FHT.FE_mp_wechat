// pages/wanShanHouse/wanShanHouse.js
const fetch = require('../../utils/api.js')
import Dialog from '../../components/dialog/dialog';
import { deepClone } from '../../utils/util.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    popupShow:false,
    editData:'',
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
  onLoad(){ //加载数据
    // this.getHouseData();
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
      popupShow: true,
      editData: e.currentTarget.dataset.name
    })
    console.log(this.data.editData)
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
    console.log(params)
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
    
    wx.redirectTo({
      url: '../roomSet/roomSet?houseRentType=' + this.data.editData.houseRentType
    })
  }
})