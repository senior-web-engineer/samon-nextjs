import wp from '@lib/wp/wp';

export default async function getCategoryData(category) {
  try {
    const response = await wp(
      `
        query getCategoryData($category: ID!) {
            productCategory(id: $category, idType: SLUG) {
                name
                slug
                products(first: 100) {
                    edges {
                        node {
                          sku
                          ... on SimpleProduct {
                            price(format:RAW)
                          }
                          
                          slug
                            name
                            image {
                                mediaItemUrl
                            }
                            productTags {
                              edges {
                                node {
                                  name
                                  slug
                                }
                              }
                            }
                            productFields {
                              information {
                                distributors {
                                  ... on Distributor {
                                    id
                                    title
                                    distributorFields {
                                      information {
                                        website
                                        address {
                                          country
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                            attributes {
                              edges {
                                node {
                                  name
                                  label
                                  visible
                                  options
                                }
                              }
                            }
                            productCategories {
                                edges {
                                  isPrimary
                                    node {
                                      ancestors {
                                        edges {
                                          node {
                                            name
                                          }
                                        }
                                      }
                                        name
                                        slug
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `,
      { variables: { category: category } }
    );
    const data = response.productCategory;
    let products = [];

    for (let edge of data.products.edges) {
      const product = edge.node;
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

    const categoryData = {
      ...data,
      products: products,
    };
    return categoryData;
  } catch (error) {
    //('getCategoryData ERROR', error);
  }
}
