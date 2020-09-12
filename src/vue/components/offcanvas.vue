<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      visible: state => state.offcanvas.visible
    })
  },
  methods: {
    ...mapActions({
      hideOffcanvas: 'offcanvas/hide'
    })
  },
  render () {
    return this.$scopedSlots.default({
      visible: this.visible,
      hideOffcanvas: this.hideOffcanvas
    })
  }
}
</script>

<style lang="scss" scoped>
.offcanvas {
  @apply w-full max-w-sm bg-white absolute inset-y-0 right-0 opacity-0 transform translate-x-full transition-all duration-150;
}

.offcanvas--open {
  @apply shadow-lg translate-x-0 opacity-100;
}
</style>