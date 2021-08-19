import ProductIdentifier from "@/vue/services/product-identifier";

export default {
  processOrderData(items, addresses) {
    let obj = {};
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const addressMatch = addresses.filter(address => address.id === item.address_id)[0];
      if (!addressMatch) return;
      
      const addressLabel = addressMatch.address1.trim().toLowerCase();
      const discountId = addressMatch.discount_id;
      if (obj[addressLabel]) {
        if (obj[addressLabel].discountIds && discountId) {
          obj[addressLabel].discountIds.push(discountId);
        }
        if (obj[addressLabel].items) {
          obj[addressLabel].items.push(item);
        }
      } else {
        obj[addressLabel] = {
          fullAddress: addressMatch,
          items: [item],
          discountCodes: [discountId],
        };
      }
      
      let upcomingRefillDates = obj[addressLabel].items.filter(item => item.next_charge_scheduled_at).map(item => item.next_charge_scheduled_at);
      upcomingRefillDates = upcomingRefillDates.filter((item, index) => upcomingRefillDates.indexOf(item) === index);

      let refillsObj = {};
      upcomingRefillDates.forEach(date => {
        refillsObj[date] = obj[addressLabel].items.filter(item => item.next_charge_scheduled_at === date);
      });
      obj[addressLabel].upcomingRefillDates = upcomingRefillDates;
      obj[addressLabel].upcomingRefillsByDate = refillsObj;
    }
    return obj;
  },
  organizeProductsByType(products) {
    let organizedObj = {};
    let types = ["barsoap", "haircare", "toothpaste", "deodorant"];
    types.forEach(type => {
      organizedObj[type] = products.filter(product => ProductIdentifier.getType(product) === type);
    });
    return organizedObj;
  },
  getSelectionOptionsForSubscriptionOrder(productType, source) {
    if (productType === "soap") {
      return source.filter(product => {
        return ProductIdentifier.identify(product)[0] === "soap"
      });
    }
    return source;
  }
};