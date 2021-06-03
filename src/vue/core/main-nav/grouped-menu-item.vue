<template>
  <div class="grouped-menu-item-component">
    <div
      class="menu-item"
      :class="isOpen ? null : 'collapsed'"
      :aria-expanded="isOpen ? 'true' : 'false'"
      aria-controls="sub-menu"
      @click="toggleMenuItem"
    >
      {{ name }}
      <span
        v-if="badge"
        class="badge"
      >{{ badge }}</span>
      <b-icon
        class="arrow-icon"
        :icon="isOpen ? 'chevron-up' : 'chevron-down'"
      /> 
    </div>
    <b-collapse
      id="sub-menu"
      v-model="subMenuOpen"
    >
      <div 
        v-for="(subMenuItem, index) of subMenuItems"
        :key="`sub-menu-item-${index}`"
        class="menu-item sub"
        @click="navigateTo(subMenuItem)"
      >
        {{ subMenuItem.name }}
        <span
          v-if="subMenuItem.badge"
          class="badge"
        >{{ subMenuItem.badge }}</span>
      </div>
    </b-collapse>
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
    isOpen: {
      type: Boolean,
      required: true
    },
    subMenuItems: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    subMenuOpen: {
      get() {
        return this.isOpen;
      },
      set(open) {
        return open;
      }
    }
  },
  methods: {
    toggleMenuItem() {
      this.$emit("toggle");
    },
    navigateTo(menu) {
      console.log(menu);
      if (menu.path) {
        window.location = menu.path;
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.menu-item {
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
  }

  &.sub {
    justify-content: flex-start;
    background-color: #F2F2F2;

    &:hover {
      color: $orange;
      background-color: rgba(204, 99, 40, .1);
    }
  }
}
</style>


