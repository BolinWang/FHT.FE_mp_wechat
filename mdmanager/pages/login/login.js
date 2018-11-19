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
    mobile:null,
    textTime:'获取验证码',
    codeDis: false,
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
 
   submitLogin() {
    let that = this
    Ajax({
      url: '/hmsuser',
      method: 'loginByPassword',
      params: {
        userName: that.data.username,
        passWord: SHA2(that.data.password)
      },
    }).then(res => {
      if (res.code == 0) {
        wx.showToast({
          icon: 'none',
          title: '登录成功',
        })
        wx.setStorage({
          key: 'MLZFUSERNAME',
          data: that.data.username,
        })
        wx.setStorageSync('sessionId', res.data.sessionId)
        wx.setStorageSync('nickName', res.data.name)
        app.globalData.nickName = res.data.name
        app.globalData.sessionId = res.data.sessionId
        wx.redirectTo({
          url: '../personalCenter/personalCenter'
        })
      }
      }).catch(res => {
        console.log(res)
        if(res.code==='2010'){
          wx.setStorage({
            key: 'MLZFUSERNAME',
            data: that.data.username,
          })
          wx.setStorageSync('oldPassword', that.data.password)
          wx.setStorageSync('hasPassword', 'false')
          wx.redirectTo({  //设置密码
            url: '/pages/setPasword/setPasword'
          })
        }
      });
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