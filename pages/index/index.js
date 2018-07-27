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
        name: 'TOP 30',
        type: 'star'
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
    movies: [],
    searchInput: '',
    searchMovies: [],
    loading: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
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
    this.getTopMovies();
  },
  getUserInfo: function(e) {
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
  handleDeleteMovie: function(e){
    const { movie: targetMovie } = e.detail;
    const result = this.data.movies.forEach((movie, index) => {
      if (targetMovie._id === movie._id){
        this.data.movies.splice(index, 1);
        return false;
      }
    });
    this.setData({
      movies: this.data.movies
    })
  },
  getTopMovies: function (pageIndex = 0, cb){
    wx.showLoading({
      title: 'loading...',
      mask: true
    })
    this.setData({
      loading: true
    })
    wx.request({
      url: `${api.getMovies}?pageIndex=${pageIndex}&order=avg`,
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
        this.setData({
          loading: false
        })
        wx.hideLoading();
      },
      fail: (err) => {
        wx.showToast({
          title: `get movie data fail, because of '${err.errMsg}'`,
          icon: 'none',
          mask: true,
          duration: 5000
        });
        if (cb) {
          cb();
        }
        wx.hideLoading();

        this.setData({
          loading: false
        })
      }
    })
  },
  handleSearchBtnClick: function () {
    let keyWords = this.data.searchInput;
    if(!keyWords){
      wx.showToast({
        title: '请输入关键词',
        icon: 'none',
        mask: true
      })
      return;
    }

    this.setData({
      loading: true
    })
    wx.showLoading({
      title: 'searching...',
      mask: true
    })
    keyWords = encodeURIComponent(keyWords);
    wx.request({
      url: `${api.searchMovie}?keyWords=${keyWords}`,
      success: (res) => {
        const { data } = res;
        if (data.success) {
          this.setData({
            searchMovies: data.result
          })
        } else {
          wx.showToast({
            title: data.message,
            icon: 'none',
            mask: true
          })
        }

        this.setData({
          loading: false
        })
        wx.hideLoading();
      },
      fail: (err) => {
        wx.showToast({
          title: `get movie data fail, because of '${err.errMsg}'`,
          icon: 'none',
          mask: true,
          duration: 5000
        });

        this.setData({
          loading: false
        })
        wx.hideLoading();
      }
    })
  },
  handlePictureTab: function(e){
    const { movie } = e.detail;
    wx.navigateTo({
      url: `/pages/detail/detail?movieId=${movie._id}&title=${movie.title}`
    })
  },
  handleSearchInput: function(e){
    const { value } = e.detail;
    this.data.searchInput = value;
  },
  handleSearchConfirm: function(e){
    const { value } = e.detail;
    this.data.searchInput = value;
    this.handleSearchBtnClick();
    console.log(value);
  }  
})
