<template>
  <div class="section-header-nav-component">
    <h1>Header Nav</h1>
  </div>
</template>

<script>
export default {
  name: "section-header-nav",
  mounted() {
    console.log("Header!");
  }
}
</script>

<style scoped lang="scss">
@import "../../../css/variables.scss";

.section-header-nav-component {
  h1 {
    color: $orange;
  }
}
</style>