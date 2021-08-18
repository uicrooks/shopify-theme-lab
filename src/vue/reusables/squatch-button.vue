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
@import "@/styles/main.scss";

.squatch-button-component {
  width: 256px;
  padding: 17px 8px 13px;
  border-radius: 5px;
  border: none;
  text-align: center;
  background-color: $orange;
  @include font-style-heading($size: 14px, $color: $white);

  &:hover {
    background-color: $orange-lighten;
  }

  &.disabled {
    cursor: not-allowed;
    background-color: $orange-lighten;
  }
}
</style>