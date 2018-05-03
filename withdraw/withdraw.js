const Ajax = require('../../utils/util.js')
let appInstance = getApp()
Page({
  data: {
    items: [],
    userMobile: '',
    applyModel: true,
    cancelModel: true,
    lookModel: true,
    isShow:false,
    payeeShortCardNo: '',
    actualMoney: '',
    current: '',
    isNoData: false,
    currentLine: '',
    refuseReason: '',
    cardName: '',
    cardNo: ''
  },
  onShareAppMessage (res) {
    return {
      imageUrl: '/images/share.png',
      path: '/pages/withdraw/withdraw',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  onShow () {
    var loginTime = wx.getStorageSync('loginTime') || 0
    let nowTime = new Date().getTime()
    if ((nowTime - loginTime) > (1000 * 3600 * 12)) {//12个小时免登陆
      appInstance.globalData.sessionId = null;
      wx.redirectTo({
        url: '/pages/index/index'
      })
      return 
    }
    if (appInstance.globalData.sessionId) {
      let userMobile = wx.getStorageSync('userMobile')
      this.setData({
        userMobile: userMobile,
        isShow: true
      })
      this.getDataList()
    }
    
  },
  loginOut () {
    wx.showModal({
      content:'确定退出当前登录账号吗？',
      success (res) {
        if (res.confirm) {
          wx.setStorageSync('loginTime', 0)
          wx.setStorageSync('sessionId',null)
          wx.redirectTo({
            url: '/pages/index/index'
          })
        }
      }
    })
  },
  onPullDownRefresh() {
    this.getDataList()
    wx.stopPullDownRefresh();
    
  },
  getDataList () {//获取数据列表
    wx.showLoading({
      title:'数据加载中'
    })
    Ajax({
      url: '/withdraw',
      method: 'queryWaitWithdraw',
    }).then(res => { 
      wx.hideLoading()
      if (res.data && res.data.length > 0) {
        this.setData({
          items: res.data || [],
          isNoData: false
        })
        
      } else {
        this.setData({
          isNoData: true,
          items: []
        })
      }
      
    }).catch(res => {
    })
  } ,
  //取消按钮  
  cancel () {  
    this.setData({  
      applyModel: true,
      cancelModel: true,
      lookModel: true
    });  
  },
  confirmCancel() {//撤销申请确定
    if (this.data.refuseReason == '') {
      wx.showToast({
        title: '撤销原因不能为空',
        icon: 'none'
      })
      return false;
    }
    wx.showLoading()
    Ajax({
      url: '/withdraw',
      method: 'refuseApply',
      params: {
        applyNo: this.data.currentLine.applyNo,
        refuseReason: this.data.refuseReason
      }
    }).then(res => {
      this.setData({
        cancelModel: true,
        refuseReason: ''
      })
      wx.showToast({
        title: '操作成功'
      })
      this.getDataList()
    }).catch(res => {})
  },
  confirmApply () {  //确认放款
    let url = 'confirmApply';
    if (this.data.currentLine.status == 2 && this.data.currentLine.payStatus == 5) {
      url = 'finalConfirmApply'
    }
    wx.showLoading()
    Ajax({
      url: '/withdraw',
      method: url,
      params: {
        applyNo: this.data.currentLine.applyNo
      }
    }).then(res => {
      this.setData({
        applyModel: true
      })
      wx.showToast({
        title: '操作成功'
      })
      this.getDataList()
    }).catch(res => {})
  },
  lookFn (e) {//查看
    wx.showLoading()
    Ajax({
      url: '/withdraw',
      method: 'queryWithdrawCard',
      params: {
        payeeCardId: e.target.dataset.line.payeeCardId
      }
    }).then(res => {
      wx.hideLoading()
      this.setData({  
        lookModel: false,
        cardName: res.data.name,
        cardNo: res.data.cardNo
      })
    }).catch(res => {})
    
  },
  cancelApply (e) {//撤销
    let thisData = e.target.dataset
    if (thisData.disabled) {
      return 
    }
    this.setData({  
      cancelModel: false,
      current: e.target.dataset.index,
      currentLine: e.target.dataset.line
    })
  },
  cancelInput () {
    this.setData({  
      cancelModel: true,
      refuseReason: ''
    })
  },
  getReason (e) {
    this.setData({
      refuseReason: e.detail.value.trim()
    })
  },
  loan (e) {//放款
    let thisData = e.target.dataset
    let line = thisData.line;
    if (thisData.disabled) {
      return 
    }
    this.setData({  
      applyModel: false,
      current: thisData.index,
      currentLine: line,
      payeeShortCardNo: line.payeeShortCardNo,
      actualMoney: line.actualMoney
    })  
  }
})
