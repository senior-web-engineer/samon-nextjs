import wp from '@lib/wp/wp';

const getDocuments = async () => {
  try {
    const response = await wp(`
      query getAllDocuments {
        allDocument {
          edges {
            node {
              title
              gqlDocumentFields {
                  category
                  description
                  documents {
                    document {
                      mediaItemUrl
                    }
                  }
              }
            }
          }
        }
      }
    `);
    const data = response.allDocument.edges.map(({ node }) => node);
    //('DATA getDocuments ==>', data);
    return data;
  } catch (error) {
    console.error('ERROR getDocuments ==>', error);
    return false;
  }
};

export default getDocuments;
