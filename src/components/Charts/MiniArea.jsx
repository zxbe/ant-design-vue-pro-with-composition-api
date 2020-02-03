import moment from 'moment'
const data = []
const beginDay = new Date().getTime()

for (let i = 0; i < 10; i++) {
  data.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: Math.round(Math.random() * 10)
  })
}

// eslint-disable-next-line no-unused-vars
const tooltip = [
  'x*y',
  (x, y) => ({
    name: x,
    value: y
  })
]
// eslint-disable-next-line no-unused-vars
const scale = [
  {
    dataKey: 'x',
    min: 2
  },
  {
    dataKey: 'y',
    title: '时间',
    min: 1,
    max: 22
  }
]

export default {
  name: 'MiniArea',
  setup: () => {
    const height = 100

    return () => {
      return (
        <div class="antv-chart-mini">
          <div class="chart-wrapper" style={{ height: 46 }}>
            <v-chart forceFit={true} height={height} data={data} padding={[36, 0, 18, 0]}>
              <v-tooltip />
              <v-smooth-area position="x*y" />
            </v-chart>
          </div>
        </div>
      )
    }
  }
}
