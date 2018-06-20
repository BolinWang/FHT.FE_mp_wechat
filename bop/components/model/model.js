// components/model/model.js
Component({
  properties: {
    modelHidden: {
      type: Boolean,
      value: true
    },
    modelMsg: {
      type: String,
      value: ' ',
    },
    modelTitle: {
      type: String,
      value: '提示',
    },
    showTitle: {
      type: Boolean,
      value: true
    },
    showCancel: {
      type: Boolean,
      value: false
    },
    showTextarea: {
      type: Boolean,
      value: false
    },
    reviewRemark: {
      type: String,
      value: ''
    }
  },
  data: {
    textarea: ''
  },
  methods: {
    model_click_Hidden() {
      this.setData({
        modelHidden: true,
        textarea: ''
      })
    },
    getTextvalue(e) {
      this.setData({
        textarea: e.detail.value
      })
    },
    Sure() {
      if (this.data.showTextarea) {
        if (!this.data.textarea) {
          wx.showToast({
            title: '请输入原因',
            icon: 'none',
            duration: 2000
          })
          return false
        }
        this.triggerEvent('emitTextarea', this.data.textarea)
        this.setData({
          modelHidden: true
        })
      } else {
        this.triggerEvent('emitSure', this.data.reviewRemark)
        this.setData({
          modelHidden: true
        })
      }
    }
  }
}) 
