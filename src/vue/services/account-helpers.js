import ProductIdentifier from "@/vue/services/product-identifier";

export default {
  async generateSquatchBoxGroups(orders, addresses) {
    if (!orders.subscriptions || !orders.onetimes) return {};
    const subscriptions = orders.subscriptions.filter(subs => !subs.cancelled_at);
    // cookie
    const squatchBoxGroups = this.processOrderData([...subscriptions, ...orders.onetimes], addresses);
    return squatchBoxGroups;
  },

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
        if (obj[addressLabel].addresses) {
          if (obj[addressLabel].addresses.findIndex(address => address.id === addressMatch.id) < 0) {
            obj[addressLabel].addresses.push(addressMatch);
          }
        }
      } else {
        obj[addressLabel] = {
          fullAddress: addressMatch,
          addresses: [addressMatch],
          items: [item],
          discountCodes: [discountId],
        };
      }
      let upcomingRefillDates = obj[addressLabel].items.filter(item => item.next_charge_scheduled_at).map(item => item.next_charge_scheduled_at.split("T")[0]);
      upcomingRefillDates = upcomingRefillDates.filter((date, index) => upcomingRefillDates.indexOf(date) === index).sort();

      let refillsObj = {};
      upcomingRefillDates.forEach(date => {
        refillsObj[date] = obj[addressLabel].items.filter(item => item.next_charge_scheduled_at && item.next_charge_scheduled_at.split("T")[0] === date);
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
        return ProductIdentifier.identify(product)[0] === "soap";
      });
    }
    return source;
  }
};