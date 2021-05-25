<template>
  <div class="test-hero">
    <h1 class="bg-brown">
      Testing Index!!
    </h1>
    <image-section
    preheader="Don't Know What To Get?"
    header="Take the Soap Quiz"
    subheader="Find the best soap for your personality & skin type"
    imageSrc="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/soap-inuse-closeup-2.png?v=1593397621"
    :reversed="true"
    cta="Take The Quiz"
    path="/pages/quiz-1"
    />
  </div>
</template>

<script>
import ImageSection from "@vue/ui-elements/image-section";
export default {
  name: "TestIndex",
  components: {
    ImageSection,
  }
};
</script>