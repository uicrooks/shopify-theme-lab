import moment from "moment";

export default {
  isSame(val1, val2, unit = null) {
    if (!unit) return moment(val1).isSame(val2);
    return moment(val1).isSame(val2, unit);
  },
  format(val, format = "") {
    return moment(val).format(format);
  }
};