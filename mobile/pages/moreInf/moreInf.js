const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageId:0,
    Inf : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options);
    this.setData({
      actId : options.id
    })
    console.log(this.data.actId);
    //console.log("学号为：" + app.globalData.userStudyNum);
    wx.request({
      url: 'http://148.70.73.191:4396/actSignle',
      data:{
        actid: options.id
      },
      success(res){
        console.log(res);
        that.setData({
          Inf : res.data
        })
      }
    })
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

  /*前端测试判断函数，等后端接上后,该部分可以删除 */
  // judgeNumber(){
   
  //   if(this.data.pageId == 1)
  //   {
  //     this.setData({
  //       Inf : [{
  //         actTitle : "成电讲坛"
  //       }]
  //     })
  //   }
  //   else if(this.data.pageId == 2)
  //   {
  //       this.setData({
  //         Inf : [{
  //           actTitle : "成电有点骚"
  //         }]
  //       })
  //   }
  // },



  /***************************** */
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  goSubscribe(){
    var that = this;
    wx.showModal({
      title: '是否确认',
      confirmText: "确认",
      cancelText: '取消',
      success: function(res){
        console.log(res);
        if(res.confirm === true)
        {
          wx.request({
            url: 'http://148.70.73.191:4396/signup',
            data:{//活动id与学号传给后端N
              stdNumber: app.globalData.stdNumber,
              actid: that.data.pageId,
              actTime:that.data.Inf.actTime,
              actPlace: that.data.Inf.actPlace,
              actTitle: that.data.Inf.actTitle
            },
            method:"POST",
            success:function(res){
              if(res.data == true)
              {
                wx.showToast({
                  title: '成功!',
                  icon: "success",
                  duration: 2000
                });
              }
              else{
                wx.showToast({
                  title: '活动已预约',
                  image: "../img/fail.png",
                  duration: 2000
                })
              }
              console.log(res.data);
            }
          })
          //这里写传给后端的消息
        }
      }
    })
  }
})