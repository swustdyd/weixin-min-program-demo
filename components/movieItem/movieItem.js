// components/movie_item/movieItem.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlePictureTab: function(e){
      const {movie} = e.currentTarget.dataset;
      this.triggerEvent('pictureTab', {movie});
    }
  }
})
