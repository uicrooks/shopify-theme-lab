<template>
  <!-- FOOTER -->
    <section class="sub-flow-footer" v-if="currentHandle!='intro'">
      <div class="flowSummary">

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
    ...mapGetters("subFlow", ["screen","steps", "choicesRequired"]),
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