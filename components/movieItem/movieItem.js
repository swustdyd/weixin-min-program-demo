// components/movie_item/movieItem.js
const util = require('../../utils/util.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movie: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    left: 0
  },

  detached: function(e){
    // console.log(this);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlePictureTab: function(e){
      const {movie} = e.currentTarget.dataset;
      this.triggerEvent('pictureTab', {movie});
    },
    handleScroll: function(e){
      const { scrollLeft, deltaX} = e.detail;
      // console.log(deltaX, scrollLeft);
    },
    handleDeleteMovie: function(e){
      const {movie} = e.currentTarget.dataset;
      this.setData({
        left: 0
      })
      this.triggerEvent('deleteMovie', {movie});
    }
  }
})
