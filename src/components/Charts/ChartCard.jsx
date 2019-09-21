import { createComponent } from '@vue/composition-api'
import './ChartCard.less'

export default createComponent({
  name: 'ChartCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    total: {
      type: [Function, Number, String],
      required: false,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  render() {
    let { loading, total } = this
    return (
      <a-card loading={loading} bordered={false}>
        <div class="chart-card-header">
          <div class="meta">
            <span class="chart-card-title">{this.$slots.title}</span>
            <span class="chart-card-action">{this.$slots.action}</span>
          </div>
          <div class="total">
            <slot name="total">
              <span>{(typeof total === 'function' && total()) || total}</span>
            </slot>
          </div>
        </div>
        <div class="chart-card-content">
          <div class="content-fix">{this.$slots.default}</div>
        </div>
        <div class="chart-card-footer">
          <div class="field">{this.$slots.footer}</div>
        </div>
      </a-card>
    )
  }
})
