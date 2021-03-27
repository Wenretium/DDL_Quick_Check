const db=wx.cloud.database()
var app = getApp();  //声明app实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
      ddl:"",
      bigImg:'',
      face_list:[],
 
  },
  
  // //添加数据
  // addData(){
  //   wx.showLoading({
  //     title: '数据加载中哦...',
  //     mask:true
  //   })
  //   db.collection("demolist").add({
  //     data:{
  //       title:"测试标题",
  //       author:"某人",
  //       content:"测试内容内容hhhhhh"
  //     }
  //   }).then(res=>{
  //     console.log(res)
  //     wx.hideLoading()
  //   })
  // },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  
  bindDateChange: function(e) {
    console.log('第一个picker选择值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  bindDateChange2: function(e) {
    console.log('第二个picker选择值为', e.detail.value)
    this.setData({
      date2: e.detail.value
    })
  },

  //提交表单，添加进数据库
  btnSub(res){
    wx.showLoading({
      title: '添加中哦...',
      mask:true
      })
    // var res_value=res.detail.value
    console.log(res.detail.value)
    var subject=res.detail.value.subject
    var detail=res.detail.value.detail
    var content=res.detail.value.content
    var deadline=res.detail.value.add_data
    var img=this.data.bigImg
    complete: () => {
      wx.hideLoading()
    }
    //添加数据到数据库
    db.collection("ddls").add({
      data:{
        subject:subject,
        detail:detail,
        content:content,
        deadline:deadline,
        img:img
      }
    }).then(res=>{
      console.log(res)
      wx.hideLoading()
      wx.showToast({
        title: '添加成功',
        icon:'success'
      })
    })
    //重置数据
    this.setData({
      bigImg:''
      })
  },

  //查询记录
  getData(){
    db.collection("ddls").orderBy("deadline","asc").get({
    }).then(res=>{
      this.setData({
        ddl:res.data,
      })
      console.log(this.data.ddl)
      let ddl_list=this.data.ddl;
      var face;
      var nface_list=[];
      for(var i = 0; i < ddl_list.length; i++) {
        face=ddl_list[i].subject+' '+ddl_list[i].detail+' '+ddl_list[i].deadline
        nface_list.push(face)
        // console.log(nface_list)
      }
      this.setData({
        face_list:nface_list
      })
    }) 
  },

  //选择日期
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  //删除数据库中指定数据
  // btnSub_del(res){
  //   wx.showLoading({
  //     title: '删除中哦...',
  //     mask:true
  //     })
  //   var ddeadline = res.detail.value.deadline
  //   db.collection("ddls").where({deadline:ddeadline}).remove()
  //   .then(res=>{
  //     console.log(res);
  //     wx.hideLoading();
  //     if(res.stats.removed==0)
  //       wx.showToast({
  //         title: '无此内容',
  //         icon:'none'
  //       })
  //     else
  //       wx.showToast({
  //         title: '删除成功',
  //         icon:'success'
  //       })
  //   })
  // },

  btnSub_del(res){
    wx.showLoading({
      title: '删除中哦...',
      mask:true
      })
    //拆分字符串
    // console.log(res.detail.value.data_del)
    var data_del=res.detail.value.data_del
    var arr=data_del.split(' ')
    console.log(arr)
    var sub=arr[0]
    var det=arr[1]
    var deadl=arr[2]
    db.collection("ddls").where({subject:sub,detail:det,deadline:deadl}).remove()
    .then(res=>{
      console.log(res);
      wx.hideLoading();
      if(res.stats.removed==0)
        wx.showToast({
          title: '无此内容',
          icon:'none'
        })
      else
        wx.showToast({
          title: '删除成功',
          icon:'success'
        })
    })

  },

  btnSub_del_date(res){
    wx.showLoading({
      title: '删除中哦...',
      mask:true
      })
      var deadl=res.detail.value.del_data
      db.collection("ddls").where({deadline:deadl}).remove()
      .then(res=>{
        console.log(res);
        wx.hideLoading();
        if(res.stats.removed==0)
          wx.showToast({
            title: '无此内容',
            icon:'none'
          })
        else
          wx.showToast({
            title: '删除成功',
            icon:'success'
          })
      })
  },

  //添加图片
  add_pics(){
    let that = this;
    let openid = app.globalData.openid || wx.getStorageSync('openid');
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        });
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let filePath = res.tempFilePaths[0];
        const name = Math.random() * 1000000;
        const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,//云存储图片名字
          filePath,//临时路径
          success: res => {
            console.log('[上传图片] 成功：', res)
            wx.showToast({
              title: '图片上传成功',
              icon:'success'
            })
            that.setData({
              bigImg: res.fileID,//云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
            });
            
          },
           fail: e => {
            console.error('[上传图片] 失败：', e)
            wx.showToast({
              title: '图片上传失败',
              icon:'none'
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        });
      }
    })
  },

  //退出编辑页面
  lock: function(options){

    wx.redirectTo({
      url: '../check/check',
      success: function(res){
        console.log('跳转到news页面成功')// success
      },
      fail: function() {
      console.log('跳转到news页面失败')  // fail
      },
      complete: function() {
        console.log('跳转到news页面完成') // complete
      }
    })
    
  },

  //再次锁住（没用到）
  relock:function(){
    app.globalData.isLocked=true
    wx.navigateTo({
      url: '../check/check',
    })
    wx.showToast({
      title: '锁定成功',
      icon:'success'
    })
  },
    

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    if(app.globalData.isLocked)
      this.lock()
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
