// pages/demo1/demo1.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //增加一条数据
  updateData(){
    db.collection("demolist").doc("28ee4e3e605885690bfd5e0103b2f64b").update({
      data:{
        author:"谁啊",
        posttime:"2021-2-2"
      }
    }).then(res=>{
      console.log(res)
    })
  },

  //删除一条记录
  deleteData(){
    db.collection("demolist").doc("28ee4e3e60588cff0bfed00e39000426"    ).remove()
    .then(res=>{
      console.log(res)
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