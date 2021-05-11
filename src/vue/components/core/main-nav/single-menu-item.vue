<template>
  <div
    class="single-menu-item-component"
    @click="navigateTo"
  >
    {{ name }}
    <span
      class="badge"
      v-if="badge"
    >{{ badge }}</span>
    <b-icon
      class="arrow-icon"
      icon="chevron-right"
    ></b-icon>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    badge: {
      type: String,
      required: false,
      default: ""
    },
    path: {
      type: String,
      required: false,
      default: ""
    }
  },
  methods: {
    navigateTo() {
      console.log(this.path);
      if (this.path) {
        window.location = this.path;
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../../css/main.scss";

.single-menu-item-component {
  width: 100%;
  padding: 11px 16px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  position: relative;

  .badge {
    font-size: 10px;
    font-weight: 400;
    background-color: $orange;
    border-radius: 11px;
    padding: 4px 7px; 
    text-transform: uppercase;
    margin-left: 8px;
  }

  .arrow-icon {
    position: absolute;
    top: 16px;
    right: 16px;
  }

  &:hover {
    color: $orange;
    background-color: rgba(204, 99, 40, .1);
  }
}
</style>
