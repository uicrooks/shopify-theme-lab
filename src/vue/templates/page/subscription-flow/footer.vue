<template>
<section class="sub-flow-footer" v-if="current_step!='intro'">
      <div class="footer-elements">
        <!-- SELECTED SCENT DETAILS -->
        <div class="step-summary bg-tan-2 mbl-bk" v-if="current_step=='addon'">
          <div class="text-center step-summary-content position-relative">
            <div class="padding text-brown text-center">
                You're all set!
            </div>
          </div>
        </div>
        <div class="step-summary bg-tan-2 mbl-bk" v-if="current_step!='summary' && current_step!='addon'">
          <div class="text-center step-summary-content position-relative" @click.prevent="_helper_togglePriceOpen($event)">
            <div class="padding text-brown">
                <template v-if="screen.handle == 'soap'">
                  {{screen.numScentsSelected()}} of {{screen.maxScentsAllowed}} Bars Selected
                </template>
                <template v-if="screen.handle == 'haircare'">
                  {{ screen.required ? `${screen.numScentsSelected()} of Max ${screen.maxScentsAllowed} Selected` : `${screen.numScentsSelected()} Selected` }}
                </template>
                <template v-if="screen.handle == 'deodorant'">
                  {{ screen.required || screen.numScentsSelected() ? `${screen.numScentsSelected()} of ${screen.maxScentsAllowed} Selected` : `0 Selected` }}
                </template>
                <template v-if="screen.handle == 'toothpaste'">
                  {{ screen.required ? `${screen.numScentsSelected()} of Max ${screen.maxScentsAllowed} Selected` : `${screen.numScentsSelected()} Selected` }}
                </template>
                <i class="icon-squatch chevron-toggle"></i>
            </div>
          </div>
          <div class="scent-summary closed">
            <div class="padding">
              <div class="containter-fluid">
                <div class="row selected-scents-row" v-if="screen.selected_scents">
                  <div class="col mb-2" v-for="(scent,i) in screen.selected_scents()" :key="scent.variant_id + i">
                    <div class="selected-scent" :class="'bg-'+$root._handlize(scent.handle)" @click.prevent="_scentDecreaseQty(scent.sku)">
                      <i :class="'squatch-icon icon_'+$root._handlize(scent.handle)"></i>
                      <i class="icon-squatch icon-cross remove-scent-icon"></i>
                    </div>
                    <p class="font-weight-bold mb-0">{{scent.title}}</p>
                  </div>
                  <div class="col mb-2" v-for="(blank,i) in screen.unselected_scents()" :key="blank">
                    <div class="selected-scent empty">
                      <i :class="'text-brown squatch-icon icon-'+screen.handle"></i>
                    </div>
                    <p class="font-weight-bold mb-0" style="min-height: 24px;">
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- / SELECTED SCENT SCREEN -->

        <!-- SUMMARY ADD-ON SLIDER -->
        <div class="col-12 horizontal-scrollable bg-tan addon-slider" style="padding-top: 20px; padding-bottom: 20px;" v-if="current_step=='summary'">
          <div class="row px-0 addonsRow noscrollbar">
            <div class="col-md-4" v-for="addon in addon_products" :key="addon.key" :class="{'d-none' : selected_addon_skus.indexOf(addon.sku) >-1 }">
              <div class="text-center d-flex flex-column bg-white shadow addon-card" style="border-radius: 5px;">
                <div class="row">
                  <div class="col-3 lazyload addon-image" style="padding-left: 15px;" :data-bg="addon.images[0]"></div>
                  <div class="col-6 text-left text-brown pl-0">
                    <h6 class="mb-2 addon-title">{{addon.title}}</h6>
                    <p class="text-success mb-0">
                      {{addon.price | currency_flat }}
                    </p>
                  </div>
                  <div class="col-3 text-right">
                    <button class="btn btn-outline-primary circleButton" name="add" aria-label="Add to Cart" @click.prevent="_addUpsell(addon)" v-if="addon.available">
                      <i class="icon-squatch icon-plus"></i>
                      <p>Add</p>
                    </button>
                    <button class="btn btn-outline-disabled circleButton" name="add" aria-label="Add to Cart" v-else disabled>
                      <i class="icon-squatch icon-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- / SUMMARY ADD-ON SLIDER -->

        <!-- MOBILE FLOW TOTAL -->
        <div class="price-summary bg-white d-sm-none" v-if="flowSummary.total">
          <div class="d-flex price-row justify-content-between">
            <p class="price_label mb-0 font-weight-bold">
              Total:
              <span>{{ flowSummary.total | currency_flat }}</span><span class="text-success"> ({{ flowSummary.compare_at_price - flowSummary.total | currency_flat }} saved!)</span>
            </p>
          </div>
        </div>
        <!-- / MOBILE FLOW TOTAL -->

        <div class="d-flex" style="max-width: 1440px;margin:auto;">
          <!-- DESKTOP FLOW TOTAL -->
          <div class="desktop-summary d-flex">
            <div class="d-block" style="width: 231px;">
              <p class="mb-1 dsktp-bk" style="font-family: worker-3d; font-size: 16px;">
                <template v-if="screen.handle == 'soap'">
                  {{screen.numScentsSelected()}} of {{screen.maxScentsAllowed}} Bars Selected
                </template>
                <template v-if="screen.handle == 'haircare'">
                  {{ screen.required ? `${screen.numScentsSelected()} of Max ${screen.maxScentsAllowed} Selected` : `${screen.numScentsSelected()} Selected` }}
                </template>
                <template v-if="screen.handle == 'deodorant'">
                  {{ screen.required || screen.numScentsSelected() ? `${screen.numScentsSelected()} of ${screen.maxScentsAllowed} Selected` : `0 Selected` }}
                </template>
                <template v-if="screen.handle == 'toothpaste'">
                  {{ screen.required ? `${screen.numScentsSelected()} of Max ${screen.maxScentsAllowed} Selected` : `${screen.numScentsSelected()} Selected` }}
                </template>
              </p>
              <div class="price-row" v-if="flowSummary.total">
                <p class="price_label mb-0 font-weight-bold">
                  Total:
                  <span>{{ flowSummary.total | currency_flat }}</span><span class="text-success"> ({{ flowSummary.compare_at_price - flowSummary.total | currency_flat }} saved!)</span>
                </p>
              </div>
            </div>
            <div class="containter-fluid scent-summary dsktp-bk" style="padding-top: 15px; padding-bottom: 15px;">
              <div class="row selected-scents-row" v-if="screen.selected_scents">
                <div class="col text-center" v-for="(scent,i) in screen.selected_scents()" :key="scent.variant_id + i">
                  <div class="selected-scent" :class="'bg-'+$root._handlize(scent.handle)" @click.prevent="_scentDecreaseQty(scent.sku)">
                    <i :class="'squatch-icon icon_'+$root._handlize(scent.handle)"></i>
                    <i class="icon-squatch icon-cross remove-scent-icon"></i>
                  </div>
                  <p class="font-weight-bold mb-0 d-none">{{scent.title}}</p>
                </div>
                <div class="col text-center" v-for="(blank,i) in screen.unselected_scents()" :key="blank">
                  <div class="selected-scent empty">
                    <i :class="'text-brown squatch-icon icon-'+screen.handle"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- / DESKTOP FLOW TOTAL -->

          <!-- FLOW CONTROLS -->
          <div class="controls d-flex justify-content-center">
            <template v-if="!isLastStep">
              <button class="btn back-btn" @click.prevent="_flowBack()" v-if="current_step_index>0 || showInfo">
                <i class="squatch-icon icon-Arrow-left"></i>
              </button>
              <button class="btn btn-primary forward-btn ml-auto" @click.prevent="_flowNext()" :disabled="!_stepValidation()">
                {{ screen.numScentsSelected() || screen.required ? 'Next' : 'Skip' }}
              </button>
            </template>
            <template v-else>
              <button class="btn back-btn" @click.prevent="_flowBack()">
                <i class="squatch-icon icon-Arrow-left"></i>
              </button>
              <button class="btn btn-primary forward-btn" @click.prevent="_addAllToCart()" :disabled="!_flowValidation()">
                Finish
              </button>
            </template>
          </div>
          <!-- / FLOW CONTROLS -->
        </div>
        <!-- / SUMMARY SCREEN -->

      </div>
    </section>
</template>

<script>
export default {
  name: "subflow-footer",
  props: {
  },
  data() {  
    return {
      
    }
  },
  methods: {

  }
}
</script>