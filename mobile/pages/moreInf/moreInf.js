const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageId:0,
    Inf : {}
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
    this.requestActionInf(this.data.actId)
    //console.log("学号为：" + app.globalData.userStudyNum);
    
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
   * 页面上拉触底事件的处理函数
   */
  requestActionInf(actId){
    let token = app.globalData.token;
    let that = this;
    wx.cloud.callFunction({
      name : "login",
      data : {
        $url : "detailInf",
        token,
        actId
      }
    })
    .then(res => {
      let real_data = res.result;
      if(res.code === "500"){
        console.log(res);
      }else{
        let inf = real_data.data;
        console.log(inf)
        that.setData({
          Inf : inf[0]
        })
      }
    })
    .catch(err => {
      console.log(err);
    })
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