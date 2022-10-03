import wp from '@lib/wp/wp';

export const getGases = async () => {
  try {
    const response = await wp(`
      query getAllGases {
        allGas(first: 100) {
          edges {
            node {
              title
              slug
              menuOrder
              gqlGasFields {
                category
              }
            }
          }
        }
      }
    `);
    const data = response.allGas.edges
      .map(({ node }) => node)
      .sort((a, b) => a.menuOrder - b.menuOrder);
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};
