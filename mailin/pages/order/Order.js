// pages/order/Order.js
const Ajax = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tablist: [{  //1-待处理订单，2-已完成订单，3-已失效订单
      value: 0,
      label:'待处理'
     },{
      value: 1,
      label: '已完成'
     },{
      value: 2,
      label: '已失效'
     }],
     activeTab:0,
     showPullDown:false,
     winHeight:null,
     orderList:null,
     swiperbox: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      activeTab: options.activeTab || 0
    })
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 88;
        that.setData({
          winHeight: calc
        });
      }
    });
  },
  tabChoose(e){   //点击选择
    
    this.setData({
      activeTab: e.target.dataset.current
    })
  },
  swiperTab(e){  //滑动选择
    this.setData({
      activeTab: e.detail.current
    })
    this.getOrderList()
  },
  cancelOrder(e){  //取消订单
    let orderNo = e.target.dataset.order 
    let orderType = e.target.dataset.ordertype == 4 ? 2 : 1
    let that = this
      wx.showModal({
        title: '提示',
        content: '您确定取消此订单么',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.cancelFun(orderNo, orderType)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
  },
  cancelFun(orderNo, orderType){  //取消
    Ajax({
      url: '/order',
      method: 'cancelOrder',
      v: '2.3',
      params: {
        orderNo: orderNo,
        type: orderType
      }
    }).then(res => {
      wx.showToast({
        title: '订单已取消',
        icon: 'success',
        duration: 2000
      })
      this.getOrderList()
    })
  },
  goNext(e){    //待处理订单点击按钮
    let item = e.target.dataset.item
    if (item.showButton == 1) {  //签约
      this.signContract(item)
    } else if (item.showButton == 5){  //立即支付
      this.payTest(item)
    } else if (item.showButton == 6){  //联系房东
      this.goTell(item)
    }
 },
  goTell(item) {  //拨打房东电话
    wx.makePhoneCall({
      phoneNumber: item.landlordMobile
    })
  },
  signContract(item){  //签约
    this.testContract(item).then(res => {
 
          //当订单状态为未付款，且 合同签约状态为未签约或者生成中时
       if( res.orderStatus == 1 && (res.contractStatus == 1 || res.contractStatus == 4)){
          //是否更改过价格true-是，false-否
          if (!res.operatedPrice) {
            //订单是否在修改中 true-是，false-否
            if (!res.operating) {
              //校验合同是否生成
              this.checkPdf(item).then(res => { 
                wx.navigateTo({
                  url: `/pages/sign/sign?contractNo=${res.data.contractNo}&activeTab=${this.data.activeTab}`
                })
              })
            } else {
              //改价用户是否存在
              while(res.operator != null) {
                this.getOrderList();
                wx.showToast({
                  title: '房东正在修改价格，请稍后重试',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          } else {
            this.getOrderList();
            wx.showToast({
              title: '订单价格已变更，正在为您刷新',
              icon: 'none',
              duration: 2000
            })
          }
     }else{
         if(res.orderStatus==4){
           wx.showToast({
             title: '房东已取消订单，该订单已失效',
             icon: 'none',
             duration: 2000
           })
         }else{
           wx.showToast({
             title: '订单状态已变更，正在为您刷新',
             icon: 'none',
             duration: 2000
           })
         }
        this.getOrderList();
      }
    })
  },
  checkPdf(item){  //校验合同
    return new Promise((resolve, reject) =>Ajax({
      url: '/contract',
      method: 'orderContract',
      v: '3.2.0',
      params: {
        orderNo: item.orderNo,
        type: item.orderType
      }
    }).then(res => {
      if (!res.data.canSign){
        wx.showToast({
          title: '合同正在生成中，请稍后重试',
          icon: 'none',
          duration: 2000
        })
        this.getOrderList();
      }else{
        resolve(res)
      }
    }))
  },
  testContract(item){  //验证价格
    return new Promise((resolve, reject) =>Ajax({
      url: '/order',
      method: 'priceConfirm',
      v: '3.2.0',
      params: {
        orderNo: item.orderNo,
        orderVersion: item.orderVersion
      }
    }).then(res =>{
       resolve(res.data)
    }))
  },

  goLookPdf(e){  //查看pdf
    let item = e.target.dataset.item
    this.checkPdf(item).then(res => {
     Ajax({
       url: '/contract',
       method: 'queryContract',
       params: {
         contractNo: res.data.contractNo
       }
     }).then(res => {
       this.getfile(res.data.contentUrl)
     })
    })

    // let url = `https://test.mdguanjia.com/myhome/html/wechat/pdf_view/examples/mobile-viewer/viewer.html?type='1'&orderNo=${e.currentTarget.dataset.order}&sessionId=${wx.getStorageSync('sessionId')}&t=${new Date().getTime()}`
    // console.log(url)
    // wx.navigateTo({
    //   url: `/pages/lookPdf/lookPdf?pdfUrl=${encodeURIComponent(url)}`
    // })
  },
  getfile(contractUrl) {   //判断合同类型是图片还是pdf

    let url = contractUrl

    if (url.indexOf("image") != -1) {
      this.setData({
        urlList: url.split(","),
        swiperbox: false
      })

    } else {
      wx.navigateTo({
        url: `/pages/lookPdf/lookPdf?pdfUrl=${encodeURIComponent(url)}`
      })
    }
  },
  onItemClick() {  //关闭查看

    this.setData({
      swiperbox: true
    });
  },
  payTest(item) {  //支付按钮 source ==1订单类型
    this.testContract(item).then(res => {
     //当前状态为预留或者定金直接前去支付
      if (item.orderType==4){
        this.goPay(item)
      }else{
          //当订单状态为 1-未付款，2-已付款未签约（旧的单子），3-生效，4-取消，5-申请退款，6-关闭，7-审核中，8-支付中，99-完成
        if( res.orderStatus==1){
           //是否改价过：true-是，false-否
            if (!res.operatedPrice){
              //是否操作中：true-是，false-否
              if (!res.operating){
                this.goPay(item)
              }else{
                if (res.operator!=null){
                  this.getOrderList()
                  wx.showToast({
                    title: '房东正在修改价格，请稍后重试',
                    icon: 'none',
                    duration: 2000
                  })
                }
              }
            }else{
              this.getOrderList()
              wx.showToast({
                title: '订单价格已变更，正在为您刷新',
                icon: 'none',
                duration: 2000
              })
            }
         } else{
             //当前订单取消
            if (res.orderStatus==4){
              wx.showToast({
                title: '房东已取消订单，该订单已失效',
                icon: 'none',
                duration: 2000
              })
            }else{
              wx.showToast({
                title: '订单状态已变更，正在为您刷新',
                icon: 'none',
                duration: 2000
              })
           }
            this.getOrderList()
          }
        }
    })
  },
  goPay(item){  //去支付页面
    wx.navigateTo({
      url: `/pages/payment/payment?source=1&billNo=${item.orderNo}&money=${item.totalFee}`
    })

  },
  goOverBtn(e){
    let item = e.target.dataset.item
    if (item.orderStatus == 3 && item.orderType == 4){
      this.signContract(item)
    }
  },
  //获取列表
  getOrderList() {  // 查看合同 2 ordertype=3   orderStatu=3&&ordertype=4  办理入住    
   //已取消  status=4 type =4 
    this.setData({
      showPullDown: false
    })
    Ajax({
      url: '/order',
      method: 'queryOrderList',
      params: {
        type:this.data.activeTab+1,
        openId: null
      }
    }).then(res => {
       this.setData({
         orderList: res.data.orderList,
         showPullDown: true
       })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getOrderList()
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
    this.setData({
      showPullDown: false
    })
    this.getOrderList()

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