const _mergeObjs = (def, obj) => {
  if (typeof obj === "undefined") {
    return def;
  } else if (typeof def === "undefined") {
    return obj;
  }
  for (const i in obj) {
    if (obj[i] != null && obj[i].constructor === Object) {
      def[i] = app._mergeObjs(def[i], obj[i]);
    } else {
      def[i] = obj[i];
    }
  }
  return def;
}

const _cartProcessingPromise = (data) => {
  return new Promise(resolve => {
    data.items.forEach(item => {
      if (item.properties["subscription_id"]) { item.url = "javascript:void(0)" }
    });
    resolve(data);
  });
}

export {
  _mergeObjs,
  _cartProcessingPromise
}