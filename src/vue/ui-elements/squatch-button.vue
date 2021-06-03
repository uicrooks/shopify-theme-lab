<template>
  <div
    class="squatch-button-component"
    :class="color"
    @click="navigateTo"
  >
    <div
      class="button-text"
      :class="{'as-header': subText}"
    >
      {{ text }}
    </div>
    <div
      v-if="subText"
      class="button-sub-text"
    >
      {{ subText }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    subText: {
      type: String,
      required: false,
      default: ""
    },
    path: {
      type: String,
      required: false,
      default: ""
    },
    action: {
      type: Boolean,
      required: false,
      default: false
    },
    color: {
      type: String,
      required: false,
      default: ""
    }
  },
  methods: {
    navigateTo() {
      console.log("navigateTo");
      if (this.action) {
        this.$emit("takeAction");
      }
      if (this.path) {
        window.location = this.path;
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.squatch-button-component {
  padding: 12px 15px;
  border-radius: 5px;
  font-size: 15px;
  text-align: center;
  background-color: $orange;
  color: $white;
  cursor: pointer;

  &:hover {
    background-color: $orange-darken;
    color: $white-darken;

    &.hover-lighten {
      background-color: $orange-lighten;
      color: $white;
    }
  }

  &.maroon {
    background-color: $maroon;

    &:hover {
      background-color: $maroon-darken;
      color: $white-darken;
    }
  }

  .button-text {
    font-size: 14px;
    font-weight: 500;
    @include font-style-heading($size: 14px, $color: $white, $weight: 400, $lh: 14px);

    &.as-header {
      font-size: 16px;
      text-transform: uppercase;
    }
  }

  .button-sub-text {
    margin-top: 3px;
    @include font-style-body($size: 15px, $color: $white, $lh: 15px);
  }
}
</style>