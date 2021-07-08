import axios from "axios";
import Client from "shopify-buy";

// dev: 59ffce7d2481f8cc5ceb2c45770e3379
// prod: c0a2971fcd589c75363ab578e0bc4a10
const client = Client.buildClient({
  domain: "drsquatchsoapco.myshopify.com",
  storefrontAccessToken: "c0a2971fcd589c75363ab578e0bc4a10"
});


export default {
  getAllProducts() {
    return client.product.fetchAll();
  },
  getCollectionById(id) {
    return client.collection.fetchWithProducts(btoa(`gid://shopify/Collection/${id}`, {productsFirst: 10}));
  },
  getProductById(id) {
    return client.product.fetch(btoa(`gid://shopify/Product/${id}`));
  },
  getProductByHandle(handle) {
    return client.product.fetchByHandle(handle);
  },
  async get() {
    const result = await axios({
      url: "https://drsquatchsoapco.myshopify.com/api/2021-04/graphql.json",
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": "c0a2971fcd589c75363ab578e0bc4a10"
      },
      data: {
       query: `
        {
          products(first: 30) {
            edges {
              node {
                id
                title
                description
              }
            }
          }
        }
       ` 
      }
    });
    console.log(result);
  }
};


// {
//   collections {
//     id
//     title
//     description
//   }
// }

