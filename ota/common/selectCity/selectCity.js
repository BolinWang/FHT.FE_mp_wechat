// common/selectCity/selectCity.js
import { deepClone } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressShow:false,
    cityData:{
      "a": [{
        "areaId": "1",
        "areaName": "杭州"
      },
      {
        "areaId": "2",
        "areaName": "随州"
      }],
      "b": [{
        "areaId": "3",
        "areaName": "武汉"
      }]
    }
  },
  onLoad(){
    // fetch('/', {
    //   method: '',
    // }).then(res => {
    //   if (res.code == 0) {
    //     this.setData({
    //       cityData : deepClone(res.data)
    //     })
    //   }
    // })
  },
  // 重新定位
  getCityNameOFLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐
      success: function (res) {
        console.log("定位成功");
        var locationString = res.latitude + "," + res.longitude;
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/',
          data: {
            "key": "HDYBZ-MVIR2-6TJUV-CUXGZ-A3YLE-W5BPD",
            "location": locationString
          },
          method: 'GET',
          // header: {}, 
          success: function (res) {
            // success
            console.log("请求成功");
            console.log("请求数据:" + res.data.result.address);
            this.setData({
              currentAdress: res.data.result.address
            })
          },
          fail: function () {
            // fail
            console.log("请求失败");
          },
          complete: function () {
            // complete
            console.log("请求完成");
          }
        })
      },
      fail: function () {
        // fail
        console.log("定位失败");
      },
      complete: function () {
        // complete
        console.log("定位完成");
      }
    })
  },
  selectCity(e){
    wx.navigateTo({
        url: '../../common/apartment/apartment?adressId=' + e.currentTarget.dataset.id
    })
  }
})