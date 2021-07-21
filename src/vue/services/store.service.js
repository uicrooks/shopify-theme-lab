import axios from "axios";
import Client from "shopify-buy";

// dev: 59ffce7d2481f8cc5ceb2c45770e3379
// prod: c0a2971fcd589c75363ab578e0bc4a10
const client = Client.buildClient({
  domain: "drsquatchsoapco.myshopify.com",
  storefrontAccessToken: "c0a2971fcd589c75363ab578e0bc4a10"
});


export default {
  async login(authInput) {
    return await axios({
      url: "https://drsquatchsoapco.myshopify.com/api/2021-07/graphql.json",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": "c0a2971fcd589c75363ab578e0bc4a10"
      },
      data: {
        query: `
          mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
            customerAccessTokenCreate(input: $input) {
              customerAccessToken {
                accessToken
                expiresAt
              }
              customerUserErrors {
                code
                field
                message
              }
            }
          }
        `,
        variables: {
          input: {
            "email": "will@drsquatch.com",
            "password": "letmein"
          }
        }
      },
    });
  },
  getCustomer(accessToken) {
    return axios({
      url: "https://drsquatchsoapco.myshopify.com/api/2021-07/graphql.json",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": "c0a2971fcd589c75363ab578e0bc4a10"
      },
      data: {
        query: `
          customer(customerAccessToken: $accessToken) {
            email
            displayName
            orders(first:10) {
              edges {
                node {
                  id
                }
              }
            }
          }
        `,
        variables: {
          accessToken: accessToken
        }
      },
      
    });
    console.log(result);
  },
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

