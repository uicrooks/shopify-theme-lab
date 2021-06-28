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
    if (type === "haircare") {
      if (title.includes("shampoo")) {
        return "haircare-shampoo";
      }
      if (title.includes("conditioner")) {
        return "haircare-conditioner"
      }
      return "haircare-kit";
    }
    if (type === "toothpaste") {
      if (title.includes("kit")) {
        return "toothpaste-kit";
      }
      return "toothpaste";
    }
    return type;
  },
  isGrouped(product) {
    const title = product.title.toLowerCase();
    return title.includes("kit");
  }
};