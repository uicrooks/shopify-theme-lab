<template>
  <div class="section-container-component">
    <slot />
  </div>
</template>

<script>
export default {
  name: "AccountSectionContainer"
};
</script>


<style scoped lang="scss">
@import "@/styles/main.scss";

.section-container-component {
  background-color: $white;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 10%);
}
</style>