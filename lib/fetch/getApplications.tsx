import wp from '@lib/wp/wp';

export const getApplications = async () => {
  try {
    const response = await wp(`
      query getAllApplications {
        allApplication {
          edges {
            node {
              title
              slug
              applicationFields {
                intro
                environment {
                  ... on Environment {
                    title
                      slug
                    
                  }
                }
              }
              featuredImage {
                  node {
                    mediaItemUrl
                  }
              }
            }
          }
        }
      }
    `);
    const data = response.allApplication.edges.map(({ node }) => node);
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};
