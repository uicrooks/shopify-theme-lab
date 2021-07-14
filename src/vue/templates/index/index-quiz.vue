<template>
  <div class="index-quiz-component">
    <sudisfaction-guarantee />
    <div class="test-hero">
      <image-section
        preheader="Don't Know What To Get?"
        header="Take the Soap Quiz"
        subheader="Find the best soap for your personality & skin type"
        image-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/soap-inuse-closeup-2.png?v=1593397621"
        :reversed="true"
        cta="Take The Quiz"
        path="/pages/quiz-1"
      />
    </div>
  </div>
</template>

<script>
import ImageSection from "@/vue/reusables/image-section";
import SudisfactionGuarantee from "@/vue/reusables/sudisfaction-guarantee";

export default {
  name: "IndexQuiz",
  components: {
    ImageSection,
    SudisfactionGuarantee,
  },
};
</script>