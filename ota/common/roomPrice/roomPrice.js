// pages/configureHouse/configureHouse.js
Page({
  properties: {
    nextPrevData:{
      type:Object,
      value:''
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    dataArray: [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9'],  //室
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],// 厅
    ],

  },
  onLoad(){
    
  },
  nextTep() {

  },
  //输入框事件
  onChange(e) {
    this.data.etryHouseData[e.currentTarget.id] = e.detail
    this.setData({
      etryHouseData: this.data.etryHouseData
    })
    console.log(this.data.etryHouseData)
  },
  methods:{
  
  }
})