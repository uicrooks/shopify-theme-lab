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
      hideOffcanvas: 'offcanvas/hide',
      hideBackdrop: 'backdrop/hide'
    })
  },
  render () {
    return this.$scopedSlots.default({
      visible: this.visible,
      hideOffcanvas: this.hideOffcanvas,
      hideBackdrop: this.hideBackdrop
    })
  }
}
</script>

<style lang="scss" scoped>
.offcanvas {
  @apply w-full max-w-sm h-screen bg-white fixed z-20 opacity-50 top-0 transform transition-all duration-150;
}

.offcanvas--left {
  @apply left-0 -translate-x-full;
}

.offcanvas--right {
  @apply right-0 translate-x-full;
}

.offcanvas--open {
  @apply shadow-lg translate-x-0 opacity-100;
}
</style>