<script>
import { Result } from '@/components'
export default {
  name: 'Step3',
  components: {
    Result
  },
  setup: (props, { emit, root }) => {
    const finish = () => {
      emit('finish')
    }

    const toOrderList = () => {
      root.$router.push('/list/table-list')
    }

    return {
      finish,
      toOrderList
    }
  },
  render () {
    const colLeftProps = {
      sm: 8,
      xs: 24
    }

    const colRightProps = {
      sm: 8,
      xs: 24
    }
    return (
      <div>
        <a-form style="margin: 40px auto 0;">
          <result title="操作成功" isSuccess={true} description="预计两小时内到账" style="max-width: 560px;">
            <div class="information">
              <a-row>
                <a-col {...colLeftProps}>付款账户：</a-col>
                <a-col {...colRightProps}>ant-design@alipay.com</a-col>
              </a-row>
              <a-row>
                <a-col {...colLeftProps}>收款账户：</a-col>
                <a-col {...colRightProps}>test@example.com</a-col>
              </a-row>
              <a-row>
                <a-col {...colLeftProps}>收款人姓名：</a-col>
                <a-col {...colRightProps}>辉夜</a-col>
              </a-row>
              <a-row>
                <a-col {...colLeftProps}>转账金额：</a-col>
                <a-col {...colRightProps}>
                  <span class="money">500</span> 元
                </a-col>
              </a-row>
            </div>
            <div slot="action">
              <a-button type="primary" onClick={this.finish}>
                再转一笔
              </a-button>
              <a-button style="margin-left: 8px" onClick={this.toOrderList}>
                查看账单
              </a-button>
            </div>
          </result>
        </a-form>
      </div>
    )
  }
}
</script>
<style lang="less" scoped>
.information {
  line-height: 22px;

  .ant-row:not(:last-child) {
    margin-bottom: 24px;
  }
}
.money {
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 14px;
}
</style>
