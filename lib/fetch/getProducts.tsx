import wp from '@lib/wp/wp';

const getProducts = async () => {
  try {
    const response = await wp(`
      query getAllMainProducts {
        products(first:1000,where: { categoryNotIn: "Spare parts" }) {
          edges {
            node {
              ... on SimpleProduct {
                id
                name
                slug
                sku
                shortDescription
                productCategories {
                  edges {
                    node {
                      name
                      slug
                      ancestors {
                        edges {
                          node {
                            name
                          }
                        }
                      }
                    }
                  }
                }
                attributes {
                  edges {
                    node {
                      label
                      options
                    }
                  }
                }
                price(format:RAW)
                image {
                  mediaItemUrl
                }
                
              }
            }
          }
        }
      }
    `);
    let products = [];
    const data = response.products.edges
      .map(({ node }) => node)
      .filter(
        (product) =>
          product.productCategories.edges.length > 0 &&
          product.productCategories.edges.some(
            (edge) => edge.node.name !== 'To be removed'
          )
      );
    for (let product of data) {
      let cats = product?.productCategories?.edges || [];
      const sortedCategories = cats?.sort((a, b) =>
        a.node.ancestors && !b.node.ancestors ? 1 : -1
      );
      let hrefStr = '/products';
      for (let category of sortedCategories) {
        hrefStr += '/' + category.node.slug;
      }
      hrefStr += `/${product.slug}`;
      const obj = {
        ...product,
        href: hrefStr,
      };
      products.push(obj);
    }

    return products;
  } catch (error) {
    console.error(error);
    return;
  }
};
export default getProducts;
