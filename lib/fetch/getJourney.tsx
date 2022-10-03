import wp from '@lib/wp/wp';

export const getJourney = async () => {
  try {
    const response = await wp(`
        query getJourney {
            aboutSamonSettings {
              aboutFields {
                journeyheading
                journeytext
                milestones {
                  date
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

    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};
