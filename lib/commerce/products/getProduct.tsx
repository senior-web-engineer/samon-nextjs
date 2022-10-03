import wp from '@lib/wp/wp';

export default async function getProduct(slug) {
  const data = await wp(
    `
    query getProduct($slug: ID!) {
        product(id: $slug, idType: SLUG) {
            name
            slug
            databaseId
            description
            image {
                mediaItemUrl
            }
            ... on SimpleProduct {
              
              price(format:RAW)
              productCategories {
                edges {
                  node {
                    name
                    slug
                  }
                }
              }
            }
            sku
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
              documents {
                file {
                  mediaItemUrl
                  mimeType
                }
                name
              }
              tabs {
                content
                heading
              }
              redbox {
                title
                text
              }
            }
            related {
              edges {
                node {
                  ... on SimpleProduct {
                    name
                    slug
                    price(format: RAW)
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
                    attributes {
                      edges {
                        node {
                          label
                          options
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
                  label
                  options
                }
              }
            }
            upsell {
              edges {
                node {
                  ... on SimpleProduct {
                    name
                    slug
                    price(format:RAW)
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
                    attributes {
                      edges {
                        node {
                          options
                          label
                          name
                        }
                      }
                    }
                  }
                  
                }
              }
            }
        }
    }
  `,
    {
      variables: {
        slug,
      },
    }
  );

  const product = data?.product;

  let cats = product?.productCategories?.edges
    ? [...product?.productCategories?.edges]
    : [];
  const sortedCategories = cats?.sort((a, b) =>
    a.node.ancestors && !b.node.ancestors ? 1 : -1
  );
  let hrefStr = '/products';

  for (let category of cats) {
    if (category?.node?.slug) {
      hrefStr += '/' + category?.node?.slug;
    }
  }

  hrefStr += `/${product?.slug}`;
  const isPopular =
    product?.productTags?.edges?.some(
      ({ node }) => node?.slug === 'most-popular'
    ) || false;
  const tags =
    product?.productTags?.edges
      ?.map(({ node }) => node)
      .filter((node) => node?.slug !== 'most-popular') || [];
  const obj = {
    ...product,
    categories: sortedCategories || [],
    href: hrefStr,
    isPopular,
    tags,
  };

  return obj;
}
