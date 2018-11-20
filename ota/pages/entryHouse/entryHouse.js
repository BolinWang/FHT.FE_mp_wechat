// pages/entryHouse/entryHouse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    roomSetShow:false,//房间号配置
    unitCodeShow:false,//单元
    roomNoShow:false,//房间号
    houseAdress:'',//房源地址
    active:'0',
    roomInputShow:false, //是否展示房间输入
    addressName:'sss',
    buildingInfo:{},//房间信息
    currentAdress:'',
    areaBankuai:{  //区域板块
      index:0,
      areaCity:['美国', '中国', '巴西', '日本'],
    },
    etryHouseData:{
      estateName:'', //品牌公寓
      regionAddressId:'', //房源地址 传一个小区id就好
      zoneId:'', //区域板块
      floorName:'', //所在楼层
      floorAmount:'', //楼层总数
      roomNo:'' , //房间号
      buildingName:'' //楼幢名
    },
    areaList:{
      county_list: {
        110101: '东城区',
        110102: '西城区',
        110105: '朝阳区',
        110106: '丰台区',
        120101: '和平区',
        120102: '河东区',
        120103: '河西区',
        120104: '南开区',
        120105: '河北区'
      }
    },
    steps: [
      {
        // text: '步骤一',
        desc: '编辑地址'
      },
      {
        // text: '步骤二',
        desc: '编辑户型'
      }
    ]
  },
  //输入框获取值
  onChange(e){
    this.data.etryHouseData[e.currentTarget.id] = e.detail
    this.setData({
      etryHouseData: this.data.etryHouseData
    })
    console.log(this.data.etryHouseData)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.setData({
     
      // title:options.title
    })
  },
  addressShowHandel(){
    wx.navigateTo({
      url: '../../common/selectCity/selectCity'
    })
  },
  //楼幢门牌号配置
  floorNumSet() {
    this.setData({
      roomSetShow: true
    })
  },
  //关闭地址弹窗
  floorNumClose(){
    this.setData({
      roomSetShow:false
    })
  },
  //区域板块选择
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  //楼幢选择
  getBuildingName(e){
    console.log("buildingName",e.currentTarget.dataset.name)
    this.setData({
      'etryHouseData.buildingName': e.currentTarget.dataset.name
    })
    if (e.currentTarget.dataset.name){
      this.setData({
        roomSetShow:false,
        unitCodeShow:true
      })
    }
  },
  //选择单元
  getUnitCode(e){
    console.log("buildingName", e.currentTarget.dataset.name)
    this.setData({
      'etryHouseData.floorName': e.currentTarget.dataset.name
    })
    if (e.currentTarget.dataset.name) {
      this.setData({
        unitCodeShow: false,
        roomNoShow: true
      })
    }
  },
  //选择房间号
  getFloorNameNum(e){
    console.log('',e.currentTarget.dataset.name)
    this.setData({
      'etryHouseData.roomNo': e.currentTarget.dataset.name
    })
    if (e.currentTarget.dataset.name) {
      this.setData({
        roomNoShow: false,
      })
    }
  },
  //页面显示的时候：
  onShow(){
    let that = this
    this.setData({
      'etryHouseData.regionAddressId': that.data.addressName
    })
    console.log('从小区那传过来的数据', that.data.buildingInfo)
    if (JSON.stringify(that.data.buildingInfo) == "{}"){
      this.setData({
        roomInputShow:true
      })
    }else{
      this.setData({
        roomInputShow: false
      })
    }
  }
})