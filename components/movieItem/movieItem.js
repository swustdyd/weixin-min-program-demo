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
    left: 0,
    startX: 0,
    startY: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlePictureTab: function(e){
      const {movie} = e.currentTarget.dataset;
      this.triggerEvent('pictureTab', {movie});
    },
    handleDeleteMovie: function(e){
      const {movie} = e.currentTarget.dataset;
      this.setData({
        left: 0
      })
      this.triggerEvent('deleteMovie', {movie});
    },
    scrollViewTouchstart: function (e) {
      const { clientX: startX, clientY: startY} = e.changedTouches[0];
      this.setData({
        startX,
        startY
      })
    },
    scrollViewTouchend: function (e) {
      const { clientX: endX, clientY: endY } = e.changedTouches[0];
      const {startX, startY} = this.data;
      const sub = startX - endX;
      const subY = startY - endY;
      if (Math.abs(sub) > Math.abs(subY)){
        //向左滑，距离>=50
        if ((startX > endX && Math.abs(sub) >= 50)) {
          this.setData({
            left: 1000
          })
        }
        //向左滑，距离<50
        if ((startX > endX && Math.abs(sub) < 50)) {
          this.setData({
            left: 0
          })
        }
        //向右滑，距离>=50
        if ((startX < endX && Math.abs(sub) >= 50)) {
          this.setData({
            left: 0
          })
        }
        //向右滑，距离<50
        if ((startX < endX && Math.abs(sub) < 50)) {
          this.setData({
            left: 1000
          })
        }
      }      
    }
  }
})
