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
    showReasons: {
      type: Boolean,
      value: false
    },
    reviewRemark: {
      type: String,
      value: ''
    }
  },
  data: {
    textarea: '',
    discrepancyReasonData: {
      inputVal: '',
      reasons: []
    },
    discrepancyReasonList: [
      { label: '缺少小区环境图', value: '缺少小区环境图' },
      { label: '缺少公区图片（阳台/客厅/（过道）/厨房/卫生间 至少2种类型）', value: '缺少公区图片（阳台/客厅/（过道）/厨房/卫生间 至少2种类型）' },
      { label: '缺少房间图片', value: '缺少房间图片' },
      { label: '电器/物品有损坏', value: '电器/物品有损坏' },
      { label: '环境脏乱差', value: '环境脏乱差' }
    ]
  },
  methods: {
    checkboxChange(e) {
      this.setData({
        'discrepancyReasonData.reasons': e.detail.value
      })
    },
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
    getInputvalue(e) {
      this.setData({
        'discrepancyReasonData.inputVal': e.detail.value
      })
    },
    Sure() {
      if (this.data.showReasons) {
        let reasonResult = this.data.discrepancyReasonData.reasons || [];
        if (this.data.discrepancyReasonData.inputVal) {
          reasonResult.push(this.data.discrepancyReasonData.inputVal)
        }
        if (reasonResult.length === 0) {
          wx.showToast({
            title: '请选择不符合原因',
            icon: 'none',
            duration: 2000
          })
          return false
        }
        this.triggerEvent('emitSure', reasonResult.join('、'))
        this.setData({
          modelHidden: true
        })
      }else if (this.data.showTextarea) {
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
