Component({
  props: {
    className: '',
    tabBarUnderlineColor: '#108ee9', // 选中选项卡下划线颜色
    tabBarActiveTextColor: '#108ee9', // 选中选项卡字体颜色
    tabBarInactiveTextColor: '#333333', // 未选中选项卡字体颜色
    tabBarBackgroundColor: '#ffffff', // 选项卡背景颜色
    showPlus: false,
    swipeable: true,
  },
  data: {
    scrollInit: 0,
    current: 0,
    windowWidth: 0,
    tabWidth: 0.25,
  },
  didMount() {
    const { tabs, activeTab } = this.props;

    this.setData({
      current: activeTab,
    });

    my.getSystemInfo({
      success: (res) => {
        this.setData({
          windowWidth: res.windowWidth,
          tabWidth: tabs.length > 3 ? 0.25 : 1 / tabs.length,
        });

        this.moveScrollBar(activeTab);
      },
    });
  },
  didUpdate(prevProps) {
    const { activeTab } = prevProps;
    if (activeTab !== this.props.current) {
      this.setData({
        current: activeTab,
      });
      this.moveScrollBar(activeTab);
    }
  },
  methods: {
    handleSwiperChange(e) {
      const { current } = e.detail;

      this.moveScrollBar(current);
      if (this.props.onChange) {
        this.props.onChange({ index: current });
      }
      this.setData({
        current,
      });
    },
    handleTabClick(e) {
      const { index } = e.target.dataset;

      this.moveScrollBar(index);
      if (this.props.onTabClick) {
        this.props.onTabClick({ index });
      }
      this.setData({
        current: index,
      });
    },
    handlePlusClick() {
      if (this.props.onPlusClick) {
        this.props.onPlusClick();
      }
    },
    moveScrollBar(current) {
      const { windowWidth, tabWidth } = this.data;
      let scrollInit = current * windowWidth * tabWidth;

      if (current <= 2) {
        scrollInit = 0;
      } else {
        scrollInit = (current - 2) * windowWidth * tabWidth;
      }

      this.setData({
        scrollInit,
      });
    },
  },
});
