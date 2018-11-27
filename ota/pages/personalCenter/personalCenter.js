// pages/personalCenter/personalCenter.js
const fetch = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hrefavatarUrl: '../../images/Group.svg',
    sessionId:null,
    nickName:'',
    mobile:'',
    enterHouseShow:false  // 点击录入房源展示弹层
  },
  // 获取个人信息
  getPersonal(){
    let that = this
    fetch('/user',{
      method:'info'
    }).then((res)=>{
      this.setData({
        nickName: res.accountName,
        mobile:res.mobile
      })
      console.log('用户信息',res)
    })
  },
  //展示录入房源弹层
  showEnterHouse(){
    this.setData({
      enterHouseShow:true
    })
  },
  //关闭录入房源弹层
  closeEnterHouse(){
    this.setData({
      enterHouseShow: false
    })
  },
  /**
   * 设置
   */
  setFun(){
    console.log('adfadsf')
    wx.navigateTo({
      url: 'centerSet/centerSet',
    })
  }, 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      enterHouseShow: false
    })
  },
 onLoad(){
   this.getPersonal();
 }

})