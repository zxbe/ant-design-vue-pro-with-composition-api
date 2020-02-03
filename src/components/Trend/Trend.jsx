import './index.less'

export default {
  name: 'Trend',
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-trend'
    },
    /**
     * 上升下降标识：up|down
     */
    flag: {
      type: String,
      required: true
    },
    /**
     * 颜色反转
     */
    reverseColor: {
      type: Boolean,
      default: false
    }
  },
  setup: (props, { slots }) => {
    return () => {
      const { prefixCls, reverseColor, flag } = props
      return (
        <div class={[prefixCls, reverseColor && 'reverse-color']}>
          <span>
            {slots.term && slots.term()}
            <span class="item-text">{slots.default && slots.default()}</span>
          </span>
          <span class={[flag]}>
            <a-icon type={`caret-${flag}`} />
          </span>
        </div>
      )
    }
  }
}
