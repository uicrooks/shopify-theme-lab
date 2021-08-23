<template>
  <!-- FOOTER -->
  <section
    v-if="currentHandle!='intro'"
    class="sub-flow-footer"
  >
    <div class="flowSummary">
      <!-- DESKTOP FLOW TOTAL -->
      <div class="desktop-summary d-flex">
        <div
          class="d-block"
          style="width: 231px;"
        >
          <p
            class="mb-1 dsktp-bk"
            style="font-family: worker-3d; font-size: 16px;"
          />
          <div
            v-if="flowSummary.total"
            class="price-row"
          >
            <p class="price_label mb-0 font-weight-bold">
              Total:
              <span>{{ flowSummary.total }}</span><span class="text-success"> ({{ flowSummary.compare_at_price - flowSummary.total }} saved!)</span>
            </p>
          </div>
        </div>
        <div
          class="containter-fluid scent-summary dsktp-bk"
          style="padding-top: 15px; padding-bottom: 15px;"
        >
          <div
            v-if="selectedScentsOnScreen"
            class="row selected-scents-row"
          >
            <div
              v-for="(scent,i) in selectedScentsOnScreen"
              :key="scent.sku + i"
              class="col text-center"
            >
              <div
                class="selected-scent"
                :class="'bg-'+scent.handle"
                @click="decreaseScentQty(scent.sku)"
              >
                <i :class="'squatch-icon icon_'+scent.handle" />
                <i class="icon-squatch icon-cross remove-scent-icon" />
              </div>
              <p class="font-weight-bold mb-0 d-none">
                {{ scent.title }}
              </p>
            </div>
            <div
              v-for="(blank) in unselectedScentsOnScreen"
              :key="blank"
              class="col text-center"
            >
              <div class="selected-scent empty">
                <i :class="'text-brown squatch-icon icon-'+screen.handle" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- / DESKTOP FLOW TOTAL -->
    </div>
    <div class="flowControl">
      <b-button
        v-show="current_step_index>0"
        class="prevButton"
        size="lg"
        :disabled="choicesRequired"
        @click.prevent="flowPrevious()"
      >
        Back
      </b-button> 
      <b-button
        size="lg"
        class="nextButton"
        :disabled="choicesRequired"
        @click.prevent="flowNext()"
      >
        {{ currentHandle != 'Addons' ? 'Next' : 'Finish' }}
      </b-button> 
    </div>
  </section>
  <!-- / FOOTER -->
</template>

<script>
//import store from "../store.js";
import { mapGetters } from "vuex";

export default {
  name: "SubscriptionFlowFooter",
  props: {
  },
  computed: {
    ...mapGetters("subFlow", ["screen","steps", "choicesRequired", "flowSummary", "skuLimits", "selectedScentsOnScreen","scents"]),
    currentHandle() {
      return this.screen.handle;
    },
    maxNumber() {
      if (this.screen && this.screen.selectedSku) {
        return this.skuLimits[this.screen.selectedSku()];
      } else {
        return [];
      }
    },
    unselectedScentsOnScreen() {
      let diff = this.maxNumber - this.selectedScentsOnScreen.length;
      var arr = [];
      for (let i = 0; i < diff; i++) {
        arr.push(i);
      }
      return arr;
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
        // Done!
        console.log("asdfs");
        this.$store.dispatch("subFlow/finishSubFlow");
        return;
      }
      let nextScreen = this.steps[softCommit_index];
      this.$root.$store.commit("subFlow/setCurrentScreen", nextScreen.handle);
    },
    decreaseScentQty(sku) {
      var scentMatch = {},
      scentMatch_i = null,
      scents = this.scents[this.currentHandle] || [];
      for (var i in scents) {
        if (scents[i].sku == sku) {
          scentMatch = scents[i];
          scentMatch_i = i;
          break;
        }
      }
      if (scentMatch_i) {
        var newQty = scentMatch.qty ? scentMatch.qty - 1 : 0;
        this.$store.commit("subFlow/changeScentQty",{qty: newQty, index: scentMatch_i});
      }
    }
  },
  mounted() {
    window.test_footer = this;
    
  }
};
</script>
<style scoped lang="scss">
.sub-flow-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    background: #fff;
    padding-left: 15px;
    border-top: 1px solid #1b110a5e;
}
.flowSummary {
  float:left;
  height: 50px;
  .desktop-summary {
    display: flex;
    height: 100%;
    align-items: center;
  }
}
.flowControl {
  float: right;
  height: 50px;
    .prevButton {
      height: 100%;
    }
    .nextButton {
      height: 100%;
    }
}
.selected-scent {
    display: flex;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%) !important;
  .remove-scent-icon {
    font-size: 8px;
    position: absolute;
    right: -5px;
    top: -5px;
    background: #e4e4e4;
    padding: 2px;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>