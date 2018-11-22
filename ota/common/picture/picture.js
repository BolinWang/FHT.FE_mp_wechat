// common/picture/picture.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

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
  // 把图片转换成base64
  convertImageToBase64(){
    wx.arrayBufferToBase64(arraybuffer)
  },
  chooseImage() {
    //选择图片
    wx.chooseImage({
      count: '1',
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        const tempFilePaths = res.tempFilePaths[0]
        console.log(wx.arrayBufferToBase64(tempFilePaths))
      },
    })
  },
  urlTobase64(url) {
    wx.request({
      url: url,
      responseType: 'arraybuffer', //最关键的参数，设置返回的数据格式为arraybuffer
      success: res => {
        let base64 = wx.arrayBufferToBase64(res); //把arraybuffer转成base64
        base64 　= 'data:image/jpeg;base64,' + base64　//不加上这串字符，在页面无法显示的哦
        console.log(base64)　//打印出base64字符串，可复制到网页校验一下是否是你选择的原图片呢
      }
    })
  } 
})