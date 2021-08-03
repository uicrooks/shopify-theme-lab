<template>
  <div class="quiz-component">
    THIS IS THE QUIZ
    <div class="carousel-container">
      <VueSlickCarousel v-bind="settings">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </VueSlickCarousel>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  name: "Quiz",
  components : {
    VueSlickCarousel
  },
  data() {
    return {
      settings: {
        "arrows": true,
        "dots": true,
        "dotsClass": "slick-dots",
        "focusOnSelect": true,
        "infinite": false,
        "speed": 500,
        "slidesToShow": 1,
        "slidesToScroll": 1,
        "draggable": false,
      }
    };
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.quiz-component {
  width: 100%;

  .carousel-container {
    margin: auto;
    width: 80%;
    justify-content: center;
    align-items: center;
    padding: 0 0 30px 0;
  }
}


</style>