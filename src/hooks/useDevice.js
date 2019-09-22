import { computed } from '@vue/composition-api'
import { DEVICE_TYPE } from '@/utils/device'

const useDetactDevice = ({ root }) => {
  console.log(root)

  const state = root.$store.state
  const device = computed(() => {
    return state.app.device
  })

  const isMobile = () => {
    return device === DEVICE_TYPE.MOBILE
  }
  const isDesktop = () => {
    return device === DEVICE_TYPE.DESKTOP
  }
  const isTablet = () => {
    return device === DEVICE_TYPE.TABLET
  }
  return {
    device,
    isDesktop,
    isMobile,
    isTablet
  }
}
export default useDetactDevice
