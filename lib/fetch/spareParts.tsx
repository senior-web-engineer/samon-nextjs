import wp from '@lib/wp/wp';

export const fetchAllSpareParts = async () => {
  try {
    const response = await wp(`
      query fetchAllSpareParts {
        products(first:1000,where: { category: "Spare parts" }) {
          edges {
            node {
              image {
                mediaItemUrl
              }
              databaseId
              ... on SimpleProduct {
                id
                name
                slug
                shortDescription
                productCategories {
                  edges {
                    node {
                  name
                  slug
                }
                }
                }
                productTags {
                  edges {
                    node {
                      name
                      slug
                    }
                  }
                }
                price(format:RAW)
                attributes {
                  edges {
                    node {
                      options
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    `);

    const data = response.products.edges.map(({ node }) => node);
    let products = [];
    for (let product of data) {
      let cats = [...product.productCategories.edges];
      const sortedCategories = cats.sort((a, b) =>
        a.node.ancestors && !b.node.ancestors ? 1 : -1
      );
      let hrefStr = '/products';

      for (let category of cats) {
        hrefStr += '/' + category.node.slug;
      }

      hrefStr += `/${product.slug}`;
      const isPopular = product?.productTags?.edges?.some(
        ({ node }) => node.slug === 'most-popular'
      );
      const tags =
        product?.productTags?.edges
          ?.map(({ node }) => node)
          .filter((node) => node.slug !== 'most-popular') || [];
      const obj = {
        ...product,
        categories: sortedCategories || [],
        href: hrefStr,
        isPopular,
        tags,
      };
      products.push(obj);
    }

    return products;
  } catch (error) {
    console.error('ERROR =>', error);
    return [];
  }
};

export const retrieveModelNumbersFromProducts = (a) => {
  const modelNumbers = a.map((product) => {
    //('SKU =>', product.sku);
    return product.sku;
  });

  return modelNumbers;
};
