//index.js
const api = require('../../confs/api.js')

//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tabs: [
      {
        key: 'movie',
        name: '电影',
        type: 'list'
      },
      {
        key: 'search',
        name: '搜索',
        type: 'search'
      },
      {
        key: 'user',
        name: '用户',
        type: 'user'
      }
    ],    
    showState: {
      movie: true
    },
    defaultActive: 'movie',
    movies: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.hideLoading();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.getMovies();
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  handleItemTab: function(e){
    const {key: currentKey} = e.detail;
    const { tabs, showState} = this.data;
    tabs.forEach(tab => {
      if (tab.key === currentKey) {
        showState[tab.key] = true
      } else {
        showState[tab.key] = false;
      }
    })    
    this.setData({
      showState
    })
  },

  getMovies: function (pageIndex = 0, cb){
    wx.request({
      url: `${api.getMovies}?pageIndex=${pageIndex}`,
      success: (res) => {
        const {data} = res;
        if(data.success){
          this.setData({
            movies: data.result
          })
        }else{
          wx.showToast({
            title: data.message,
            icon: 'none',
            mask: true
          })
        }
        if (cb) {
          cb();
        }
      },
      fail: (err) => {
        wx.showToast({
          title: `get movie data fail, because of '${err.message}'`,
          icon: 'none',
          mask: true
        });
        if (cb) {
          cb();
        }
      }
    })
  },
  onPullDownRefresh: function () {
    wx.showLoading({
      title: 'loading...',
      mask: true
    })
    this.getMovies(1, () => {
      wx.hideLoading();
    })
  },
  handlePictureTab: function(e){
    const { movie } = e.detail;
    wx.navigateTo({
      url: `/pages/detail/detail?movieId=${movie._id}&title=${movie.title}`
    })
  }
})