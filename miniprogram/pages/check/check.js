// pages/check/check.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mypin:0,
    PIN:****,

  },

  //解锁进入编辑页面
  unlock: function(options){
    var app = getApp();  //声明app实例
    wx.switchTab({
      url:'../edit/edit',  //跳转
      success:function(res){
        app.globalData.isLocked=false  //改变全局变量
      }
    })
  },
  
  //提交密码
  submit_pin(res){
    var mypin=res.detail.value.pin
    this.setData({
      mypin:mypin
    })
    if(mypin==this.data.PIN){
      this.unlock()
      wx.showToast({
        title: '解锁成功',
        icon:'success'
      })}
    else
      wx.showToast({
        title: '您没有编辑权限',
        icon:'none'
      })
  },

  //返回查看页面
  returnShow:function(){
    wx.switchTab({
      url: '../show/show',
    })
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
