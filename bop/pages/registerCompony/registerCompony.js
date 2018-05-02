// pages/registerCompony/registerCompony.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    organizationStepOneVO: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 监听输入框
   */
  bindKeyInput(e) {
    this.data.organizationStepOneVO[e.currentTarget.id] = e.detail.value
    this.setData({
      'organizationStepOneVO': this.data.organizationStepOneVO
    })
  },

  /**
   * 下一步
   */
  nextStep() {
    const validateItems = [{
      name: 'organizationName',
      value: '企业名称'
    },{
      name: 'displayName', 
      value: '企业缩写名'
    },{
      name: 'orgLicence',
      value: '信用代码'
    },{
      name: 'orgLegalPersonName',
      value: '法人姓名'
    },{
      name: 'orgLegalPersonCardNo',
      value: '法人身份证号'
    }]
    let validateFlag = true
    validateItems.reverse().map((item, index) => {
      if (!this.data.organizationStepOneVO[item.name]) {
        wx.showToast({
          title: '请输入' + item.value,
          icon: 'none',
          duration: 2000
        })
        validateFlag = false
        return false
      }
    })
    if (validateFlag) {
      app.fetch('market/organization', {
        method: 'realNameAuth',
        params: {
          name: this.data.organizationStepOneVO.orgLegalPersonName,
          cardNo: this.data.organizationStepOneVO.orgLegalPersonCardNo
        }
      }).then((response) => {
        wx.navigateTo({
          url: 'componyInfo/componyInfo?organizationStepOneVO=' +
          JSON.stringify(this.data.organizationStepOneVO)
        })
      })
    }
  },

  /**
   * 进入下一步输入
   */


  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '复恒运营小助手',
      path: '/pages/login/login',
      success: function (res) {

      },
      fail: function (res) {

      }
    }
  }
})