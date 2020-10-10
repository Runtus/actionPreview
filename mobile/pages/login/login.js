var app = getApp();

// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    puId:"",
    password:""
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
 

  inputa: function (e) {
    this.setData({
      puId: e.detail.value
    });
  },
  inputb: function (e) {
    this.setData({
      password: e.detail.value
    });
  },

  // 登录函数
  login:function(e){
    console.log(this.data.puId)
    console.log(this.data.password)
    var that = this;
    wx.showLoading({
      title: '正在登录',
    })
    wx.cloud.callFunction({
      name : "login",
      data : {
        $url : "login",
        stuId : that.data.puId,
        stuPass : that.data.password
      }
    })
    .then(res => {
      console.log(res);
      let real_data = res.result;
      if(real_data.code === 500 || real_data.code === "500"){
        wx.hideLoading();
        wx.showToast({
          title: '密码错误',
          image : "/pages/img/error.png",
          duration : 1000
        })
      }else{
        wx.showToast({
          title: '登录成功',
          duration : 1000
        });
        app.globalData.token = real_data.data; // 存取token
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/actualTime/actualTime',
          })
        },1000)
      }
    })
    .catch(err => {
      console.log(err)
      wx.hideLoading();
      wx.showToast({
        title: '服务器异常',
        image : "/pages/img/error.png"
      })
    })
    
  },
  
})