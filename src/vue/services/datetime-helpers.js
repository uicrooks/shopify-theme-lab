export default {
  isSame(val1, val2, unit = null) {
    if (!unit) return window.app.$moment(val1).isSame(val2);
    return window.app.$moment(val1).isSame(val2, unit);
  },
  format(val, format = "") {
    return window.app.$moment(val).format(format);
  }
};