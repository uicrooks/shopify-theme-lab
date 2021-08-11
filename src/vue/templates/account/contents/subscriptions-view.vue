<template>
  <div class="subscriptions-view-component">
    <div class="header">
      <div class="refill-date">
        Next Refill
        <span>
          Nov. 5th
        </span>
      </div>
      <div class="edit-link">
        <a @click="changeView('Edit Box')">
          Edit Box
        </a>
      </div>
    </div>
    <account-view-section-box>
    </account-view-section-box>
  </div>
</template>

<script>
export default {
  name: "AccountSubscriptionsView",
  methods: {
    changeView(viewName) {
      this.$store.commit("account/setCurrentView", viewName);
    }
  }
};
</script>


<style scoped lang="scss">
@import "@/styles/main.scss";

.subscriptions-view-component {

  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-bottom: 12px;
    @include font-style-body();

    .refill-date {
      span {
        @include font-style-body($color: grey, $weight: 500);
      }
    }

    .edit-link {
      a {
        text-decoration: underline;
        cursor: pointer;
        @include font-style-body($color: $text-orange);
      }
    }
  }
}
</style>