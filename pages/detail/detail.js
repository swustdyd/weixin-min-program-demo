// pages/detail/detail.js
const api = require('../../confs/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const maxLength = 10;
    let title = options.title || 'detail';
    if (title.length > maxLength){
      title = `${title.substring(0, maxLength)}...`;
    }
    wx.setNavigationBarTitle({
      title
    })
    wx.request({
      url: `${api.getMovieDetail}?movieId=${options.movieId}`,
      success: (res) => {
        const { data } = res;
        if (data.success) {
          this.setData({
            movie: data.result[0]
          })
        } else {
          wx.showToast({
            title: data.message,
            icon: 'none',
            mask: true
          })
        }
      },
      fail: (err) => {
        wx.showToast({
          title: `get movie detail data fail, because of '${err.message}'`,
          icon: 'none',
          mask: true
        });
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})