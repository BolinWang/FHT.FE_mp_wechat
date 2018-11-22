const fetch = require('../../utils/api.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    roomSetShow:false,//房间号配置
    unitCodeShow:false,//单元
    roomNoShow:false,//房间号
    active:'0',
    roomInputShow:false, //是否展示房间输入
    houserAdress:'',
    apartmentData:{},//小区传过来的数据
    areaBankuai:{  //区域板块数据
      index:0,
      pickerDisabled:true,
      areaCity: []
    }, 
    zoneName:'',
    etryHouseData:{  
      houseRentType:'',//房屋出租类型 1整租  2合租
      estateName: "", //品牌公寓
      provinceId: "", //省ID
      cityId: "", //市ID
      regionId: "", //区Id
      zoneId: "", //板块id
      regionAddressId: "", //小区ID
      buildingName: "",//楼幢名
      unitCode: '',//单元
      roomNo: '',//房间号
      floorName: '',//楼层
      floorAmount: '', //楼层总数
      chamberCount: 1, // 室
      boardCount: 0, //厅
      toiletCount: 0, //wei
      kitchenCount:0, // 厨
      leaseStatus: 0,//租房状态
    },
    errTips:{
      estateName: '请输入品牌公寓', //品牌公寓
      buildingName: '请输入正确楼幢名',//楼幢名
      floorAmount:'请输入正确楼层总数',
      unitCode: '请输入正确单元号',//单元
      roomNo: '请输入正确的房间号',//房间号
      zoneId: '请选择区域板块', //板块id
      houserAdress:'请选择房源地址', //房源地址
      floorName:'所在楼层只能输入数字', //所在楼层
      floorMan:'请选择楼幢门牌'
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
  //校验number
  checkNumber(value){
    if (!/^[0-9]*$/.test(value)){
      return true
    }else{
      return false
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.setData({
      "etryHouseData.houseRentType": options.houseRentType
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
    console.log('picker发送选择改变，携带值为', e.detail)
    this.data.etryHouseData.zoneId = e.detail.value
    this.setData({
      'etryHouseData.zoneId': this.data.areaBankuai.areaCity[e.detail.value].id,
      zoneName: this.data.areaBankuai.areaCity[e.detail.value].name
    })
  },
  pickerChangeShow(){
    if (this.data.areaBankuai.areaCity.length === 0) {
      this.setData({
        'areaBankuai.pickerDisabled':true
      })
      wx.showToast({
        title: '请先选择房源地址',
        icon: 'none',
        duration: 2000
      })
    }else{
      this.setData({
        'areaBankuai.pickerDisabled': false
      })
    }
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
      'etryHouseData.unitCode': e.currentTarget.dataset.name
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
      'etryHouseData.roomNo': e.currentTarget.dataset.name,
      'etryHouseData.floorName': e.currentTarget.dataset.name.substring(0,1)
    })
    if (e.currentTarget.dataset.name) {
      this.setData({
        roomNoShow: false,
      })
    }
  },
  //下一步
  nextTep(e){   
    if (this.data.etryHouseData.estateName === ''){
      wx.showToast({
        title: this.data.errTips.estateName,
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.houserAdress === ''){
      wx.showToast({
        title: this.data.errTips.houserAdress,
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.etryHouseData.zoneId === ''){
      wx.showToast({
        title: this.data.errTips.zoneId,
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.etryHouseData.buildingName === '') {
      wx.showToast({
        title: this.data.errTips.buildingName,
        icon: 'none',
        duration: 2000
      })
    }else if (this.data.etryHouseData.floorAmount === '' || this.checkNumber(this.data.etryHouseData.floorAmount)) {
      wx.showToast({
        title: this.data.errTips.floorAmount,
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.etryHouseData.floorName === '' || this.checkNumber (this.data.etryHouseData.floorName)) {
      wx.showToast({
        title: this.data.errTips.floorName,
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.etryHouseData.roomNo === '' || this.checkNumber(this.data.etryHouseData.roomNo)) {
      wx.showToast({
        title: this.data.errTips.roomNo,
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.etryHouseData.floorName >this.data.etryHouseData.floorAmount){
      wx.showToast({
        title: '所在楼层不能大于楼层总数',
        icon: 'none',
        duration: 2000
      })
    } else{
      let forData = JSON.stringify(this.data.etryHouseData)
      wx.navigateTo({
        url: 'roomType/roomType?etryHouseData='+ forData,
      })
    }
    
console.log()
    // this.setData({
    //   nextTepShow:true,
    //   active: 1
    // })
  },
  onLoad(){

  },
  //页面显示的时候：
  onShow(){
    let that = this
    console.log('从小区那传过来的数据', that.data.apartmentData)
    this.setData({
      'etryHouseData.buildingName':'',
      'etryHouseData.unitCode':'',
      'etryHouseData.roomNo':'',
      'etryHouseData.floorAmount':'',
      'etryHouseData.floorName':'',
      'etryHouseData.zoneId':'',
      'areaBankuai.areaCity':[],
      zoneName:''
    })
    //判断是显示输入 还是显示选择
    if (!that.data.apartmentData.buildingInfo){
      this.setData({
        roomInputShow:true
      })
    }else{
      this.setData({
        roomInputShow: false,
        'etryHouseData.regionAddressId': that.data.apartmentData.regionId  //区id
      })
    }
    if (!!that.data.apartmentData.buildingInfo) { //获取楼层总数
      this.setData({
        'etryHouseData.floorAmount': that.data.apartmentData.buildingInfo.floorAmount
      })
    }
    // 获取板块数据
    if (!!that.data.apartmentData.regionId) {  //regionId 区id不为空
    // 房源地址赋值
    this.setData({
      houserAdress: that.data.houserAdress,
      'etryHouseData.provinceId': that.data.apartmentData.provinceId, //省ID
      'etryHouseData.cityId': that.data.apartmentData.cityId, //市ID
      'etryHouseData.regionId': that.data.apartmentData.regionId, //区Id
    })
    let data = {
      "list": [{
        "zoneId": 5,
        "zoneName": "板块1"
      }, {
        "zoneId": 6,
        "zoneName": "板块2"
        }, {
          "zoneId": 7,
          "zoneName": "板块3"
        }]
    }
    // fetch('/queryZoneListByAreaId',{
    //   params: {
    //     'regionId': this.data.etryHouseData.regionId //要传区ID
    //   }
    // }).then((res)=>{
        data.list.map((item)=>{
          this.data.areaBankuai.areaCity.push(JSON.parse(JSON.stringify(item).replace('zoneId', 'id').replace('zoneName', 'name')))
        })
        this.setData({
          'areaBankuai.areaCity': this.data.areaBankuai.areaCity,
          'areaBankuai.pickerDisabled': false
        })
    // })
    }
  }
})