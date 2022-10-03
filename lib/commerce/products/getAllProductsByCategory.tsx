import wp from '@lib/wp/wp';

export default async function getAllProductsByCategory(category: string[]) {
  try {
    const response = await wp(
      `
      query getAllProductsByCategory($category: [String]) {
        products(first: 1000, where: {categoryIn: $category}) {
          edges {
            node {
              id
              slug
              name
              image {
                mediaItemUrl
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
              productTags {
                edges {
                  node {
                    name
                    slug
                  }
                }
              }
              attributes {
                edges {
                  node {
                    name
                    label
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
                              slug
                            }
                          }
                        }
                          slug
                          name
                      }
                  }
              }
            }
          }
        }
      }
    `,
      { variables: { category } }
    );
    const data = response.products.edges
      .map(({ node }) => node)
      .filter(
        (product) =>
          product.productCategories.edges.length > 0 &&
          product.productTags.edges.some(
            ({ node }) => node.slug === 'mu-compatible'
          ) &&
          product.productCategories.edges.some(
            (edge) => edge.node.name !== 'To be removed'
          )
      );
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
      const isPopular =
        product?.productTags?.edges?.some(
          ({ node }) => node.slug === 'most-popular'
        ) || false;
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
    console.error('ERROR', error);
  }
}
