import wp from '@lib/wp/wp';

const getTrainings = async () => {
  try {
    const response = await wp(`
      query getTrainings {
        allTraining {
          edges {
            node {
                id
                slug
              title
              gqlTrainingFields {
                description
                shortDescription
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
    const data = response.allTraining.edges.map(({ node }) => node);
    //('DATA getTrainings ==>', data);
    return data;
  } catch (error) {
    console.error('ERROR getTrainings ==>', error);
    return false;
  }
};

export default getTrainings;
