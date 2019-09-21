<template>
  <div :class="prefixCls">
    <a-tabs v-model="currentTab" @change="handleTabChange">
      <a-tab-pane v-for="v in icons" :tab="v.title" :key="v.key">
        <ul>
          <li
            v-for="(icon, key) in v.icons"
            :key="`${v.key}-${key}`"
            :class="{ 'active': selectedIcon==icon }"
            @click="handleSelectedIcon(icon)"
          >
            <a-icon :type="icon" :style="{ fontSize: '36px' }" />
          </li>
        </ul>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { ref, onMounted, watch } from '@vue/composition-api'
import icons from './icons'

const userIcon = context => {
  const selectedIcon = ref('')

  const handleSelectedIcon = icon => {
    selectedIcon.value = icon
    context.emit('change', icon)
  }

  return {
    selectedIcon,
    handleSelectedIcon
  }
}

const userTab = () => {
  const currentTab = ref('directional')
  const handleTabChange = activeKey => {
    currentTab.value = activeKey
  }

  return {
    currentTab,
    handleTabChange
  }
}

export default {
  name: 'IconSelect',
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-icon-selector'
    },
    // eslint-disable-next-line
    value: {
      type: String
    }
  },
  setup (props, context) {
    const { selectedIcon, handleSelectedIcon } = userIcon(context)

    const { currentTab, handleTabChange } = userTab()

    const autoSwitchTab = () =>
      icons.some(item => item.icons.some(icon => icon === props.value) && handleTabChange(item.key))

    onMounted(() => {
      console.log(1)
      if (props.value) {
        autoSwitchTab()
      }
    })

    watch(
      () => props.value,
      () => {
        handleSelectedIcon(props.value)
        autoSwitchTab()
      }
    )

    return {
      icons,
      selectedIcon,
      handleSelectedIcon,
      currentTab,
      handleTabChange,
      autoSwitchTab
    }
  }
}
</script>

<style lang="less" scoped>
@import '../index.less';

ul {
  list-style: none;
  padding: 0;
  overflow-y: scroll;
  height: 250px;

  li {
    display: inline-block;
    padding: @padding-sm;
    margin: 3px 0;
    border-radius: @border-radius-base;

    &:hover,
    &.active {
      // box-shadow: 0px 0px 5px 2px @primary-color;
      cursor: pointer;
      color: @white;
      background-color: @primary-color;
    }
  }
}
</style>
