import axios from "axios";

const rechargeProxyAPI = axios.create({
  baseURL: "https://recharge.drsquatchservices.com",
  headers: {
    "X-API-Key": "OXOVAF8YvN3o4GB1nrk8iai9dF4dCzsj4CCvSVbS"
  }
});

export default {
  async getUser(email) {
    try {
      const response = await rechargeProxyAPI.get(
        `/customer?email=${email}`
      );
      return response.data;
    } catch (err) {
      console.log("Failed to get user");
      console.log(err);
    }
  },
  async getUserResource(rechargeId, resource) {
    try {
      const response = await rechargeProxyAPI.get(
        `/customer/${rechargeId}/${resource}`
      );
      return resource !== "subscriptions" ? response.data[resource] : response.data;
    } catch (err) {
      console.log(`Failed to get customer ${resource}`);
      console.log(err);
    }
  },
  async updateCustomer(customerId, customerData) {
    try {
      const response = await rechargeProxyAPI.put(
        `/customer/${customerId}`,
        customerData
      );
      // if (dataLayer) {
      //   dataLayer.push({ event: "RechargeProxyAPI - attempt", trace: "updateCustomer" });
      // }
      return response.data;
    } catch (err) {
      return err.response.data.message || `status ${err.response.status}`;
    }
  },
  async updateOnetime(onetimeId, onetimeData) {
    try {
      const response = await rechargeProxyAPI.put(
        `/onetime/${onetimeId}`,
        onetimeData
      );
      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      return {
        success: false,
        error: err.response.data.message || `status ${err.response.status}`
      };
    }
  },
  async removeOnetime(onetimeId) {
    try {
      const response = await rechargeProxyAPI.delete(
        `/onetime/${onetimeId}`
      );
      console.log(response);
      return response.data;
    } catch (err) {
      return err.response.data.message || `status ${err.response.status}`;
    }
  },
};
   
function convertQueryObjToString(queryObj) {
  if (!queryObj) return "";
  let queryStrings = [];
  Object.keys(queryObj).forEach(key => {
    queryStrings.push(`${key}=${queryObj[key]}`);
  });
  return queryStrings.length ? `&${queryStrings.join("&")}` : "";
}