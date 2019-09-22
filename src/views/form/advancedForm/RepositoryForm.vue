<script>
import { createElement as h } from '@vue/composition-api'
import { Form } from 'ant-design-vue'
const wrapperProps = {
  xl: { span: 7, offset: 1 },
  lg: { span: 8 },
  md: { span: 12 },
  sm: 24
}
const wrapperPropsLeft = {
  lg: 6,
  md: 12,
  sm: 24
}
const RepositoryForm = {
  name: 'RepositoryForm',
  props: {
    showSubmit: {
      type: Boolean,
      default: false
    }
  },
  setup: props => {
    const { getFieldDecorator, validateFields } = props.form
    const validate = (rule, value, callback) => {
      const regex = /^user-(.*)$/
      if (!regex.test(value)) {
        callback(new Error('需要以 user- 开头'))
      }
      callback()
    }
    const handleSubmit = e => {
      e.preventDefault()
      validateFields((err, values) => {
        if (!err) {
          this.$notification['error']({
            message: 'Received values of form:',
            description: values
          })
        }
      })
    }

    return () => (
      <a-form onSubmit={e => handleSubmit(e)}>
        <a-row class="form-row" gutter={16}>
          <a-col {...wrapperPropsLeft}>
            <a-form-item label="仓库名">
              {getFieldDecorator('name', { rules: [{ required: true, message: '请输入仓库名称', whitespace: true }] })(
                <a-input placeholder="请输入仓库名称" />
              )}
            </a-form-item>
          </a-col>
          <a-col {...wrapperProps}>
            <a-form-item label="仓库域名">
              {getFieldDecorator('url', {
                rules: [{ required: true, message: '请输入仓库域名', whitespace: true }, { validator: validate }]
              })(<a-input addonBefore="http://" addonAfter=".com" placeholder="请输入" />)}
            </a-form-item>
          </a-col>
          <a-col {...wrapperProps}>
            <a-form-item label="仓库管理员">
              {getFieldDecorator('owner', { rules: [{ required: true, message: '请选择管理员' }] })(
                <a-select placeholder="请选择管理员">
                  <a-select-option value="王同学">王同学</a-select-option>
                  <a-select-option value="李同学">李同学</a-select-option>
                  <a-select-option value="黄同学">黄同学</a-select-option>
                </a-select>
              )}
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" gutter={16}>
          <a-col {...wrapperPropsLeft}>
            <a-form-item label="审批人">
              {getFieldDecorator('approver', { rules: [{ required: true, message: '请选择审批员' }] })(
                <a-select placeholder="请选择审批员">
                  <a-select-option value="王晓丽">王晓丽</a-select-option>
                  <a-select-option value="李军">李军</a-select-option>
                </a-select>
              )}
            </a-form-item>
          </a-col>
          <a-col xl={{ span: 7 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
            <a-form-item label="生效日期">
              {getFieldDecorator('dateRange', { rules: [{ required: true, message: '请选择生效日期' }] })(
                <a-range-picker style="width: 100%" />
              )}
            </a-form-item>
          </a-col>
          <a-row>
            <a-col {...wrapperPropsLeft}>
              <a-form-item label="仓库类型">
                {getFieldDecorator('type', {
                  initialValue: '私密',
                  rules: [{ required: true, message: '请选择仓库类型' }]
                })(
                  <a-select placeholder="请选择仓库类型">
                    <a-select-option value="公开">公开</a-select-option>
                    <a-select-option value="私密">私密</a-select-option>
                  </a-select>
                )}
              </a-form-item>
            </a-col>
          </a-row>
        </a-row>
        {props.showSubmit ? (
          <a-form-item>
            <a-button htmlType="submit">Submit</a-button>
          </a-form-item>
        ) : null}
      </a-form>
    )
  }
}

export default Form.create({ name: 'RepositoryForm' })(RepositoryForm)
</script>
