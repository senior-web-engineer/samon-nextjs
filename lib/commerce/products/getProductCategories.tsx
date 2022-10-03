import wp from '@lib/wp/wp';

export default async function getProductCategories() {
  try {
    const response = await wp(`
            query getProductCategories {
                productCategories(first:100) {
                    edges {
                      node {
                        id
                        slug
                        description
                        menuOrder
                        name
                        image {
                          mediaItemUrl
                        }
                       
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
            }
        `);
    const data = response?.productCategories?.edges
      .filter(
        ({ node }) =>
          !node.slug.includes('shipping') &&
          !node.ancestors &&
          !node.slug.includes('most-popular') &&
          !node.slug.includes('to-be-removed')
      )
      .map(({ node }) => node)
      .sort((a, b) => a.menuOrder - b.menuOrder);

    return data;
  } catch (error) {
    //(error);
    return;
  }
}
