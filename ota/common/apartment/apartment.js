// common/apartment/apartment.js
import { deepClone } from '../../utils/util.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    nameData:[],
    list: [{
      "address": "浙江省杭州市西湖区",
      "provinceId": "省id",
      "cityId": "市id",
      "regionId": "区id",
      "name": "(昭阳区) 文三路西湖区199号",
      "regionAddressId": "",
    },
    {
        "address": "浙江省杭州市西湖区",
        "provinceId": "省id",
        "cityId": "市id",
        "regionId": "区id",
        "name": "(西湖区) 文二西路10938",
        "regionAddressId": "",
        "buildingInfo": {
          "buildingName": ["1栋", "2栋"],
          "unitCode": ["1单元", "2单元"],
          "floor": {
            "1层": ["101", "102"],
            "2层": ["201", "202"]
          }
        }
      }],
    adressId:'' //请求参数的ID
  },
  onLoad(e){
    console.log(e.adressId)
    this.setData({
      adressId: e.adressId
    })
  },
  serchChange(event){
    // this.setData({
    //   value:event.detail
    // })
    // fetch('/searchAddressByKeyword', {  //请求搜索小区接口
    //   params: {
    //     'cityId':'',
    //     'keyword': event.detail
    //   }
    // }).then(res => {
    //   if (res.code == 0) {
        this.setData({
          //  nameData : deepClone(res.list)
          nameData:deepClone(this.data.list)
        })
      // }
    // })
    let nameQuLength = 0
    this.data.nameData.map(item => {
      item.adressText = item.name.split(")")
      item.nameQu = item.adressText[0].substring(1)
      item.nameAdress = item.adressText[1]
      if (!item.buildingInfo){
        item.buildingInfo = {}
      }
    })
    this.setData({
      nameData: this.data.nameData
    })
  },
  backEntryHouse(e){
    let pages = getCurrentPages();//当前页面
    console.log(pages)
    let prevPage = pages[pages.length - 3];//上一页面
    console.log(e.currentTarget.dataset.id)
    console.log(e.currentTarget.dataset.index)
    console.log(e.currentTarget.dataset.name)
    prevPage.setData({//直接给上移页面赋值
      addressName: e.currentTarget.dataset.id,
      buildingInfo: e.currentTarget.dataset.name,
      houseAdress: e.currentTarget.dataset.index
    })
    wx.navigateBack({//返回
      delta: 2
    })
  },
  onUnload: function () {
    // if (getCurrentPages().length == 3) {
    //   wx.navigateBack({
    //     delta: 2
    //   })
    // }
  },
})