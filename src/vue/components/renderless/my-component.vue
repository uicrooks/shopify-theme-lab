<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      visible: state => state['my-module'].visible
    })
  },
  methods: {
    ...mapActions({
      toggle: 'my-module/toggle'
    })
  },
  render () {
    return this.$scopedSlots.default({
      visible: this.visible,
      toggle: this.toggle
    })
  }
}
</script>