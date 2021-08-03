<template>
  <div
    class="single-menu-item-component"
    @click="navigateTo"
  >
    {{ name }}
    <span
      v-if="badge"
      class="badge"
    >{{ badge }}</span>
    <b-icon
      class="arrow-icon"
      icon="chevron-right"
    />
  </div>
</template>

<script>
export default {
  name: "MainNavSingleMenuItem",
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
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.single-menu-item-component {
  width: 100%;
  padding: 16px;
  cursor: pointer;
  position: relative;
  @include font-style-body($weight: 700, $color: inherit);

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
