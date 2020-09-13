<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="w-full h-full fixed z-10"
      @click="hideBackdrop(), hideOffcanvas()"
    />
  </transition>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      visible: state => state.backdrop.visible
    })
  },
  methods: {
    ...mapActions({
      hideBackdrop: 'backdrop/hide',
      hideOffcanvas: 'offcanvas/hide'
    })
  }
}
</script>