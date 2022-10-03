import wp from '@lib/wp/wp';

const getFrontpageApplications = async () => {
  try {
    const response = await wp(`
      query fetchApplication {
        globalGeneralSettings {
          settingsFields {
            applications {
              ... on Application {
                title
                slug
                uri
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
    `);
    const data = response.globalGeneralSettings.settingsFields.applications;
    return data;
  } catch (error) {
    console.error('ERROR getFrontpageApplications ==>', error);
    return false;
  }
};

export default getFrontpageApplications;
