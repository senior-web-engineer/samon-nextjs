import wp from '@lib/wp/wp';

const getAccessories = async () => {
  try {
    const response = await wp(`
      query getAccessories {
        productCategory(id: "accessories", idType: SLUG) {
          products(first: 1000) {
            nodes {
              name
              sku
              slug
              attributes {
                nodes {
                  name
                  options
                }
              }
              productCategories {
                edges {
                  node {
                    name
                    slug
                  }
                }
              }
              image {
                mediaItemUrl
              }
            }
          }
        }
      }
    `);
    const data = response.productCategory.products.nodes;
    return data;
  } catch (error) {
    console.error('ERROR getAccessories ==>', error);
    return false;
  }
};

export default getAccessories;
