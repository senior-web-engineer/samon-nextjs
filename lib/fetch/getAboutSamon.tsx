import wp from '@lib/wp/wp';
export const getAboutSamon = async () => {
  try {
    const response = await wp(`
      query getAboutSamon {
        aboutSamonSettings {
          aboutFields {
            abouttext
            aboutheading
            ourValues {
              heading
              text
              values {
                heading
                text
              }
            }
            ourMission {
              heading
              text
              image {
                mediaItemUrl
              }
            }
            whoWeAre {
              heading
              text
              image {
                mediaItemUrl
              }
            }
          }
        }
      }
    `);
    const data = response.aboutSamonSettings.aboutFields;
    //(data);
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};
