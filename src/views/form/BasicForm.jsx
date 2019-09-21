import { createElement as h, ref } from '@vue/composition-api'
import { Form } from 'ant-design-vue'
const labelCol = { lg: { span: 7 }, sm: { span: 7 } }
const wrapperCol = { lg: { span: 10 }, sm: { span: 17 } }

const BasicForm = {
  name: 'UBaseForm',
  setup: props => {
    const value = ref(1)

    const { getFieldDecorator, validateFields } = props.form

    const handleSubmit = e => {
      e.preventDefault()
      validateFields((err, values) => {
        if (!err) {
          // eslint-disable-next-line no-console
          console.log('Received values of form: ', values)
        }
      })
    }

    // form
    return () => (
      <a-card bodyStyle={{ padding: '24px 32px' }} bordered={false}>
        <a-form onSubmit={handleSubmit}>
          <a-form-item label="标题" labelCol={labelCol} wrapperCol={wrapperCol}>
            {getFieldDecorator('name', { rules: [{ required: true, message: '请输入标题' }] })(
              <a-input name="name" placeholder="给目标起个名字" />
            )}
          </a-form-item>
          <a-form-item label="起止日期" labelCol={labelCol} wrapperCol={wrapperCol}>
            {getFieldDecorator('buildTime', { rules: [{ required: true, message: '请选择起止日期' }] })(
              <a-range-picker name="buildTime" style="width: 100%" />
            )}
          </a-form-item>
          <a-form-item label="目标描述" labelCol={labelCol} wrapperCol={wrapperCol}>
            {getFieldDecorator('description', {
              rules: [{ required: true, message: '请输入目标描述' }]
            })(<a-textarea rows="4" placeholder="请输入你阶段性工作目标" />)}
          </a-form-item>
          <a-form-item label="衡量标准" labelCol={labelCol} wrapperCol={wrapperCol}>
            {getFieldDecorator('type', {
              rules: [{ required: true, message: '请输入衡量标准' }]
            })(<a-textarea rows="4" placeholder="请输入衡量标准" />)}
          </a-form-item>
          <a-form-item label="客户" labelCol={labelCol} wrapperCol={wrapperCol}>
            {getFieldDecorator('customer', {
              rules: [{ required: true, message: '请描述你服务的客户' }]
            })(<a-input rows="4" placeholder="请描述你服务的客户，内部客户直接 @姓名／工号" />)}
          </a-form-item>
          <a-form-item label="邀评人" labelCol={labelCol} wrapperCol={wrapperCol} required={false}>
            {getFieldDecorator('customers')(<a-input placeholder="请直接 @姓名／工号，最多可邀请 5 人" />)}
          </a-form-item>
          <a-form-item label="权重" labelCol={labelCol} wrapperCol={wrapperCol} required={false}>
            <a-input-number min={0} max={100} />
            <span>%</span>
          </a-form-item>
          <a-form-item
            label="目标公开"
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            required={false}
            help="客户、邀评人默认被分享"
          >
            <a-radio-group value={value.value} onChange={e => (value.value = e.target.value)}>
              <a-radio value={1}>公开</a-radio>
              <a-radio value={2}>部分公开</a-radio>
              <a-radio value={3}>不公开</a-radio>
            </a-radio-group>
            <a-form-item>
              {value.value === 2 ? (
                <a-select mode="multiple">
                  <a-select-option value="4">同事一</a-select-option>
                  <a-select-option value="5">同事二</a-select-option>
                  <a-select-option value="6">同事三</a-select-option>
                </a-select>
              ) : null}
            </a-form-item>
          </a-form-item>
          <a-form-item wrapperCol={{ span: 24 }} style="text-align: center">
            <a-button htmlType="submit" type="primary">
              提交
            </a-button>
            <a-button style="margin-left: 8px">保存</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    )
  }
}

const WrapBasicForm = Form.create({ name: 'u-BasicForm' })(BasicForm)

export default {
  data() {
    return {
      description: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。'
    }
  },
  setup: props => {
    return () => <WrapBasicForm />
  }
}
