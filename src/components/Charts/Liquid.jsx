import { createComponent, ref } from '@vue/composition-api'

export default createComponent({
  name: 'Liquid',
  props: {
    height: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    }
  },
  setup: props => {
    return () => {
      const { width, height } = props

      const data = ref([])
      const scale = ref([])

      return (
        <div>
          <v-chart forceFit={true} height={height} width={width} data={data} scale={scale} padding={0}>
            <v-tooltip />
            <v-interval
              shape={['liquid-fill-gauge']}
              position="transfer*value"
              color=""
              v-style={{
                lineWidth: 10,
                opacity: 0.75
              }}
              tooltip={[
                'transfer*value',
                (transfer, value) => {
                  return {
                    name: transfer,
                    value
                  }
                }
              ]}
            ></v-interval>
            {data.map(row => (
              <v-guide
                type="text"
                position={{
                  gender: row.transfer,
                  value: 45
                }}
                content={row.value + '%'}
                v-style={{
                  fontSize: 100,
                  textAlign: 'center',
                  opacity: 0.75
                }}
                top={true}
              />
            ))}
          </v-chart>
        </div>
      )
    }
  }
})
