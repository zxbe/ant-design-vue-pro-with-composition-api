<template>
  <a-drawer :visible="visible" @close="handleSuccess">
    <div>123</div>
  </a-drawer>
</template>
<script>
// import { ref } from '@vue/composition-api'
export default {
  name: 'ODrawer',
  props: {
    visible: Boolean
  },
  setup (props, ctx) {
    const { visible } = props
    console.log(props)
    const handleSuccess = () => {
      ctx.emit('success', '123')
    }
    return {
      visible,
      handleSuccess
    }
  }
}
</script>
