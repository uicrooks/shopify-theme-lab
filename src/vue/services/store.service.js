import axios from "axios";
import Client from "shopify-buy";

const client = Client.buildClient({
  domain: "drsquatchsoapco-dev.myshopify.com",
  storefrontAccessToken: "59ffce7d2481f8cc5ceb2c45770e3379"
});


export default {
  async getCollectionById(id) {
    return client.collection.fetchWithProducts(btoa(`gid://shopify/Collection/${id}`));
  },
  async getProductById(id) {
    return client.product.fetch(btoa(`gid://shopify/Product/${id}`));
  },
  async getProductByHandle(handle) {
    return client.product.fetchByHandle(handle);
  },
  async get() {
    const result = await axios({
      url: "https://drsquatchsoapco-dev.myshopify.com/api/2021-04/graphql.json",
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": "59ffce7d2481f8cc5ceb2c45770e3379"
      },
      data: {
       query: `
        {
          collections {
            id
            title
            description
          }
        }
       `
      }
    });
    console.log(result);
  }
};

