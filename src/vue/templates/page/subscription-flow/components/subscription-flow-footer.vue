<template>
  <!-- FOOTER -->
    <section class="sub-flow-footer" v-if="currentHandle!='intro'">
      <div class="flowSummary">
        <!-- DESKTOP FLOW TOTAL -->
          <div class="desktop-summary d-flex">
            <div class="d-block" style="width: 231px;">
              <p class="mb-1 dsktp-bk" style="font-family: worker-3d; font-size: 16px;">

              </p>
              <div class="price-row" v-if="flowSummary.total">
                <p class="price_label mb-0 font-weight-bold">
                  Total:
                  <span>{{ flowSummary.total }}</span><span class="text-success"> ({{ flowSummary.compare_at_price - flowSummary.total }} saved!)</span>
                </p>
              </div>
            </div>
            <div class="containter-fluid scent-summary dsktp-bk" style="padding-top: 15px; padding-bottom: 15px;">
              <div class="row selected-scents-row" v-if="selectedScentsOnScreen">
                <div class="col text-center" v-for="(scent,i) in selectedScentsOnScreen" :key="scent.sku + i">
                  <div class="selected-scent" :class="'bg-'+scent.handle">
                    <i :class="'squatch-icon icon_'+scent.handle"></i>
                    <i class="icon-squatch icon-cross remove-scent-icon"></i>
                  </div>
                  <p class="font-weight-bold mb-0 d-none">{{scent.title}}</p>
                </div>
                <div class="col text-center" v-for="(blank,i) in []" :key="blank">
                  <div class="selected-scent empty">
                    <i :class="'text-brown squatch-icon icon-'+screen.handle"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- / DESKTOP FLOW TOTAL -->
      </div>
      <div class="flowControl">
        <b-button
          class="prevButton"
          size="lg"
          v-show="current_step_index>0"
          :disabled="choicesRequired"
          @click.prevent="flowPrevious()">Back</b-button> 
        <b-button
          size="lg"
          class="nextButton"
          :disabled="choicesRequired"
          @click.prevent="flowNext()">Next</b-button> 
      </div>
    </section>
    <!-- / FOOTER -->
</template>

<script>
import store from "../store.js";
import { mapGetters } from "vuex";

export default {
  name: "SubscriptionFlowFooter",
  props: {
  },
  computed: {
    ...mapGetters("subFlow", ["screen","steps", "choicesRequired", "flowSummary", "selectedScentsOnScreen"]),
    currentHandle() {
      return this.screen.handle
    },
    current_step_index() {
      let index = 0;
      for (var i in this.steps) {
        if (this.steps[i].handle == this.currentHandle) {
          index = i;
          break;
        }
      }
      return Number(index);
    }
  },
  mounted() {
    window.test_footer = this;
    
  },
  methods: {
    flowPrevious() {
      let softCommit_index = (this.current_step_index - 1);
      if (softCommit_index < 0) {
        return;
      }
      let previousScreen = this.steps[softCommit_index];
      this.$root.$store.commit("subFlow/setCurrentScreen", previousScreen.handle);
    },
    flowNext() {
      let softCommit_index = (this.current_step_index + 1);
      if (softCommit_index >= this.steps.length) {
        return;
      }
      let nextScreen = this.steps[softCommit_index];
      this.$root.$store.commit("subFlow/setCurrentScreen", nextScreen.handle);
    }
  }
}
</script>
<style scoped lang="scss">
.sub-flow-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
}
.flowSummary {
  float:left;
}
.flowControl {
  float: right;
    .prevButton {
    }
    .nextButton {
    }
}
</style>