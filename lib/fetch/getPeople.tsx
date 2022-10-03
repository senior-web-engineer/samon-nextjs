import wp from '@lib/wp/wp';

export const getPeople = async () => {
  try {
    const response = await wp(`
      query fetchAllPeople {
        aboutSamonSettings {
          aboutFields {
            peopleheading
            peopletext
            team {
              name
              title
              phone
              email
              image {
                mediaItemUrl
              }
            }
            directors {
              name
              title
              phone
              email
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
