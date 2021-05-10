<template>
  <div class="main-nav-menu-component">
    <div
      class="menu-item-container"
      v-for="(item, index) of menu"
      :key="`menu-item-${index}`"
    >
      <div 
        class="menu-item"
        v-if="item.subMenuItems"
      >
        <div
          class="menu-item-name"
          v-b-toggle.accordion-1
        >
          {{ item.name }}
          <span
            class="badge"
            v-if="item.badgeText"
          >{{ item.badgeText }}</span>
        </div>
        <b-icon
          icon="chevron-down"
        >  
        </b-icon>
        <b-collapse
          :id="`submenu-for-item-${index}`"
        >
          <div>adsfadf</div>
        </b-collapse>
      </div>
      <div
        class="menu-item"
        v-else
      >
        <div
          class="menu-item-name"
          @click="navigateTo(menu)"
        >
          {{ item.name }}
          <span
            class="badge"
            v-if="item.badgeText"
          >{{ item.badgeText }}</span>
        </div>
        <b-icon
          icon="chevron-right"
        >  
        </b-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "main-nav-menu",
  props: {
    menu: {
      type: Array,
      required: true
    }
  },
  methods: {
    navigateTo(menu) {
      console.log(menu);
      // this.$router.push(menu.path);
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../css/variables.scss";

.main-nav-menu-component {
  
  .menu-item {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 16px;
    cursor: pointer;

    .menu-item-name {
      font-size: 14px;
      font-weight: 700;

      .badge {
        font-size: 10px;
        background-color: $orange;
        border-radius: 13px;
        padding: 4px 8px; 
      }
    }
  }
}
</style>