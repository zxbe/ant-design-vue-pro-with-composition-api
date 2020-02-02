import Vue from 'vue'
import { Button, Drawer } from 'ant-design-vue'

const DrawerInstance = Vue.extend({
  name: 'DrawerForm',
  data() {
    return {
      visible: true
    }
  },
  methods: {
    close() {
      this.visible = false
      setTimeout(() => {
        const el = document.querySelector('.ole-drawer')
        el.parentNode.removeChild(el)
      }, 200)
    }
  },
  render() {
    const { visible } = this

    const drawerProps = {
      props: {
        visible,
        destroyOnClose: true,
        wrapClassName: 'ole-drawer'
      },
      on: {
        close: this.close
      }
    }

    return (
      <div>
        <Drawer {...drawerProps}>
          <span>123qwr qwe</span>
          <Button onClick={this.close}> close</Button>
        </Drawer>
      </div>
    )
  }
})

// export default DrawerInstance
export default function createDrawer() {
  const drawer = new DrawerInstance()
  drawer.$mount()
  return drawer
}
