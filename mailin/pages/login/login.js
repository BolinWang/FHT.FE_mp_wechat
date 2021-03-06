// pages/login/login.js
const Ajax = require('../../utils/api.js')
import {SHA2} from '../../utils/shaEncrypt.js'
import { validateMobile } from  '../../utils/validate.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      id: '0',
      title: '密码登录'
    }, {
        id: '1',
        title: '验证码登录'
      }],   
    tabActive:'0',
    mobile:null,
    textTime:'获取验证码',
    codeDis: false,
    vcode:null,  //验证码
    password:null,
    username:null,
    activeInput: null
  },
  goLogin(){   //账号密码登陆
    if(!this.data.username){
      wx.showToast({
        icon: 'none',
        title: '手机号不能为空',
      })
    }else if(!this.data.password){
      wx.showToast({
        icon: 'none',
        title: '请输入密码',
      })
    } else if (!validateMobile(this.data.username)){
      wx.showToast({
        icon:'none',
        title: '手机号码格式不正确',
      })
    }else {
      this.submitLogin()
    }

  },
  submitLogin(){
    let that = this
    Ajax({
      url: '/customer',
      method: 'loginByPassword',
      params: {
        username: that.data.username,
        password: SHA2(that.data.password)
      },
    }).then(res => {
      if(res.code==0){
        wx.showToast({
          icon: 'none',
          title: '登录成功',
        })
        wx.setStorage({
          key: 'MLZFUSERNAME',
          data: that.data.username,
        })
        wx.setStorageSync('sessionId', res.data.sessionId)
        app.globalData.sessionId = res.data.sessionId
        wx.redirectTo({
          url: '../personalCenter/personalCenter'
        })
      }
    })
  },
  tapName(e){
    const tabId=e.currentTarget.dataset.id;
    this.setData({
      tabActive: tabId
    })
  },
  // 获取手机号码
  getMobile(e){
    this.setData({
      mobile: e.detail.value.replace(/\s+/g, '')
    })
  },
  getUsername(e){
    this.setData({
      username: e.detail.value.replace(/\s+/g, '')
    })
  },
  //获取密码
  getPassword(e){
    this.setData({
      password: e.detail.value.replace(/\s+/g, '')
    })
  },
  //发送手机验证码
  sendCode(){
    let that = this
    if (!that.data.mobile){
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return false;
    }
    Ajax({
      url: '/customer',
      method: 'sendCheckcode',
      params: {
        mobile: that.data.mobile,
        
      },
    }).then(res => {
      if(res.code==0){
        wx.showToast({
          title: '短信验证码已发送',
          icon: 'none'
        })
        that.setData({
          phoneCode: "60's后重新获取"
        })
        //验证倒计时 60s
        let phoneCode = '60'
        let time=setInterval(()=>{
          phoneCode--
          that.setData({
            textTime:`${phoneCode}'s后重新获取`,
            codeDis:true
          })
         if (phoneCode==0){
            clearInterval(time)
           that.setData({
               textTime: "重新发送验证码",
               codeDis: false
             })
          }
       },1000)
      }else{
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      }
    }).catch(res => {
      console.log(res)
    })
  },
  //验证码登陆
  formSubmitcode(e){
    let that = this
    this.setData({
      mobile: e.detail.value.mobile.replace(/\s+/g, ''),
      vcode: e.detail.value.vcode.replace(/\s+/g, '')
    })
    Ajax({
      url: '/customer',
      method: 'loginByVcode',
      params: {
        mobile: that.data.mobile,
        vcode: that.data.vcode
      },
    }).then(res => { 
       if (res.code == 0) {
         wx.setStorageSync('sessionId',res.data.sessionId)
         app.globalData.sessionId = res.data.sessionId
         wx.setStorageSync('hasPassword', res.data.hasPassword)
         app.globalData.hasPassword = res.data.hasPassword
         wx.redirectTo({
            url: '../setPasword/setPasword'
         })
       }
    }).catch(res => {
    })
  },
  clearInput(e) {
    let inputType = e.currentTarget.dataset.inputType // 1.username 2.password 3.mobile
    let tempData = {}
    switch (e.currentTarget.dataset.inputType) {
      case '1':
        tempData = {
          username: ''
        }
        break;
      case '2':
        tempData = {
          password: ''
        }
        break;
      case '3':
        tempData = {
          mobile: ''
        }
        break;
    }
    this.setData(tempData)
  },
  showClearIcon(e) {
    this.setData({
      activeInput: e.currentTarget.dataset.inputType
    })
  },
  hideClearIcon(e) {
    this.setData({
      activeInput: '0'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 记录上次用户登录的用户名
    wx.getStorage({
      key: 'MLZFUSERNAME',
      success: (res) => {
        this.setData({
          username: res.data,
          mobile: res.data
        })
      }
    })
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
    if (wx.getStorageSync('sessionId')){
      wx.reLaunch({   //个人中心
        url: '/pages/personalCenter/personalCenter'
      })
     }
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