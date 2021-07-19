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
    "beard": [
      { label: "Smells Like:", metafieldName: "scent", iconName: "" },
      { label: "Featuring:", metafieldName: "featuring", iconName: "" }
    ],
    "cologne": [
      { label: "Smells Like:", metafieldName: "scent", iconName: "" },
      { label: "Featuring:", metafieldName: "featuring", iconName: "" }
    ],
    "sanitizer": [
      { label: "Smells Like:", metafieldName: "scent", iconName: "" },
      { label: "Featuring:", metafieldName: "featuring", iconName: "cool-fresh-aloe" }
    ],
    "liquidsoap": [
      { label: "Smells Like:", metafieldName: "scent", iconName: "" }
    ]
  },
  discountForSubscription: {
    "barsoap": 100,
    "haircare-kit": 400,
    "haircare-shampoo": 200,
    "haircare-conditioner": 200,
    "deodorant-bundle": null,
    "deodorant-pack": null,
    "deodorant": 100,
    "toothpaste-kit": 200,
    "toothpaste": 200
  },
  subscriptionPropertiesByHandle: {
    //TODO: hardcoded temporarily 
    "deodorant-subscription-1-stick": {
      type: "deodorant",
      subscription_id: 280396,
      discount_variant_id: 32890840612969,
      shipping_interval_unit_type: "Months",
      shipping_interval_frequency: 3,
      charge_interval_frequency: 3,
      _recurring_subscription_id: 280396,
      _recurring_charge_interval_frequency: 3,
      _recurring_shipping_interval_unit_type: "Months",
      _recurring_shipping_interval_frequency: 3,
      _inventory_type: true
    },
    "deodorant-subscription-2-sticks": {
      type: "deodorant",
      subscription_id: 280396,
      discount_variant_id: 32890840645737,
      shipping_interval_unit_type: "Months",
      shipping_interval_frequency: 3,
      charge_interval_frequency: 3,
      _recurring_subscription_id: 280396,
      _recurring_charge_interval_frequency: 3,
      _recurring_shipping_interval_unit_type: "Months",
      _recurring_shipping_interval_frequency: 3,
      _inventory_type: true
    },
    "deodorant-subscription-3-sticks": {
      type: "deodorant",
      subscription_id: 280396,
      discount_variant_id: 32890840678505,
      shipping_interval_unit_type: "Months",
      shipping_interval_frequency: 3,
      charge_interval_frequency: 3,
      _recurring_subscription_id: 280396,
      _recurring_charge_interval_frequency: 3,
      _recurring_shipping_interval_unit_type: "Months",
      _recurring_shipping_interval_frequency: 3,
      _inventory_type: true
    }
  }
};