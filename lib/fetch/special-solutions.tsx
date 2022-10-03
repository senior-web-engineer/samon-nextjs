import wp from '@lib/wp/wp';

export const getSpecialSolutions = async () => {
  try {
    const response = await wp(`
      query getSpecialSolutions {
        globalGeneralSettings {
          settingsFields {
            specialSolutions {
              ... on Application {
                title
                slug
                featuredImage {
                  node {
                    mediaItemUrl
                  }
                }
                applicationFields {
                  intro
                }
              }
            }
          }
        }
      }
    `);
    const data = response.globalGeneralSettings.settingsFields.specialSolutions;
    //('SPECIAL SOLUTIONS =>', data);
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};
