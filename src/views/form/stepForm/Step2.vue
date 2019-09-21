<script>
import { Form } from 'ant-design-vue'
import useForm from '@/hooks/useForm'
import { ref, onUnmounted } from '@vue/composition-api'
const formWrap = {
  labelCol: { lg: { span: 5 }, sm: { span: 5 } },
  wrapperCol: { lg: { span: 19 }, sm: { span: 19 } }
}
const StepSecondForm = {
  name: 'Step2',
  setup: (props, ctx) => {
    const { form } = props
    const loading = ref(false)
    const { formValidateFields } = useForm(form)

    const nextStep = () => {
      loading.value = true
      formValidateFields()
        .then(res => {
          console.log('表单 values', res)
          timer.value = setTimeout(() => {
            loading.value = false
            ctx.emit('nextStep')
          }, 1500)
        })
        .catch(() => {
          loading.value = false
        })
    }
    const prevStep = () => {
      ctx.emit('prevStep')
    }

    const timer = ref(0)

    onUnmounted(() => clearTimeout(timer))
    return {
      loading,
      timer,
      nextStep,
      prevStep
    }
  },
  render () {
    const { form, loading } = this
    const { getFieldDecorator } = form

    return (
      <div>
        <a-form form={form} style={{ maxWidth: '500px', margin: '40px auto 0' }}>
          <a-alert
            closable={true}
            message="确认转账后，资金将直接打入对方账户，无法退回。"
            style="margin-bottom: 24px;"
          />
          <a-form-item label="付款账户" class="stepFormText" {...formWrap}>
            ant-design@alipay.com
          </a-form-item>
          <a-form-item label="收款账户" class="stepFormText" {...formWrap}>
            test@example.com
          </a-form-item>
          <a-form-item label="收款人姓名" class="stepFormText" {...formWrap}>
            Alex
          </a-form-item>
          <a-form-item label="转账金额" class="stepFormText" {...formWrap}>
            ￥ 5,000.00
          </a-form-item>
          <a-divider />
          <a-form-item label="支付密码" class="stepFormText" {...formWrap}>
            {getFieldDecorator('paymentPassword', {
              initialValue: '123456',
              rules: [{ required: true, message: '请输入支付密码' }]
            })(<a-input type="password" style="width: 80%;" />)}
          </a-form-item>
          <a-form-item wrapperCol={{ span: 19, offset: 5 }}>
            <a-button loading={loading} type="primary" onClick={() => this.nextStep()}>
              提交
            </a-button>
            <a-button style="margin-left: 8px" onClick={() => this.prevStep()}>
              上一步
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    )
  }
}

export default Form.create({ name: 'StepSecondForm' })(StepSecondForm)
</script>

<style lang="less" scoped>
.stepFormText {
  margin-bottom: 24px;

  .ant-form-item-label,
  .ant-form-item-control {
    line-height: 22px;
  }
}
</style>
