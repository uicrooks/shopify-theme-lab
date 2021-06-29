export default {
  units: {
    "barsoap": "bar",
    "haircare-kit": "kit",
    "haircare-shampoo": "bottle",
    "haircare-conditioner": "bottle",
    "deodorant-bundle": "",
    "deodorant-pack": "",
    "deodorant": "stick",
    "toothpaste-kit": "",
    "toothpaste": "tube",
  },
  featureDescriptions: {
    "barsoap": [
      { label: "Smells Like:", metafieldName: "scent", iconName: "" },
      { label: "Exfoliation:", metafieldName: "exfol_lvl", iconName: "ColdProcessSoap" }
    ],
    "haircare-kit": [
      { label: "Smells Like:", metafieldName: "scent", iconName: "" },
    ],
    "haircare-shampoo": [
      { label: "Smells Like:", metafieldName: "scent", iconName: "" },
      { label: "Featuring:", metafieldName: "exfol_lvl", iconName: "NaturalOils" }
    ],
    "haircare-conditioner": [
      { label: "Smells Like:", metafieldName: "scent", iconName: "" },
      { label: "Featuring:", metafieldName: "exfol_lvl", iconName: "NaturalOils" }
    ],
    "deodorant-bundle": [],
    "deodorant-pack": [],
    "deodorant": [
      { label: "Smells Like:", metafieldName: "scent", iconName: "" },
      { label: "Exfoliation:", metafieldName: "exfol_lvl", iconName: "ColdProcessSoap" }
    ],
    "toothpaste-kit": [
      { label: "Flavor:", metafieldName: "scent", iconName: "spearmint-basil" },
      { label: "Featuring:", metafieldName: "featuring", iconName: "tooth-bun_whitens" }
    ],
    "toothpaste": [
      { label: "Flavor:", metafieldName: "scent", iconName: "" },
      { label: "Featuring:", metafieldName: "featuring", iconName: "tooth-bun_whitens" }
    ],
  },
  discountForSubscription: {
    "barsoap": 100,
    "haircare-kit": 400,
    "haircare-shampoo": 200,
    "haircare-conditioner": 200,
    "deodorant-bundle": null,
    "deodorant-pack": null,
    "deodorant": 100,
    "toothpaste-kit": 400,
    "toothpaste": 200
  }
};