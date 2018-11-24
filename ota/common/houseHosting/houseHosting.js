import { validateMobile } from '../../utils/validate.js'
Component({
  /**
   * 页面的初始数据
   */
  data: {
    active: '0',
    roomSetShow:false,//房间设施选择弹层
    steps: [
      {
        desc: '房间'
      },
      {
        desc: '价格'
      }
    ],
    roomDirectionList: [
      {
        label: '朝南',
        value: 1
      },
      {
        label: '朝北',
        value: 2
      },
      {
        label: '朝东',
        value: 3
      },
      {
        label: '朝西',
        value: 4
      },
      {
        label: '东南',
        value: 5
      },
      {
        label: '西南',
        value: 6
      },
      {
        label: '东北',
        value: 7
      },
      {
        label: '西北',
        value: 8
      }
    ],
    checkItems:[
      { name: ' 床', value: 1 },
      { name: '洗衣机', value: 2},
      { name: '空调', value: 3},
      { name: '冰箱', value: 4 },
      { name: '电视', value: 5},
      { name: '宽带', value: 6},
      { name: '沙发', value: 7 },
      { name: '茶几', value: 8},
      { name: '书桌', value: 9},
      { name: '餐桌', value: 10},
      { name: '独卫', value: 11},
      { name: '衣柜', value: 12 }
    ],
    houseDirectionLabel:'',
    facilityItemsName:'',
    hostingInfo:{  // 房源参数
      contactName: '',//联系人
      contactMobile:'', //看房人电话
      houseArea:'',//房间面积
      houseDesc: '',//房间描述
      houseDirection: '', //朝向
      facilityItems:'',//房间设施
      pictures: [{
        "imageName": "imageName",
        "isBase64": 1,
        "src": "src"
      }],
    },
    errorTips:{
      contactName:'请输入联系人姓名',
      contactMobile:'请输入联系人电话',
      houseArea:'请输入房屋面积',
      houseDesc:'请给房间添加描述',
      houseDirection:'请选择朝向',
      pictures:' 请上传图片'
    }
  },
  methods: {
    //输入框获取值
    onChange(e) {
      console.log(e.currentTarget.dataset.id)
      this.data.hostingInfo[e.currentTarget.dataset.id] = (typeof e.detail === 'string') ? e.detail : e.detail .value
      this.setData({
        hostingInfo: this.data.hostingInfo
      })
      if (e.currentTarget.dataset.id === 'houseArea'){
        this.setData({
          'hostingInfo.houseArea':(this.data.hostingInfo.houseArea*1).toFixed(2)
        })
      }
      console.log(this.data.hostingInfo)
    },
    /*朝向picker*/
    directionPickerChange(e){
      this.setData({
        'hostingInfo.houseDirection': e.detail.value*1+1
      })
      this.setData({
        houseDirectionLabel: this.data.roomDirectionList[e.detail.value].label
      })
    },
    //房间设置选择
    checkboxChange(e){
      const houseDirectArray= e.detail.value.map((item,index,key)=>{
        return item.split(',')
      })
      const facilityItems = houseDirectArray.map((item)=>{
        return item[0]
      })
      const facilityItemsName = houseDirectArray.map((item)=>{
        return item[1]
      })
      this.setData({
        'hostingInfo.facilityItems': facilityItems.join(','),
        facilityItemsName: facilityItemsName.join(',')
      })

    },
    sureRoomSetClick(){
      this.setData({
        roomSetShow: false
      })
    },
    showPopuRoomSet(){
      this.setData({
        roomSetShow:true
      })
    },
    textareaBlur(e){
      this.setData({
        'hostingInfo.houseDesc': e.detail.value
      })
      console.log(this.data.hostingInfo.houseDesc)
    },
    showTips(text){
      wx.showToast({
        title: text,
        icon: 'none',
        duration: 2000
      })
    },
    // 验证表单
    formValidate(){
      if (this.data.hostingInfo.contactName === ''){
        this.showTips(this.data.errorTips.contactName)
        return false
      }
      if (!this.data.hostingInfo.contactMobile) {
        this.showTips(this.data.errorTips.contactMobile)
        return false
      } else if (!validateMobile(this.data.hostingInfo.contactMobile)){
        this.showTips('手机号码错误')
        return false
      }
      if (!this.data.hostingInfo.houseArea || this.data.hostingInfo.houseArea*1 === 0) {
        this.showTips(this.data.errorTips.houseArea)
        return false
      } 
      if (!this.data.hostingInfo.houseDirection) {
        this.showTips(this.data.errorTips.houseDirection)
        return false
      }
      if (!this.data.hostingInfo.houseDesc) {
        this.showTips(this.data.errorTips.houseDesc)
        return false
      }
      return true
    }
  },
 //校验
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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