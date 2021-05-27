<template>
  <div class="cart-component">
    <b-icon
      v-b-toggle.cart
      icon="cart"
      font-scale="2"
    />
    <b-sidebar
      id="cart"
      aria-labelledby="cart-title"
      title="Sidebar"
      right
      no-header
      shadow
      backdrop
    >
      <template #default="{ hide }">
        <div class="p-3">
          <h4 id="cart-title">Your Cart</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item active @click="hide">Active</b-nav-item>
              <b-nav-item href="#link-1" @click="hide">Link</b-nav-item>
              <b-nav-item href="#link-2" @click="hide">Another Link</b-nav-item>
            </b-nav>
          </nav>
          <b-button variant="primary" block @click="hide">Close Sidebar</b-button>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import StoreService from "@/vue/services/store.service";

export default {
  async mounted() {
  }
};
</script>

<style scoped lang="scss">
.cart-component {

}
</style>