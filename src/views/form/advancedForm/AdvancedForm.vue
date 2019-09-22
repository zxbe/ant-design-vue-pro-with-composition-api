<script>
import { ref } from '@vue/composition-api'
import RepositoryForm from './RepositoryForm'
import TaskForm from './TaskForm'
import FooterToolBar from '@/components/FooterToolbar'
import { mixin, mixinDevice } from '@/utils/mixin'
import useForm from '@/hooks/useForm'
const fieldLabels = {
  name: '仓库名',
  url: '仓库域名',
  owner: '仓库管理员',
  approver: '审批人',
  dateRange: '生效日期',
  type: '仓库类型',
  name2: '任务名',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型'
}

export default {
  name: 'AdvancedForm',
  mixins: [mixin, mixinDevice],
  components: {
    FooterToolBar,
    RepositoryForm,
    TaskForm
  },
  data () {
    return {
      description: '高级表单常见于一次性输入和提交大批量数据的场景。',
      loading: false,
      memberLoading: false,

      errors: []
    }
  },
  setup: () => {
    const repositoryForm = ref(null)
    const taskForm = ref(null)
    const { formValidateFields: repositoryFormValidate } = useForm(repositoryForm)
    const { formValidateFields: taskFormValidate } = useForm(taskForm)

    // this.errors = []

    const pageSubmit = () => {
      Promise.all([repositoryFormValidate, taskFormValidate])
        .then(values => {
          console.log(values)
          // $notification['error']({
          //   message: 'Received values of form:',
          //   description: JSON.stringify(values)
          // })
        })
        .catch(() => {
          // const errors = Object.assign({}, repositoryForm.form.getFieldsError(), taskForm.form.getFieldsError())
          // const tmp = { ...errors }
          // this.errorList(tmp)
        })
    }
    return {
      repositoryForm,
      taskForm,
      pageSubmit
    }
  },
  methods: {
    // 最终全页面提交
    // validate () {
    //   const { $notification, respository, task } = this
    //   const repositoryForm = new Promise((resolve, reject) => {
    //     respository.form.validateFields((err, values) => {
    //       if (err) {
    //         reject(err)
    //         return
    //       }
    //       resolve(values)
    //     })
    //   })
    //   const taskForm = new Promise((resolve, reject) => {
    //     task.form.validateFields((err, values) => {
    //       if (err) {
    //         reject(err)
    //         return
    //       }
    //       resolve(values)
    //     })
    //   })

    //   // clean this.errors
    // },
    errorList (errors) {
      if (!errors || errors.length === 0) {
        return
      }
      this.errors = Object.keys(errors)
        .filter(key => errors[key])
        .map(key => ({
          key: key,
          message: errors[key][0],
          fieldLabel: fieldLabels[key]
        }))
    },
    scrollToField (fieldKey) {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`)
      if (labelNode) {
        labelNode.scrollIntoView(true)
      }
    }
  },
  render () {
    const { pageSubmit } = this
    return (
      <div>
        <a-card class="card" title="仓库管理" bordered={false}>
          <repository-form ref="respository" showSubmit={true} />
        </a-card>
        <a-card class="card" title="任务管理" bordered={false}>
          <task-form ref="task" showSubmit={true} />
        </a-card>
        <a-card></a-card>

        <footer-tool-bar
          style={{
            width: this.isSideMenu() && this.isDesktop() ? `calc(100% - ${this.sidebarOpened ? 256 : 80}px)` : '100%'
          }}
        >
          <span class="popover-wrapper">
            <a-popover
              title="表单校验信息"
              overlayClassName="antd-pro-pages-forms-style-errorPopover"
              trigger="click"
              getPopupContainer={trigger => trigger.parentNode}
            >
              <template slot="content">
                {this.errors.map(item => {
                  return (
                    <li onClick={this.scrollToField(item.key)} class="antd-pro-pages-forms-style-errorListItem">
                      <a-icon type="cross-circle-o" class="antd-pro-pages-forms-style-errorIcon" />
                      <div class>{item.message}</div>
                      <div class="antd-pro-pages-forms-style-errorField">{item.fieldLabel}</div>
                    </li>
                  )
                })}
              </template>
              {this.errors.length ? (
                <span class="antd-pro-pages-forms-style-errorIcon">
                  <a-icon type="exclamation-circle" />
                  {this.errors.length}
                </span>
              ) : null}
            </a-popover>
          </span>
          <a-button type="primary" onClick={e => pageSubmit(e)} loading={this.loading}>
            提交
          </a-button>
        </footer-tool-bar>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.card {
  margin-bottom: 24px;
}
.popover-wrapper {
  /deep/ .antd-pro-pages-forms-style-errorPopover .ant-popover-inner-content {
    min-width: 256px;
    max-height: 290px;
    padding: 0;
    overflow: auto;
  }
}
.antd-pro-pages-forms-style-errorIcon {
  user-select: none;
  margin-right: 24px;
  color: #f5222d;
  cursor: pointer;
  i {
    margin-right: 4px;
  }
}
.antd-pro-pages-forms-style-errorListItem {
  padding: 8px 16px;
  list-style: none;
  border-bottom: 1px solid #e8e8e8;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #e6f7ff;
  }
  .antd-pro-pages-forms-style-errorIcon {
    float: left;
    margin-top: 4px;
    margin-right: 12px;
    padding-bottom: 22px;
    color: #f5222d;
  }
  .antd-pro-pages-forms-style-errorField {
    margin-top: 2px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
  }
}
</style>
