var app = getApp();

// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: "",//用户昵称
    },
    history:[{
      actTitle : "测试",
      actDate : "2020-02-02",
      actPlace : "沙河校区",
      isOverTime : 0,
      actId : 1,
      isSuccess : 1,
      previewTime : "2020-02-03 19:30:00"
    }]
  },

  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /**
     * 获取用户信息
     */
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        that.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]: res.userInfo.nickName,
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
    var that = this;
    console.log(app.globalData.stdNumber);
    wx.request({
      url: 'http://148.70.73.191:4396/history?stdNumber='+app.globalData.stdNumber,
      method:"GET",
      success:function(res){
        console.log(res.data);
        that.setData({
          history:res.data
        })
      }
    })
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