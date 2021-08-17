<template>
  <div class="product-custom-options-selector-component">
    <h6>Your Subscription Box</h6>
    <div class="custom-options-in-image">
      <div
        v-for="(option, index) of selectedOptions"
        :key="`selected-option-${index}`"
        class="option"
      >
        <img
          :src="option.images[0]"
          :alt="`${option.title} image`"
        >
        <div class="option-name">
          {{ getOptionDisplayName(option) }}
        </div>
      </div>
    </div>
    <h6>Available Scents (Select up to 3)</h6>
    <div class="custom-options-in-row">
      <div
        v-for="(option, index) of options"
        :key="`option-${index}`"
        class="option"
      >
        <div class="option-name">
          {{ getOptionDisplayName(option) }}
        </div>
        <div class="counter">
          <b-icon
            icon="dash-circle"
            :class="[getOptionSelectedQuantity(option) > 0 ? 'enabled-icon' : 'disabled-icon']"
            @click="removeOption(option)"
          />
          <span class="count">
            {{ getOptionSelectedQuantity(option) }}
          </span>
          <b-icon
            icon="plus-circle"
            :class="[selectionComplete ? 'disabled-icon' : 'enabled-icon']"
            @click="addOption(option)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCustomOptionsSelector",
  props: {
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    selectedOptions: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      selectedByDefault: []
    };
  },
  computed: {
    selectionComplete() {
      return this.selectedOptions.length >= 3;
    }
  },
  methods: {
    getOptionDisplayName(option) {
      return option.title.split(" ").slice(0, -1).join(" ");
    },
    getOptionSelectedQuantity(option) {
      const matches = this.selectedOptions.filter(product => {
        return product.handle === option.handle;
      });
      return matches.length;
    },
    addOption(option) {
      if (!this.selectionComplete) {
        console.log(option.title);
        this.$emit("selectionUpdated", option);
      }
    },
    removeOption(option) {
      if (this.getOptionSelectedQuantity(option) > 0) {
        this.$emit("selectionUpdated", option, false);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@use "@/styles/main" as global;

.product-custom-options-selector-component {
  margin: 15px 0 25px 0;

  h6 {
    margin-bottom: 10px;
    @include global.font-style-accent($size: 12px, $color: global.$brown);
  }

  .custom-options-in-image {
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 15px;

    .option {
      flex: 1;
      min-width: 85px;
      max-width: calc(100% / 4);
      cursor: pointer;
      text-align: center;

      img {
        height: 36px;
        object-fit: contain;
        margin-bottom: 6px;
      }

      .option-name {
        @include global.font-style-body($size: 11px, $color: global.$brown, $weight: 600);
      }
    }
  }

  .custom-options-in-row {

    .option {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 6px;

      .option-name {
        @include global.font-style-heading($size: 14px);
      }

      .counter {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        font-size: 20px;

        .enabled-icon {
          color: #91a24f;
          cursor: pointer;
        }

        .disabled-icon {
          color: gray;
        }

        .count {
          min-width: 25px;
          text-align: center;
          @include global.font-style-body($color: black);
        }
      }
    }
  }
}
</style>