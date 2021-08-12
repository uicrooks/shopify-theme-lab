<template>
  <button
    class="squatch-button-component"
    :class="{'disabled': disabled}"
    @click="takeAction"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "SquatchButton",
  props: {
    path: {
      type: String,
      required: false,
      default: ""
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    takeAction() {
      if (this.path) {
        window.location = this.path;
        return;
      }
      this.$emit("clicked");
    }
  }
};
</script>

<style lang="scss" scoped>
@use "@/styles/main" as global;

.squatch-button-component {
  width: 100%;
  padding: 17px 15px 13px;
  border-radius: 5px;
  border: none;
  text-align: center;
  background-color: global.$orange;
  @include global.font-style-heading($size: 14px, $color: global.$white);

  &:hover {
    background-color: global.$orange-lighten;
  }

  &.disabled {
    cursor: not-allowed;
    background-color: global.$orange-lighten;
  }
}
</style>