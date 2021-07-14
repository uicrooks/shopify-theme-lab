<template>
  <div
    class="squatch-button-component"
    :class="{'disabled': disabled}"
    @click="takeAction"
  >
    <slot />
  </div>
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
  padding: 12px 15px;
  border-radius: 5px;
  text-align: center;
  background-color: $orange;
  cursor: pointer;
  @include font-style-heading($size: 15px, $color: $white);

  &:hover {
    background-color: $orange-lighten;
  }

  &.disabled {
    cursor: not-allowed;
    background-color: $orange-lighten;
  }
}
</style>