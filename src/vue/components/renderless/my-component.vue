<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup(props, { slots }) {
    const store = useStore()

    return () => slots.default({
      visible: computed(() => store.state['my-module'].visible).value,
      toggle: () => store.dispatch('my-module/toggle')
    })
  }
}
</script>