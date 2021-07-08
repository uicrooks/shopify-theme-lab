<template>
  <div class="index-reviews-component">
    <div class="review-preheader">
      <p class="preheader">
        Don't Just Take Our Word For It
      </p>
      <h3 class="review-copy">
        100,000+ Verified Reviews
      </h3>
      <p class="review-subheader">
        Don't just take our word for it ... hear what guys like you are saying
        about Dr. Squatch
      </p>
    </div>
    <div class="review-content">
      <div class="review-table">
        <div class="review-container">
          <div class="review-card">
            <div class="review-title">
              <div>
                <img
                  class="reviewer-image"
                  src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/HPReview_1.jpg?v=1616649308"
                  alt="first-review"
                >
              </div>
              <div class="customer-review-title">
                <strong class="review-title">
                  Best damn soap ever...period.
                </strong>
                <p class="review-stars">
                  ★★★★★
                </p>
              </div>
            </div>
            <div class="review-text-container">
              <p class="review-text">
                Super smooth on the skin, smells awesome, makes you feel good
                showering, and yes....the wife approves.
              </p>
              <p class="reviewer-name">
                James S.
              </p>
            </div>
          </div>
        </div>
        <div class="review-container">
          <div class="review-card">
            <div class="review-title">
              <div>
                <img
                  class="reviewer-image"
                  src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/HPReview_2.jpg?v=1616649308"
                  alt="second-review"
                >
              </div>
              <div class="customer-review-title">
                <strong class="review-title">
                  Ditch the body wash
                </strong>
                <p class="review-stars">
                  ★★★★★
                </p>
              </div>
            </div>
            <div class="review-text-container">
              <p class="review-text">
                It's crazy how clean my skin feels and the lather is
                outstanding. Guys do yourself a huge favor and get some!
              </p>
              <p class="reviewer-name">
                Stephen B.
              </p>
            </div>
          </div>
        </div>
        <div class="review-container">
          <div class="review-card">
            <div class="review-title">
              <div>
                <img
                  class="reviewer-image"
                  src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/HPreview_3.jpg?v=1616649308"
                  alt="third-review"
                >
              </div>
              <div class="customer-review-title">
                <strong class="review-title">
                  Made in the USA, smells incredible!
                </strong>
                <p class="review-stars">
                  ★★★★★
                </p>
              </div>
            </div>
            <div class="review-text-container">
              <p class="review-text">
                First of all they’re made in the USA! Second of all they are all
                natural! And third they smell incredible!
              </p>
              <p class="reviewer-name">
                Amanda T.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="woodgrain-bg position-absolute w-100 fp-bg"
        style="z-index: -1"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexReviews",
  components: {},
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.index-reviews-component {
  padding: 30px 0;

  .review-preheader {
    text-align: center;

    .preheader {
      font-family: $font-body;
    }

    .review-copy {
      font-family: $font-heading;
    }

    .review-subheader {
      font-family: $font-body;
      font-size: 14px;
    }
  }

  .review-content {
    display: flex;
    justify-content: center;
    width: 100%;
    position: relative;

    @include layout-md {
      padding-bottom: 20px;
    }

    .review-table {
      width: 100%;
      max-width: 1024px;
      height: 100%;
      margin: auto;
      display: flex;
      overflow: scroll;

      @include layout-md {
        overflow: hidden;
      }

      .review-container {
        flex: 0 0 33.3333333333%;
        width: 100%;
        padding: 15px;

        @media (min-width: 768px) {
          max-width: 33.3%;
          padding: 0 15px;
        }
        .review-card {
          border-radius: 5px;
          padding: 20px 15px;
          display: flex;
          flex-direction: column;
          width: 90vw;
          height: 100%;
          box-shadow: 0 0.5rem 1rem rgba(26, 17, 12, 0.15);
          background-color: white;

          @include layout-md {
            width: 100%;
          }

          .review-title {
            display: flex;

            .review-title {
              margin: 0 15px 0 0;
              @include font-style-heading($size: 16px);
            }

            .reviewer-image {
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }

            .customer-review-title {
              padding: 0 15px;
            }

            .review-stars {
              color: $orange !important;
            }
          }

          .review-text-container {
            @include font-style-body($size: 14px);

            .review-text {
              line-height: 1;
              font-family: $font-body;
            }
            .reviewer-name {
              @include font-style-body-bold($color: $brown);
            }
          }
        }
      }
    }
    .woodgrain-bg {
      height: 100%;
      bottom: 0;
      background-color: $tan;

      @include layout-md {
        height: 50%;
      }
    }
  }
}
</style>