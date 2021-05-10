<template>
  <div class="section-header-nav-component">
    <h1 class="text-primary">Header Nav</h1>
  </div>
</template>

<script>
export default {
  name: "SectionHeaderNav",
  mounted() {
    console.log("Header!dd");
  }
}
</script>

<style scoped lang="scss">

.section-header-nav-component {
  h1 {
    color: blue;
  }
}
</style>