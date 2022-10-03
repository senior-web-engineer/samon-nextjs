import wp from '@lib/wp/wp';

export const getReferences = async () => {
  try {
    const response = await wp(`
      query getReferences {
        allReference {
          edges {
            node {
              title
              slug
              referenceFields {
                information {
                    
                  application {
                    ... on Application {
                      id
                      title
                      slug
                      
                      featuredImage {
                        node {
                          mediaItemUrl
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `);
    const data = response.allReference.edges.map(({ node }) => node);
    //('REFERENCES =>', data);
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};
