import wp from '@lib/wp/wp';

const getTraining = async (slug: string) => {
  try {
    const response = await wp(
      `
        query getTraining($slug: ID!) {
          training(id: $slug, idType: SLUG) {
            title
            slug
            uri
            featuredImage {
              node {
                mediaItemUrl
              }
            }
            gqlTrainingFields {
                description
                shortDescription
            }
          }
        }
      `,
      {
        variables: { slug },
      }
    );
    const data = response.training;
    //('DATA getTraining ==>', data);
    return data;
  } catch (error) {
    console.error('ERROR getTraining ==>', error);
    return false;
  }
};

export default getTraining;
