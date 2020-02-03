import './MiniProgress.less'

export default {
  name: 'MiniProgress',
  props: {
    target: {
      type: Number,
      default: 0
    },
    height: {
      type: String,
      default: '10px'
    },
    color: {
      type: String,
      default: '#13C2C2'
    },
    percentage: {
      type: Number,
      default: 0
    }
  },
  setup: props => {
    const { target, color, height, percentage } = props
    return () => (
      <div class="chart-mini-progress">
        <div class="target" style={{ left: target + '%' }}>
          <span style={{ backgroundColor: color }} />
          <span style={{ backgroundColor: color }} />
        </div>
        <div class="progress-wrapper">
          <div class="progress" style={{ backgroundColor: color, width: percentage + '%', height: height }}></div>
        </div>
      </div>
    )
  }
}
