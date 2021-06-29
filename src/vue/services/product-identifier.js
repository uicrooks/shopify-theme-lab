export default {
  getType(product) {
    return product.type.toLowerCase();
  },
  identify(product) {
    if (!product.type) {
      return null;
    }
    const type = product.type.toLowerCase();
    const title = product.title.toLowerCase();
    let arr = [];
    if (type === "haircare") {
      arr.push("haircare");
      if (title.includes("shampoo")) {
        arr.push("shampoo");
      }
      if (title.includes("conditioner")) {
        arr.push("conditioner");
      }
      if (title.includes("kit")) {
        arr.push("kit");
      }
      return arr;
    }
    if (type === "toothpaste" || product.tags.includes("toothpaste")) {
      arr.push("toothpaste");
      if (title.includes("kit")) {
        arr.push("kit");
      }
      return arr;
    }
    if (type === "deodorant" || product.tags.includes("deodorant")) {
      arr.push("deodorant");
      if (type === "bundle") {
        arr.push("bundle");
      }
      if (title.includes("pack")) {
        arr.push("pack");
      }
      return arr;
    }
    return [type];
  },
  // isGrouped(product) {
  //   const type = product.type && product.type.toLowerCase();
  //   const title = product.title && product.title.toLowerCase();
  //   return type === "bundle" || title.includes("kit") || title.includes("pack")
  // },
  checkIfGroupedByHandle(handle) {
    return handle.includes("kit") || handle.includes("bundle") || handle.includes("set") || handle.includes("pack") || handle.includes("duo");
  }
};