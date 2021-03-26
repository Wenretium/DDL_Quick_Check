const db=wx.cloud.database()
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ddl:[],
    isShow:[true, true, true, true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true, true, true, true],
    nowtime:''

      
  },
  
  //查询记录
  getData(){
    db.collection("ddls").orderBy("deadline","asc").get({
    }).then(res=>{
    this.setData({
        ddl:res.data,
      })
    })
  },

  // 展开折叠选择  
  changeToggle:function(e){
    var index = e.currentTarget.dataset.index;
    if (this.data.isShow[index]){
      this.data.isShow[index] = false;
    }else{
      this.data.isShow[index] = true;
    }

    this.setData({
      isShow: this.data.isShow
    })
  },

  //删除数据
  deleteData:function(){
    var deltime = this.data.nowtime
    db.collection('ddls').where({deadline:deltime}).remove({
      success: function(res) {
        console.log(res.data)
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取当前时间
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      nowtime: time
    });
    
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
    this.getData()
    // this.deleteData()
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