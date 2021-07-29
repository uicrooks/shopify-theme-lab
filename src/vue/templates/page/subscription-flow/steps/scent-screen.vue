<template>
  <section class="screen" v-if="c_scents">
    <b-container fluid>
      <transition-group name="fade-list" mode="out-in" tag="div" class="row">
        <b-col
          v-for="(scent,i) in c_scents" :key="scent.sku"
          v-if="filterOnTab(scent)"
          class="scent-col"
          cols="6"
          sm="6"
          md="4"
          lg="3"
        >
          <div class="scent__card">
            <div class="scent__card-image woodgrain-bg ">
              <b-img-lazy :src="scent.images[0]" />
            </div>
            <div class="scent__card-body">
              <h3 class="scent__card-title">{{scent.title}}</h3>
              <div class="scent__card-description">
                <p><strong>Smells Like: </strong>{{scent.pdp_metafields.smellsLike}}</p>
                <p><strong>Exfoliation: </strong>{{scent.pdp_metafields.exfol_lvl}}</p>
              </div>
              <div class="scent__card-btns mt-auto">
                <b-button-group size="lg" v-if="scent.qty">
                  <b-button class="btn-decrease" @click.prevent="decreaseScentQty(scent,i)" :disabled="scent.qty == 0">-</b-button>
                  <b-button class="qtyscreen" disabled>{{scent.qty}}</b-button>
                  <b-button class="btn-increase" @click.prevent="increaseScentQty(scent,i)" :disabled="numSelected == maxNumber">+</b-button>
                </b-button-group>
                <b-button size="lg" class="btn-increase" v-else @click.prevent="increaseScentQty(scent, i)" :disabled="numSelected == maxNumber">
                  Add
                </b-button>
              </div>
            </div>
          </div>
        </b-col>
      </transition-group>
    </b-container>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "ScentScreen",
  props: {
    scents: {required: true}
  },
  data() {
    return {
      c_scents: []
    }
  },
  computed: {
    ...mapGetters("subFlow", ["screen", "skuLimits"]),
    currentHandle() {
      return this.screen.handle
    },
    numSelected() {
      let count=0;
      for (var i in this.scents) {
        count=count+this.scents[i].qty;
      }
      return count;
    },
    maxNumber() {
      return this.skuLimits[this.screen.selectedSku()]
    }
  },
  mounted() {
    window.test_barsoap = this;
    this.c_scents = this.scents;
  },
  methods: {
    filterOnTab(scent) {
      if (this.currentHandle == 'HairCare') {
        return this.screen.selectedSku() == scent.filter_sku;
      } else {
        return true;
      }
    },
    increaseScentQty(scent,i) {
      if (this.numSelected+1 <= this.maxNumber) {
        let qty = scent.qty+1;
        this.$store.commit("subFlow/changeScentQty",{qty, index: i});
        this.$store.commit("subFlow/setChosenScreenSku", this.screen.selectedSku());
        this.handleHcTpQty(this.currentHandle, qty);
      }
    },
    decreaseScentQty(scent,i) {
      let qty = scent.qty-1;
      if (this.numSelected>=1) {
        this.$store.commit("subFlow/changeScentQty",{qty, index: i});
      }
      this.handleHcTpQty(this.currentHandle, qty);
    },
    handleHcTpQty(type, qty) {
      if (["HairCare","Toothpaste"].indexOf(type)>-1 && qty>0) {
        this.$store.commit("subFlow/setScreenSubQuantity",qty);
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import "@/styles/main.scss";
.fade-list-enter-active, .fade-list-leave-active {
  transition: opacity 0.1s;
}
.fade-list-enter, .fade-list-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.fade-list-leave-active {
  display: none;
}
.screen {
  max-width: 1300px;
  padding-top: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
}
.scent-col {
  margin-bottom: 25px;
}
.scent__card {
  margin-bottom: 30px;
  height: 100%;
  display:flex;
  flex-direction: column;
  background: #fff;
  border-radius: 6px;
  .scent__card-image {
    background-color: $sand;
    text-align: center;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    img {
      width: calc(100% - 30px);
      padding: 15px;
    }
  }
  .scent__card-body {
    padding: 15px;
    height: 100%;
    display:flex;
    flex-direction: column;
    .scent__card-title {
      font-family: $font-heading;
      font-size: 16px;
      margin-bottom: 10px;
      padding-bottom: 6px;
      border-bottom: 1px solid $brown;
    }
    .scent__card-description {
      p {
        font-size: 14px;
        margin-bottom: 5px;
        &:last-of-type {
          margin-bottom: 15px;
        }
        strong {
          
        }
      }
    }
    .scent__card-btns {
      text-align: center;
      margin-top: auto;
      .qtyscreen {
        border-color: $orange;
        background: transparent;
        color: $orange;
        opacity: 1;
        width: 50px;
      }
      .btn-increase {
        background: $orange;
        border-color: $orange;
      }
      .btn-decrease {
        background: $orange;
        border-color: $orange;
      }
    }
  }
}
</style>