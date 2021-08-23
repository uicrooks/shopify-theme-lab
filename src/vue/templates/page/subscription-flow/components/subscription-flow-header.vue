<template>
  <section
    class="sub-flow-header shadow"
    data-site-header
  >
    <nav />
    <div class="align-items-center d-flex shadow sub-flow-nav">
      <a
        href="/"
        class="navbar-brand py-lg-3 position-xl-absolute"
        name="Dr. Squatch | Home"
        title="Dr. Squatch | Home"
        aria-label="Dr. Squatch | Home"
      >
        <img
          src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/DRS_horizontal_fullcolor.svg?v=1615332033"
          alt="Dr. Squatch | Home"
          class="flow-logo"
        >
      </a>
      <div class="step-tracker d-flex align-items-center w-100">
        <div
          v-for="(step,i) in steps"
          :key="'navHeader__'+step.handle"
          class="progress-step"
          :class="{'active' : step.handle == screen.handle, 'finished' : i < current_step_index, 'last': i == steps.length-1 }"
          @click="navigateToScreen(step.handle)"
        >
          <i
            class="squatch-icon"
            :class="'icon-'+step.handle"
          />
          <p
            v-if="current_step_index == i"
            class="mb-0 text-primary"
          >
            {{ step.title }}
          </p>
        </div>
        <div class="progress__bg" />
      </div>
    </div>
    <div>
      <transition
        name="fade"
        mode="out-in"
      >
        <SubProductToggle
          v-if="currentHandle == 'BarSoap'"
          :key="'BarSoap_tabs'"
          :products="subProductsBarsoap"
        />
        <SubProductToggle
          v-if="currentHandle == 'Deodorant'"
          :key="'Deodorant_tabs'"
          :products="subProductsDeodorant"
        />
        <SubProductToggle
          v-if="currentHandle == 'HairCare'"
          :key="'HairCare_tabs'"
          :products="subProductsHaircare"
        />
        <SubProductToggle
          v-if="currentHandle == 'Toothpaste'"
          :key="'Toothpaste_tabs'"
          :products="subProductsToothpaste"
        />
      </transition>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SubscriptionFlowHeader",
  props: {
    subProductsBarsoap: {required: true, type: Array},
    subProductsDeodorant: {required: true, type: Array},
    subProductsToothpaste: {required: true, type: Array},
    subProductsHaircare: {required: true, type: Array},
  },
  computed: {
    ...mapGetters("subFlow", ["screen","steps","choicesRequired"]),
    currentHandle() {
      return this.screen.handle;
    },
    current_step_index() {
      let index = 0;
      for (var i in this.steps) {
        if (this.steps[i].handle == this.screen.handle) {
          index = i;
          break;
        }
      }
      return Number(index);
    }
  },
  methods: {
    navigateToScreen(handle) {
      if (!this.choicesRequired) {
        this.$store.commit("subFlow/setCurrentScreen", handle);
      }
    }
  },
  mounted() {
    window.test_header = this;
  }
};
</script>
<style scoped lang="scss">
.sub-flow-header {
  background: #fff;
  position: sticky;
  padding: 0 15px;
  top: -164px;
  transition: top 0.3s linear;
}
body.scroll-up .sub-flow-header {
    top: 0px;
}
.progress-step {
    width: 50px;
    height: 50px;
    background: #e9cfb8;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    cursor:pointer;
    &.last {
      margin-right: 0;
    }
    p {
      position: absolute;
      bottom: -18px;
      font-size: 12px;
    }
}
.flow-logo {
  width: 170px;
}
.step-tracker {
  justify-content: center;
  left: 0px;
  position: absolute;
}
</style>