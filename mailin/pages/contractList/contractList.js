// pages/contractList/contractList.js
const Ajax = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tablist: [{  //1-待处理订单，2-已完成订单，3-已失效订单
      value: 0,
      label: '未签约'
    }, {
      value: 1,
      label: '当前合同'
    }, {
      value: 2,
      label: '已失效'
    }],
    activeTab: 0,
    contractList:[],
    winHeight: "",//高度
    showPullDown:false,
    urlList:null,
    swiperbox:true,
  },
  onItemClick(){  //关闭查看
    
    this.setData({
      swiperbox: true
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 88;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
  },
  getfile(e){

    let url = e.currentTarget.dataset.item.contentUrl

    if (url.indexOf("image") != -1){
      this.setData({
        urlList: url.split(","),
        swiperbox:false
      })
      
    }else{
      wx.navigateTo({
        url: `/pages/lookPdf/lookPdf?pdfUrl=${encodeURIComponent(url)}`
      })
    }
  },
  tabChoose(e) {   //点击选择

    this.setData({
      activeTab: e.target.dataset.current
    })
    
  },
  swiperTab(e) {  //滑动选择
    this.setData({
      activeTab: e.detail.current
    })
    this.getcontractList()
  },
  getmethods(){
    let methods=null
    switch (this.data.activeTab) {
      case 0:
        methods = 'unsignedContractList'
        break
      case 1:
        methods = 'currentContractList'
        break;
      case 2:
        methods = 'invalidContractList'
      default:
    }
    return methods
  },
  getcontractList(){
    let methods = this.getmethods()
      Ajax({
        url: '/contract',
        method: methods,
        params: {
        }
      }).then(res => {
        this.setData({
          showPullDown:true
        })
        if (res.data.contractList && res.data.contractList.length>0){
          this.setData({
            contractList: res.data.contractList.slice(0, 20),
          })
        } else {
          this.setData({
            contractList: [],
          })
        }
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getcontractList()
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
    wx.showNavigationBarLoading()
    setTimeout(() => {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
    this.getcontractList()
   
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