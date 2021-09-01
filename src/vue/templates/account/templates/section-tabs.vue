<template>
  <div class="section-tabs-component">
    <div
      v-for="addressLabel of Object.keys(squatchBoxGroups)"
      :key="addressLabel"
      class="tab"
      :class="{'active': addressLabel === currentGroupName}"
      @click="selectGroup(addressLabel)"
    >
      {{ getTabLabel(squatchBoxGroups[addressLabel]) }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AccountSectionTabs",
  computed: {
    ...mapGetters("account", ["squatchBoxGroups", "currentGroupName"]),
  },
  methods: {
    getTabLabel(group) {
      return group.fullAddress && group.fullAddress.address1 ? `${group.fullAddress.address1}${group.fullAddress.zip ? ", " + group.fullAddress.zip : ""}` : "";
    },
    selectGroup(groupName) {
      if (groupName !== this.currentGroupName) {
        this.$store.dispatch("account/initializeCurrentGroup", groupName);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.section-tabs-component {
  display: flex;
  flex-flow: row nowrap;
  padding-bottom: 10px;

  .tab {
    flex: 1;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 5px 5px 12px 5px;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    @include font-style-body($size: 12px, $color: grey);

    &.active {
      border-bottom: 2px solid $text-orange;
      @include font-style-body($size: 12px, $color: $text-orange);
    }
  }
}
</style>