<template>
  <div class="collection-nav-component">
    <b-nav
      id="collection-nav"
      class="collection-nav"
    >
      <b-nav-text>
        Essentials hey there
      </b-nav-text>
      <b-nav-item
        v-for="item of menuItems.essentials"
        :key="`collection-nav-item-${item.name}`"
        :href="item.path"
        class="collection-nav-item"
      >
        <i :class="`icon-custom icon-${item.iconName}`" />
        {{ item.name }}
      </b-nav-item>
      <b-nav-text
        class="second-navbar-text"
      >
        More Products
      </b-nav-text>
      <b-nav-item
        v-for="item of menuItems.more"
        :key="`collection-nav-item-${item.name}`"
        :href="item.path"
        class="collection-nav-item"
      >
        <i :class="`icon-custom icon-${item.iconName}`" />
        {{ item.name }}
      </b-nav-item>
    </b-nav>
  </div>
</template>

<script>
document.onscroll = () => {
  if (window.innerHeight + window.scrollY > document.body.clientHeight) {
    document.getElementById("collection-nav").style.display = "none";
  } else {
    document.getElementById("collection-nav").style.display = "flex";
  }
};

export default {
  name: "CollectionNav",
  data() {
    return {
      menuItems: {
        essentials: [
          {
            name: "Bundles",
            path: "/pages/bundle-offers",
            iconName: "best-sellers"
          },
          {
            name: "Bar Soaps",
            path: "/collections/bar-soaps",
            iconName: "soap"
          },
          {
            name: "Hair Care",
            path: "/collections/hair-care",
            iconName: "haircare"
          },
          {
            name: "Deodorant",
            path: "/collections/deodorant",
            iconName: "deodorant"
          },
          {
            name: "Toothpaste",
            path: "/collections/toothpaste",
            iconName: "toothpaste"
          },
          {
            name: "Boosters",
            path: "/collections/shower-boosters",
            iconName: "soap-gripper-saver"
          }
        ],
        more: [
          {
            name: "Beard Oil",
            path: "/collections/beard",
            iconName: "beard-oil"
          },
          {
            name: "Cologne",
            path: "/collections/colognes",
            iconName: "cologne"
          },
          {
            name: "Hand Soap",
            path: "/collections/hand-soap",
            iconName: "hand-soap"
          },
          {
            name: "Sanitizer",
            path: "/collections/hand-sanitizer",
            iconName: "hand-sanitizer"
          },
          {
            name: "Gear",
            path: "/collections/gear",
            iconName: "squatch-gear"
          },
          {
            name: "Candles",
            path: "/products/bay-rum-candle",
            iconName: "candle"
          },
          {
            name: "Gift Cards",
            path: "/products/squatch-gift-card",
            iconName: "gift-card"
          },
        ],
      },
    };
  }
};
</script>
<style scoped lang="scss">
@import "@/styles/main.scss";

.collection-nav-component {
  width: 100%;

  /* Hide scrollbar for Chrome, Safari and Opera */
  .collection-nav::-webkit-scrollbar {
    display: none;
  }

  .collection-nav {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    box-shadow: 0 0.2rem 1rem rgb(26 17 12 / 45%);
    background-color: $white;
    z-index: 9;
    padding: 0;
    overflow-y: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;
    @include font-style-body($size: 12px, $weight: 800);
  
    @media (min-width: 1153px) {
      flex-flow: column nowrap;
      box-shadow: unset;
      padding: 35px 15px 0 10px;
      margin-left: 10px;
      @include font-style-body($size: 15px, $weight: 800);
    }

    .navbar-text {
      display: none;
      @include font-style-heading($size: 22px);

      @media (min-width: 1153px) {
        display: block;
      }
    }

    .second-navbar-text {
      margin-top: 25px;
    }

    .collection-nav-item {
      flex: 1;
      text-align: center;
      min-width: 90px;
      max-width: 150px;
      padding: 5px 10px;

      @media (min-width: 1153px) {
        text-align: left;
        padding: 0;
        margin: 10px 0;
      }

      .nav-link {
        padding: 12px 0;
        color: $dark-brown;
        border-bottom: 3px solid transparent;

        @media (min-width: 1153px) {
          border-bottom: none;
          border-left: 3px solid transparent;
          padding: 4px 8px;
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
        }

        &:hover {
          color: $orange;
          border-bottom: 3px solid $orange;

          @media (min-width: 1153px) {
            border-bottom: none;
            border-left: 3px solid $orange;
          }
        }

        .icon-custom {
          font-size: 24px;
          display: block;
          margin-bottom: 5px;

          @media (min-width: 1153px) {
            display: inline-block;
            margin-bottom: unset;
            margin-right: 10px;
          }
        }
      }
    }
  }
}

</style>