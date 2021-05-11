<template>
  <div
    class="squatch-button-component"
    :class="color"
    @click="navigateTo"
  >
    <div
      class="button-text squatch-main-font"
      :class="{'as-header': subText}"
    >
      {{ text }}
    </div>
    <div class="button-sub-text squatch-sub-font" v-if="subText">
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
      required: false
    },
    color: {
      type: String,
      required: false,
      default: "orange"
    }
  },
  methods: {
    navigateTo() {
      console.log("navigateTo");
      if (this.path) {
        window.location = this.path;
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../css/main.scss";
@import "../../../css/variables.scss";

.squatch-button-component {
  margin: 16px;
  padding: 20px 15px;
  border-radius: 5px;
  font-size: 15px;
  text-align: center;
  background-color: $orange;
  color: $white;
  cursor: pointer;

  &:hover {
    background-color: $orange-hover;
    color: $white-hover;
  }

  &.maroon {
    background-color: $maroon;

    &:hover {
      background-color: $maroon-hover;
      color: $white-hover;
    }
  }

  .button-text {
    font-size: 14px;
    font-weight: 500;

    &.as-header {
      font-size: 16px;
      text-transform: uppercase;
    }
  }

  .button-sub-text {
    margin-top: 3px;
    font-size: 15px;
    font-weight: 400;
    line-height: 15px;
  }
}
</style>