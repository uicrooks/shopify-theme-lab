<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      key: state => state.module.key
    })
  },
  methods: {
    ...mapActions({
      action: 'module/action'
    })
  },
  render () {
    return this.$scopedSlots.default({
      key: this.key,
      action: this.action
    })
  }
}
</script>

<style scoped></style>