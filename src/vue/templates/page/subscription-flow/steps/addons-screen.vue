<template>
  <section
    v-if="c_addons"
    class="screen"
  >
    <b-container fluid>
      <b-col cols="12">
        <h2>Shower Boosters</h2>
      </b-col>
      <transition-group
        name="fade-list"
        mode="out-in"
        tag="div"
        class="row"
      >
        <b-col
          v-for="(addon) in c_addons.Booster"
          :key="addon.sku"
          class="scent-col"
          cols="6"
          sm="6"
          md="4"
          lg="3"
        >
          <div class="scent__card">
            <div class="scent__card-image woodgrain-bg ">
              <b-img-lazy :src="addon.images[0]" />
            </div>
            <div class="scent__card-body">
              <h3 class="scent__card-title">
                {{ addon.title }}
              </h3>
              <div class="scent__card-description">
                <p>{{ addon.description }}</p>
              </div>
              <div class="scent__card-btns mt-auto">
                <b-button-group
                  v-if="addon.qty"
                  size="lg"
                >
                  <b-button
                    class="btn-decrease"
                    :disabled="addon.qty == 0"
                    @click.prevent="decreaseAddonQty(addon)"
                  >
                    -
                  </b-button>
                  <b-button
                    class="qtyscreen"
                    disabled
                  >
                    {{ addon.qty }}
                  </b-button>
                  <b-button
                    class="btn-increase"
                    @click.prevent="increaseAddonQty(addon)"
                  >
                    +
                  </b-button>
                </b-button-group>
                <b-button
                  v-else
                  size="lg"
                  class="btn-increase"
                  @click.prevent="increaseAddonQty(addon)"
                >
                  Add
                </b-button>
              </div>
            </div>
          </div>
        </b-col>
      </transition-group>
    </b-container>

    <b-container fluid>
      <b-col cols="12">
        <h2>Deodorant</h2>
      </b-col>
      <transition-group
        name="fade-list"
        mode="out-in"
        tag="div"
        class="row"
      >
        <b-col
          v-for="(addon) in c_addons.Deodorant"
          :key="addon.sku"
          class="scent-col"
          cols="6"
          sm="6"
          md="4"
          lg="3"
        >
          <div class="scent__card">
            <div class="scent__card-image woodgrain-bg ">
              <b-img-lazy :src="addon.images[0]" />
            </div>
            <div class="scent__card-body">
              <h3 class="scent__card-title">
                {{ addon.title }}
              </h3>
              <div class="scent__card-description">
                <p>{{ addon.description }}</p>
              </div>
              <div class="scent__card-btns mt-auto">
                <b-button-group
                  v-if="addon.qty"
                  size="lg"
                >
                  <b-button
                    class="btn-decrease"
                    :disabled="addon.qty == 0"
                    @click.prevent="decreaseAddonQty(addon)"
                  >
                    -
                  </b-button>
                  <b-button
                    class="qtyscreen"
                    disabled
                  >
                    {{ addon.qty }}
                  </b-button>
                  <b-button
                    class="btn-increase"
                    @click.prevent="increaseAddonQty(addon)"
                  >
                    +
                  </b-button>
                </b-button-group>
                <b-button
                  v-else
                  size="lg"
                  class="btn-increase"
                  @click.prevent="increaseAddonQty(addon)"
                >
                  Add
                </b-button>
              </div>
            </div>
          </div>
        </b-col>
      </transition-group>
    </b-container>

    <b-container fluid>
      <b-col cols="12">
        <h2>Hair Care</h2>
      </b-col>
      <transition-group
        name="fade-list"
        mode="out-in"
        tag="div"
        class="row"
      >
        <b-col
          v-for="(addon) in c_addons.HairCare"
          :key="addon.sku"
          class="scent-col"
          cols="6"
          sm="6"
          md="4"
          lg="3"
        >
          <div class="scent__card">
            <div class="scent__card-image woodgrain-bg ">
              <b-img-lazy :src="addon.images[0]" />
            </div>
            <div class="scent__card-body">
              <h3 class="scent__card-title">
                {{ addon.title }}
              </h3>
              <div class="scent__card-description">
                <p>{{ addon.description }}</p>
              </div>
              <div class="scent__card-btns mt-auto">
                <b-button-group
                  v-if="addon.qty"
                  size="lg"
                >
                  <b-button
                    class="btn-decrease"
                    :disabled="addon.qty == 0"
                    @click.prevent="decreaseAddonQty(addon)"
                  >
                    -
                  </b-button>
                  <b-button
                    class="qtyscreen"
                    disabled
                  >
                    {{ addon.qty }}
                  </b-button>
                  <b-button
                    class="btn-increase"
                    @click.prevent="increaseAddonQty(addon)"
                  >
                    +
                  </b-button>
                </b-button-group>
                <b-button
                  v-else
                  size="lg"
                  class="btn-increase"
                  @click.prevent="increaseAddonQty(addon)"
                >
                  Add
                </b-button>
              </div>
            </div>
          </div>
        </b-col>
      </transition-group>
    </b-container>

    <b-container fluid>
      <b-col cols="12">
        <h2>More</h2>
      </b-col>
      <transition-group
        name="fade-list"
        mode="out-in"
        tag="div"
        class="row"
      >
        <b-col
          v-for="(addon,i) in extras"
          :key="addon.sku"
          class="scent-col"
          cols="6"
          sm="6"
          md="4"
          lg="3"
        >
          <div class="scent__card">
            <div class="scent__card-image woodgrain-bg ">
              <b-img-lazy :src="addon.images[0]" />
            </div>
            <div class="scent__card-body">
              <h3 class="scent__card-title">
                {{ addon.title }}
              </h3>
              <div class="scent__card-description">
                <p>{{ addon.description }}</p>
              </div>
              <div class="scent__card-btns mt-auto">
                <b-button-group
                  v-if="addon.qty"
                  size="lg"
                >
                  <b-button
                    class="btn-decrease"
                    :disabled="addon.qty == 0"
                    @click.prevent="decreaseAddonQty(addon,i)"
                  >
                    -
                  </b-button>
                  <b-button
                    class="qtyscreen"
                    disabled
                  >
                    {{ addon.qty }}
                  </b-button>
                  <b-button
                    class="btn-increase"
                    @click.prevent="increaseAddonQty(addon,i)"
                  >
                    +
                  </b-button>
                </b-button-group>
                <b-button
                  v-else
                  size="lg"
                  class="btn-increase"
                  @click.prevent="increaseAddonQty(addon, i)"
                >
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
  name: "AddonsScreen",
  data() {
    return {
      c_addons: [],
      extras: []
    };
  },
  computed: {
    ...mapGetters("subFlow", ["addons"]),
  },
  methods: {
    increaseAddonQty(addon) {
        let qty = addon.qty+1,
        type = addon.type;
        this.$store.commit("subFlow/changeAddonQty",{ qty, type, variant_id: addon.variant_id });
    },
    decreaseAddonQty(addon) {
      let qty = addon.qty-1,
      type = addon.type;
      if (qty>=0) {
        this.$store.commit("subFlow/changeAddonQty",{ qty, type, variant_id: addon.variant_id });
      }
    },
  },
  mounted() {
    this.c_addons = this.addons;
    console.log(this);
    for (var i in this.addons) {
      var type = i;
      if (["Booster","HairCare","Deodorant"].indexOf(type)==-1) {
        this.extras = this.extras.concat(this.addons[i]);
      }
    }
    this.$store.commit("subFlow/setViewedAddons", true);
  }
};
</script>
<style scoped lang="scss">
@use "@/styles/main" as global;
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
    background-color: global.$sand;
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
      font-family: global.$font-heading;
      font-size: 16px;
      margin-bottom: 10px;
      padding-bottom: 6px;
      border-bottom: 1px solid global.$brown;
    }
    .scent__card-description {
      p {
        font-size: 14px;
        margin-bottom: 5px;
        &:last-of-type {
          margin-bottom: 15px;
        }
      }
    }
    .scent__card-btns {
      text-align: center;
      margin-top: auto;
      .qtyscreen {
        border-color: global.$orange;
        background: transparent;
        color: global.$orange;
        opacity: 1;
        width: 50px;
      }
      .btn-increase {
        background: global.$orange;
        border-color: global.$orange;
      }
      .btn-decrease {
        background: global.$orange;
        border-color: global.$orange;
      }
    }
  }
}
</style>