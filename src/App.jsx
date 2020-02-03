import { reactive } from '@vue/composition-api'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { useDevice } from '@/utils/mixin'
import './App.less'

export default {
  setup(props, { root }) {
    useDevice(root.$store)

    const locale = reactive({
      locale: zhCN
    })

    return () => {
      return (
        <a-locale-provider locale={locale.locale}>
          <div id="app">
            <router-view />
          </div>
        </a-locale-provider>
      )
    }
  }
}
