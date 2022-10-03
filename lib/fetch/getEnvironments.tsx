import wp from '@lib/wp/wp';

export const getEnvironments = async () => {
  try {
    const response = await wp(`
      query fetchEnvironments {
        allEnvironment {
          edges {
            node {
              title
              slug
              featuredImage {
                  node {
                      mediaItemUrl
                  }
              }
              gqlEnvironmentFields {
                description
              }
            }
          }
        }
      }
    `);
    const data = response.allEnvironment.edges.map(({ node }) => node);

    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};
