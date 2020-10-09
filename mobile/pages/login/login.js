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
  login:function(e){
    console.log(this.data.puId)
    console.log(this.data.password)
    var that = this;
    wx.request({
      url: 'http://175.24.63.102:8080/login',
      data:{
        stuid: t0his.data.puId,
        pass: this.data.password
      },
      method:"POST",
      success:function(res){
        if(res.data == "success"){
          console.log(that.data.puId);
          app.globalData.stdNumber = that.data.puId
          wx.navigateTo({
            url: '../appoint/appoint',
          })
        }
        else{
          wx.showToast({
            title: '账号密码错误',
            image:'../img/fail.png'
          })
        }
      }
    })
    
  },
  
})