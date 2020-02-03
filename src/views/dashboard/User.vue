<script>
export default {
  name: 'User',
  render(h) {
    console.log(this.$slots)
    return h(
      'div',
      {
        style: {
          height: '100px',
          width: '100px',
          background: 'red'
        }
      },
      [h('td', null, 123), h('td', null, 123)]
    )
  }
}
</script>
