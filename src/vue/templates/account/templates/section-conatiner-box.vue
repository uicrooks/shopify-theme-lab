<template>
  <div class="view-section-box-component">
    <slot />
  </div>
</template>

<script>
export default {
  name: "AccountSectionContainerBox"
};
</script>


<style scoped lang="scss">
@import "@/styles/main.scss";

.view-section-box-component {
  padding: 20px 15px;
  background-color: $white;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 10%);
}
</style>