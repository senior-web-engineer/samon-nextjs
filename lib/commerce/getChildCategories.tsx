import wp from '@lib/wp/wp';

const getChildCategories = async () => {
  try {
    const response = await wp(`
query fetchAllDistributors {
    productCategories(first:1000) {
      edges {
        node {
          slug
          ancestors(first: 1000) {
            edges {
              node {
                slug
              }
            }
          }
        }
      }
    }
  }
`);

    const data = response.productCategories.edges
      .map(({ node }) => {
        return {
          ...node,
          parent: node?.ancestors?.edges[0]?.node?.slug || null,
        };
      })
      .filter((node) => node.ancestors);

    return data;
  } catch (error) {
    console.error('ERROR getParentCategories ==>', error);
    return false;
  }
};

export default getChildCategories;
