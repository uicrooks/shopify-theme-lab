<template>
  <div>
    {{ text }} - {{ status }}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      text: 'Hello World'
    }
  },
  computed: {
    ...mapState({
      status: state => state.global.status,
    })
  }
}
</script>

<style lang="scss" scoped></style>