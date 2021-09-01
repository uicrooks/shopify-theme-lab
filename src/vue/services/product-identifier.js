export default {
  identify(product) {
    if (!product || !product.type) return [];

    let type = product.productType && product.productType.toLowerCase();
    if (!type) {
      type = product.type && product.type.toLowerCase();
    }
    let title = product.title && product.title.toLowerCase();
    type = type === "soap" ? "barsoap" : type;

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
    if (type === "toothpaste" ||  product.tags && product.tags.includes("toothpaste")) {
      arr.push("toothpaste");
      if (title.includes("kit")) {
        arr.push("kit");
      }
      return arr;
    }
    if (type === "deodorant" || product.tags && product.tags.includes("deodorant")) {
      arr.push("deodorant");
      if (type === "bundle") {
        arr.push("bundle");
      }
      if (title.includes("pack")) {
        arr.push("pack");
      }
      return arr;
    }
    if (type === "sanitizer" || type === "liquidsoap") {
      arr.push(type);
      if (title.includes("pack")) {
        arr.push("pack");
      }
      return arr;
    }
    return [type];
  },
  getType(product) {
    return product.type && product.type.toLowerCase();
  },
  getIdentityString(product) {
    return this.identify(product).join("-");
  },
  getUnitNameByIdentityString(identityString) {
    if (identityString === "barsoap") {
      return "bar";
    }
    if (identityString === "haircare-kit") {
      return "kit";
    }
    if (["haircare-shampoo", "haircare-conditioner"].includes(identityString)) {
      return "bottle";
    }
    if (identityString === "toothpaste") {
      return "kit"; // subs only
    }
    if (identityString === "deodorant") {
      return "stick";
    }
    return "";
  },
  checkIfGrouped(product) {
    const handle = product.handle.toLowerCase();
    const title = product.title.toLowerCase();
    return handle.includes("kit") || handle.includes("bundle") || handle.includes("set") || handle.includes("pack") || handle.includes("duo") || title.includes("kit") || title.includes("bundle") || title.includes("set") || title.includes("pack") || title.includes("duo");
  }
};