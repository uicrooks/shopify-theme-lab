<template>
    <section class="sub-flow-header shadow" data-site-header>
      <nav></nav>
      <div class="align-items-center d-flex shadow sub-flow-nav">
        <a v-cloak href="/" class="navbar-brand py-lg-3 position-xl-absolute" name="Dr. Squatch | Home" title="Dr. Squatch | Home" aria-label="Dr. Squatch | Home">
          <img src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/DRS_horizontal_fullcolor.svg?v=1615332033" alt="Dr. Squatch | Home" class="img-fluid" style="width: 200px;" />
        </a>
        <div class="step-tracker d-flex align-items-center w-100">
          <div class="progress-step" :class="{'active' : current_step_index == i, 'finished' : i < current_step_index, 'd-none' : (showInfo == true && i == 0) }" v-for="(step,i) in scent_steps" :key="'mobileStep_'+step.handle" @click.prevent="_helper_changeScreeNav(step.handle)">
            <i class="squatch-icon" :class="'icon-'+step.handle"></i>
            <p class="mb-0 text-primary" v-if="current_step_index == i">{{screen.title}}</p>
          </div>
          <div class="progress__bg"></div>
        </div>
      </div>
      <div class="step-options" v-if="current_step != 'intro'">
        <component :is="soapOptionsComponent" v-if="current_step=='soap'"></component>
        <component :is="haircareOptionsComponent" v-if="current_step=='haircare'"></component>
        <component :is="deodorantOptionsComponent" v-if="current_step=='deodorant'"></component>
        <component :is="toothpasteOptionsComponent" v-if="current_step=='toothpaste'"></component>
        <template v-if="current_step=='addon'"> </template>
      </div>
    </section>
</template>

<script>
export default {
  name: "subflow-header",
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