<script>
import { Form } from 'ant-design-vue'
import useForm from '@/hooks/useForm'
const formWrap = {
  labelCol: { lg: { span: 5 }, sm: { span: 5 } },
  wrapperCol: { lg: { span: 19 }, sm: { span: 19 } }
}
const StepFirstForm = {
  name: 'Step1',
  setup: (props, ctx) => {
    const { formValidateFields } = useForm(props.form)

    const nextStep = () => {
      formValidateFields().then(res => {
        ctx.emit('nextStep')
      })
    }

    return {
      nextStep
    }
  },
  render () {
    const {
      form: { getFieldDecorator }
    } = this
    return (
      <div>
        <a-form form={this.form} style="max-width: 500px; margin: 40px auto 0;">
          <a-form-item label="付款账户" {...formWrap}>
            {getFieldDecorator('paymentUser', { rules: [{ required: true, message: '付款账户必须填写' }] })(
              <a-select placeholder="ant-design@alipay.com">
                <a-select-option value="1">ant-design@alipay.com</a-select-option>
              </a-select>
            )}
          </a-form-item>
          <a-form-item label="收款账户" {...formWrap}>
            <a-input-group style="display: inline-block; vertical-align: middle" compact={true}>
              <a-select defaultValue="alipay" style="width: 100px">
                <a-select-option value="alipay">支付宝</a-select-option>
                <a-select-option value="wexinpay">微信</a-select-option>
              </a-select>
              {getFieldDecorator('payType', {
                initialValue: 'test@example.com',
                rules: [{ required: true, message: '收款账户必须填写' }]
              })(<a-input style={{ width: 'calc(100% - 100px)' }} />)}
            </a-input-group>
          </a-form-item>
          <a-form-item label="收款人姓名" {...formWrap}>
            {getFieldDecorator('name', {
              initialValue: 'Alex',
              rules: [{ required: true, message: '收款人名称必须核对' }]
            })(<a-input />)}
          </a-form-item>
          <a-form-item label="转账金额" {...formWrap}>
            {getFieldDecorator('momey', {
              initialValue: '5000',
              rules: [{ required: true, message: '转账金额必须填写' }]
            })(<a-input prefix="￥" />)}
          </a-form-item>
          <a-form-item wrapperCol={{ span: 19, offset: 5 }}>
            <a-button type="primary" onClick={() => this.nextStep()}>
              下一步
            </a-button>
          </a-form-item>
        </a-form>
        <a-divider />
        <div class="step-form-style-desc">
          <h3>说明</h3>
          <h4>转账到支付宝账户</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
          <h4>转账到银行卡</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
        </div>
      </div>
    )
  }
}

export default Form.create({ name: 'Step1Form' })(StepFirstForm)
</script>
<style lang="less">
.step-form-style-desc {
  padding: 0 56px;
  color: rgba(0, 0, 0, 0.45);

  h3 {
    margin: 0 0 12px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    line-height: 32px;
  }

  h4 {
    margin: 0 0 4px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 22px;
  }

  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
}
</style>
