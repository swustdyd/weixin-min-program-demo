// components/tab/tab.js

/**
 * 重构tabs数据，以便于渲染
 * @param {*} tabs 
 * @param {*} activeIndex 
 */
const rebuildTabs = (tabs, activeKey) => {
  return tabs.map(tab => {
    let className = 'tab-item';
    let icon = '';
    if (activeKey === tab.key) {
      className += ' tab-item-active';
      icon = tab.type ? icons[tab.type].active : '';
    }else{
      icon = tab.type ? icons[tab.type].normal : '';
    }
    return {
      ...tab,
      className,
      icon
    }
  })
}

const icons = {
  user: {
    normal: '../../images/icons/user_888.png',
    active: '../../images/icons/user_fff.png'
  },
  list: {
    normal: '../../images/icons/list_888.png',
    active: '../../images/icons/list_fff.png'
  },
  search: {
    normal: '../../images/icons/search_888.png',
    active: '../../images/icons/search_fff.png'
  },
  star: {
    normal: '../../images/icons/star_888.png',
    active: '../../images/icons/star_fff.png'
  }
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: []
    },
    defaultActive: String
  },

  attached: function(){
    const defaultActive = this.data.defaultActive || 0;
    const newTabs = rebuildTabs(this.data.tabs, defaultActive)
    this.setData({
      tabs: newTabs
    })
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
    handleItemTab: function (e) {
      const {key: currentKey} = e.currentTarget.dataset;
      const newTabs = rebuildTabs(this.data.tabs, currentKey)
      this.setData({
        tabs: newTabs
      });
      this.triggerEvent('itemtab', { key: currentKey});
    }
  }
})
