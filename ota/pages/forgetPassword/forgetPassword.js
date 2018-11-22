import { validateMobile } from '../../utils/validate.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title:'找回密码',
    text: '获取验证码',
    currentTime: 5, //倒计时
    disabled: false, //按钮是否禁用
    color:'#333',
    newPassw:'',
    phone:'',
    code:''
  },
  //获取验证码
  getCode(){
    if (!this.data.disabled){
      if(!this.checkPhone()){
        return false
      }
      let that = this
      var time = this.data.currentTime
      const interval = setInterval(() => {
        time--;
        that.setData({
          text: time + 's 后重新发送', //按钮文字变成倒计时对应秒数
          disabled:true,
          color:'#bbb'
        })
        if (time <= 0) {
          clearInterval(interval)
          that.setData({
            text: '重新发送',
            disabled: false,
            currentTime:5,
            color:"#333"
          })
        }
      }, 1000)
    }
  },
  onChange(e){
    console.log(e.detail.value)
    if(e.currentTarget.dataset.name === 'phone'){
      this.setData({
        phone: e.detail.value
      })
      // if (!validateMobile(e.detail.value)){
      //   wx.showToast({
      //     icon: 'none',
      //     title: '手机号码格式不正确',
      //   })
      // }
    } else if (e.currentTarget.dataset.name === 'newPassw'){
      this.setData({
        newPassw: e.detail.value
      })
    } else if (e.currentTarget.dataset.name === 'code') {
      this.setData({
        code: e.detail.value
      })
    }
  },
  checkPhone(){
    if (!this.data.phone){
      wx.showToast({
        icon: 'none',
        title: '手机号不能为空',
      })
      return false
    }
    if (!validateMobile(this.data.phone)) {
      wx.showToast({
        icon: 'none',
        title: '手机号码格式不正确',
      })
      return false
    }
  },
  checkCode(){
    if (!this.data.code) {
      wx.showToast({
        icon: 'none',
        title: '验证码不能为空',
      })
      return false
    }
    if (this.data.code !== '1234') {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的短信验证码',
      })
      return false
    }
  },
  checkPassw(){
    if(!this.data.newPassw){
      wx.showToast({
        icon: 'none',
        title: '密码不能为空',
      })
      return false
    }
    if (this.data.newPassw.length > 12 || this.data.newPassw.length > 6){
      wx.showToast({
        icon: 'none',
        title: '请输入6-12位密码',
      })
      return false
    }
  },
  resetPassw(){
    // this.checkPhone();
    // this.checkCode()
    // this.checkPassw()
    // if (!this.checkPhone()){
    //   return false;
    // }
    console.log(this.checkCode())
    // if (!this.checkCode()){return false}
    // if (!this.checkPassw()) { return false }
  }
})