import wp from '@lib/wp/wp';

export const getSolutions = async () => {
  try {
    const response = await wp(`
            query getSolutions {
                allSolution(first:1000) {
                    edges {
                        node {
                          title
                          slug
                          featuredImage {
                              node {
                                  mediaItemUrl
                              }
                          }
                          solutionFields {
                            settings {
                              application {
                                ... on Application {
                                  slug
                                }
                              }
                                gas {
                                  ... on Gas {
                                    title
                                  }
                                }
                                
                                system
                              }
                            recommendedProducts {
                              products {
                                product {
                                  
                                  ... on SimpleProduct {
                                    id
                                    name
                                    sku
                                    slug
                                    price(format: RAW)
                                    databaseId
                                    productCategories {
                                        edges {
                                          node {
                                            productCategoryFields {
                                              color
                                            }
                                            ancestors {
                                              edges {
                                                node {
                                                  name
                                                  slug
                                                }
                                              }
                                            }
                                            id
                                            slug
                                            name
                                          }
                                          isPrimary
                                        }
                                      }
                                    featuredImage {
                                      node {
                                        mediaItemUrl
                                      }
                                    }
                                  }
                                }
                                quantity
                              }
                            }
                          }
                        }
                      }
                }
            }
        `);

    let data = response.allSolution.edges.map(({ node }) => node);
    let solutions = [];
    for (let solution of data) {
      let obj = {
        ...solution,
      };
      let products = [];

      if (solution?.solutionFields?.recommendedProducts?.products) {
        for (let product of solution.solutionFields.recommendedProducts
          .products) {
          let cats = product?.product?.productCategories?.edges || [];
          const sortedCategories = cats?.sort((a, b) =>
            a.node.ancestors && !b.node.ancestors ? 1 : -1
          );
          let hrefStr = '/products';

          for (let category of sortedCategories) {
            hrefStr += '/' + category.node.slug;
          }

          hrefStr += `/${product.product.slug}`;
          let p = {
            ...product.product,
            href: hrefStr,
            categories: sortedCategories,
            price: product.product.price,
          };
          products.push(p);
        }
      }

      obj.products = products;
      solutions.push(obj);
    }
    return solutions;
  } catch (error) {
    console.log('SOLUTIONS ERROR =>', error);
    return [];
  }
};
