<template>
  <div class="quiz-component">
    <div class="quiz-container">
      <div class="header-container">
        <p class="preheader">
          Dr.Squatch Quiz
        </p>

        <h1 class="header">
          No Need To Guess
        </h1>
      </div>

      <div v-if="currentSlide !== 0">
        <button @click="prevSlide()">
          Back
        </button>
      </div>

      <div v-if=" (!currentSlide == 8) || (currentSlide !== 0 && currentSlide < greatestSlide) || (currentSlide === 0 && greatestSlide > 0)">
        <button @click="nextSlide()">
          Next
        </button>
      </div>

      <div class="carousel-container">

        <div
          v-if="!startedQuiz"
          class="firstSlide"
        >
          <div class="firstSlideContainer">
            <p class="firstSlideHeader">
              8 Quick Questions
            </p>

            <p class="firstSlideSubheader">
              Find out which soaps best match your scent preferences and lifestyle!
            </p>

            <button
              class="startButton"
              @click="startQuiz()"
            >
              Start Quiz
            </button>
          </div>

          <div class="gifContainer">
            <div class="gifContent">
              <img
                class="firstSlideGif"
                src="https://media1.giphy.com/media/XreQmk7ETCak0/giphy.gif?cid=790b76114ddaf74f52f07d51f2706ffdce95c65952e11551&rid=giphy.gif"
              >
              <a 
                class="credit-tag"
                href="https://media1.giphy.com/media/XreQmk7ETCak0/giphy.gif?cid=790b76114ddaf74f52f07d51f2706ffdce95c65952e11551&rid=giphy.gif"
              >
                Credit
              </a>
            </div>
          </div>
        </div>
        <b-carousel
          v-if="startedQuiz"
          id="carousel-fade"
          ref="myCarousel"
          :no-wrap="true"
          :no-touch="true"
          fade
          indicators
          img-width="250"
          img-height="250"
          :interval="0"
        >
          <div class="quiz-question">
            {{ currentSlideContent.question }}
          </div>

          <b-carousel-slide 
            v-for="(slide, index) in quizList"
            :key="index"
            class="carousel-content"
          >
            <template #img>
              <div class="image-container">
                <img
                  class="d-block"
                  width="250"
                  height="250"
                  :src="slide.image"
                  alt="image slot"
                  style="margin: 20px;"
                >

                <a 
                  class="credit-tag"
                  :href="slide.image"
                >
                  Credit
                </a>
              </div>
              <div class="icon-container">
                <div 
                  v-if="currentSlideContent.options"
                  class="slide-options"
                >
                  <div
                    v-for="(option, iconIndex) in currentSlideContent.options"
                    :key="iconIndex"
                    class="icon-selector"
                    @click="nextSlide(option.answer_id, currentSlide)"
                  >
                    <img 
                      class="icon-image"
                      :src="option.answer_icon"
                    >
                    <p class="icon-text">
                      {{ option.answer_text }}
                    </p>
                  </div>
                </div>

                <div 
                  v-else-if="currentSlideContent.button"
                  class="slide-finish"
                >
                  <input 
                    type="email" 
                    placeholder="Type your email here..."
                  >
                  <button class="finishQuizButton">
                      {{currentSlideContent.button}}
                  </button>
                </div>
              </div>
            </template>
          </b-carousel-slide>
        </b-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import quizKey from "@/configs/quiz-weights";
import quizQuestions from "@/configs/quiz-questions";

export default {
  name: "Quiz",
  data() {
    return {
      quizList : quizQuestions,
      quizKey : quizKey,
      currentSlide : 0,
      greatestSlide : 0,
      currentSlideContent : {},
      finalAnswers: ["","","","","","","",""],
      lastSlide : 7,
      startedQuiz : false,
    };
  },
  methods: {
    startQuiz() {
      this.startedQuiz = true;
    },
    nextSlide(slideAnswer, slideNumber) {
      if (slideNumber === this.lastSlide) {
        this.finishQuiz();
        return;
      }

      else if (this.currentSlide === this.currentSlide.length-1) {
        console.log("you hit the end");
      }
      else {
        this.$refs.myCarousel.next();
        setTimeout(() => {
          if (this.currentSlide == this.greatestSlide) {
            this.greatestSlide += 1;
          }
          this.finalAnswers[this.currentSlide] = slideAnswer;
          this.currentSlide += 1;
          this.currentSlideContent = this.quizList[this.currentSlide];
          console.log(this.finalAnswers);
          console.log("greatest", this.greatestSlide);
        }, 1000);
      }
    },
    prevSlide() {
      this.$refs.myCarousel.prev();
      setTimeout(() =>{
        this.currentSlide -= 1;
        this.currentSlideContent = this.quizList[this.currentSlide];
      }, 1000);
    },
    finishQuiz() {
      console.log("we ended the quiz");
      console.log(this.quizKey);
      let scoreCard = {
        "bar-pnt-01": 0,
        "bar-gpf-01": 0,
        "bar-gms-01": 0,
        "bar-alp-01": 0,
        "bar-brm-01": 0,
        "bar-cdc-01": 0,
        "bar-sbs-01": 0,
        "bar-egy-01": 0,
        "bar-cfa-01": 0,
        "bar-dsg-01": 0,
        "bar-cof-01": 0,
        "hair-kit-1" : 0,
        "soap-gripper" : 0
      };

      for(let option of this.finalAnswers) {
        for(let key of Object.keys(this.quizKey)) {
          if(this.quizKey[key][option]) {
            scoreCard[key] += this.quizKey[key][option];
          }
        }
      }


      // push all items to array to be sorted
      let sortedItems = [];
      for (let item in scoreCard) {
          sortedItems.push([item, scoreCard[item]]);
      }

      //sort items from greatest to least based on key
      sortedItems.sort(function(a, b) {
          return b[1] - a[1];
      });

      // each index will return an array of key and value ex: ["bar-gms-01", 6]
      console.log(sortedItems);

    }
  },
  mounted() {
    this.currentSlideContent = this.quizList[0];
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.quiz-component {
  width: 100%;

  .quiz-container {
    width: 100%;
    padding: 0 15px; 
    max-width: 1440px;
    margin: auto;

    .header-container {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      flex-flow: column nowrap;

      .preheader {
        @include font-style-body;
      }

      .header {
        @include font-style-heading;
      }
    }

    .carousel-container {
      display: flex;
      flex-flow: column nowrap;
      margin: auto;
      width: 100%;
      justify-content: center;
      align-items: center;
      padding: 0 0 30px 0;


      .firstSlide {
        @media(min-width: 768px) {
          display: flex;
          flex-flow: row nowrap;
          justify-content: center;
          align-items: center;
          margin: auto;
          height: 400px;
          width: 665px;
        }

      }
      .firstSlideContainer {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        margin: 20px 0 0 0;
        text-align: center;
        background-color: #fbf8f6;


        @media(min-width: 768px) {
          margin: 0;
          flex: 0 0 50%;
          max-width: 50%;
          height: 100%;
          width: 100%;
        }


        .firstSlideHeader {
          @include font-style-heading($color: #392b13, $size: 24px);
          margin: 20px 0 20px 0;
          text-align: center;
        }

        .firstSlideSubheader {
          @include font-style-body($size: 18px, $color: #5a3714);
          text-align: center;

          @media(min-width: 497px) {
            width: 80%;
          }
        }

        .startButton {
          @include font-style-heading($color: white, $size: 1rem);
          border-radius: 5px;
          border: 2px solid transparent;
          padding: 16px 66px;
          text-align: center;
          vertical-align: middle;
          padding-bottom: 12px;
          background-color: #203620;
          margin-bottom: 20px;
        }
      }

      .gifContainer {
        width: 95%;
        margin: auto;

        @media(min-width: 768px) {
          width: 100%;
          flex: 0 0 50%;
          max-width: 50%;
          height: 100%;
        }

        .gifContent {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;

          .firstSlideGif {
            width: 100%;
            height: 100%;
          }
  
          .credit-tag {
            position: absolute;
            left: 0;
            bottom: 0;
            color: white !important;
            font-size: 10px;
            text-decoration: none;
            background: rgba(0, 0, 0, 0.42);
            padding: 4px;
            @include font-style-body-bold;
          }
        }

      }

      .quiz-question {
        @include font-style-heading;
        text-align: center;
      }

      .carousel-content {
        display:flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
      
        .image-container {
          position: relative;

          .credit-tag {
            position: absolute;
            left: 20px;
            bottom: 20px;
            color: white !important;
            font-size: 10px;
            text-decoration: none;
            background: rgba(0, 0, 0, 0.42);
            padding: 4px;
            @include font-style-body-bold;
          }
        }
      
        .icon-container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-flow: row wrap;
          margin: 20px 0 0 0;
          width: 100%;

          @media(min-width: 768px) {
            width: 810px;
          }

          .slide-options {
            display: flex;
            flex-flow: row wrap;
            justify-content: center;
            align-items: center;

            .icon-selector {
              display: flex;
              flex: 0 0 45%;
              justify-content: center;
              align-items: center;
              flex-flow: column nowrap;
              height: 96px;
              background-clip: border-box;
              border: 2px solid rgba(53,46,46,.125);
              margin: 5px;
  
              @media(min-width: 768px) {
                flex: 0 0 150px;
                height: 150px;
                margin: 5px;
              }
  
              .icon-image {
                width: 55px;
  
                @media(min-width: 768px) {
                  width: 96px;
                }
              }
  
              .icon-text {
                text-align: center;
                font-size: 11px;
                padding: 2px 0 4px 0;
                margin: 0;
  
                @media(min-width: 768px) {
                  font-size: 14px;
                  padding: .75rem 1.25rem;
                }
              }
            }
          }

          .slide-finish {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
}
</style>