import Cookies from "universal-cookie";
 
const cookies = new Cookies();

export default {
  get(name) {
    cookies.get(name);
  },
  set(name, value, options = {}) {
    cookies.set(name, value, options);
  }
};