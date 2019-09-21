<template>
  <a-locale-provider :locale="locale.locale">
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>

<script>
import { reactive } from '@vue/composition-api'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { useDevice } from '@/utils/mixin'

export default {
  setup (props, { root }) {
    useDevice(root.$store)

    const locale = reactive({
      locale: zhCN
    })
    return {
      locale
    }
  }
}
</script>
<style>
#app {
  height: 100%;
}
</style>
