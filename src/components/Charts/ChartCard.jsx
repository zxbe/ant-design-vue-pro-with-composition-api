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
  setup: (props, { slots }) => {
    return () => {
      const { loading, total, title } = props
      return (
        <a-card loading={loading} bordered={false}>
          <div class="chart-card-header">
            <div class="meta">
              <span class="chart-card-title">{title}</span>
              <span class="chart-card-action">{slots.action && slots.action()}</span>
            </div>
            <div class="total">
              <slot name="total">
                <span>{(typeof total === 'function' && total()) || total}</span>
              </slot>
            </div>
          </div>
          <div class="chart-card-content">
            <div class="content-fix">{slots.default && slots.default()}</div>
          </div>
          <div class="chart-card-footer">
            <div class="field">{slots.footer && slots.footer()}</div>
          </div>
        </a-card>
      )
    }
  }
})
