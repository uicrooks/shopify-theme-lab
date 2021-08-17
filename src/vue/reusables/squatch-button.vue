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
  width: 100%;
  padding: 17px 15px 13px;
  border-radius: 5px;
  border: 1px solid $orange;
  text-align: center;
  background-color: $orange;
  @include font-style-heading($size: 14px, $color: $white);

  &:hover {
    background-color: $orange-lighten;
    border: 1px solid $orange-lighten;
  }

  &.disabled {
    cursor: not-allowed;
    background-color: $orange-lighten;
    border: 1px solid $orange-lighten;
  }
}
</style>