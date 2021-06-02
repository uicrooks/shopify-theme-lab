import axios from "axios";
import {_mergeObjs, _cartProcessingPromise} from "../helpers/helpers.js";

const axiosConfig = {
  headers: {
    "Cache-Control": "must-revalidate",
    "Cache-Control": "no-cache",
    "Cache-Control": "no-store",
    Pragma: "no-cache",
  },
};

export default {
  async test() {
    try {
      const res = await axios.get("/cart.js", axiosConfig);
      if (res.status === 200) {
        return res.data;
      }
    } catch (err) {
      console.log("failed to fetch cart", err);
      return null;
    }
  },
  sync() {
    return new Promise(resolve => {
      axios.all([axios.get("/cart.js", axiosConfig)]) // removed extra call, hopefully faster?
      .then(axios.spread((basic) => {
          // Both requests are now complete
          const basicCartData = basic.data;

          basicCartData.items.forEach((item) => {
            item.properties = item.properties || [];
          });

          _cartProcessingPromise(basicCartData).then((data) => {
              console.log(data);
              resolve(data);
          });
      }));
    }); 
  }
}