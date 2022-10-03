import wp from '@lib/wp/wp';
export const getCareer = async () => {
  try {
    const response = await wp(`
      query getCareer {
        aboutSamonSettings {
          aboutFields {
            ourValues {
                heading
                text
                values {
                  heading
                  text
                  icon {
                      id
                  }
                }
              }
            references {
              heading
              text
              references {
                name
                quote
                title
                image {
                  mediaItemUrl
                }
              }
            }
            openPositions {
              heading
              positions {
                heading
                text
                image {
                  mediaItemUrl
                }
              }
            }
            careerIntro {
              heading
              text
              textBlock {
                heading
                text
              }
              image {
                mediaItemUrl
              }
            }
          }
        }
      }
    `);
    const data = response.aboutSamonSettings.aboutFields;
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};
