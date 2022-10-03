import { CONTENT_CATEGORY } from '@queries/content';
import wp from '@lib/wp/wp';

const getLatestNews = async () => {
  try {
    const newsRes = await wp(`
      query getLatestNews {
        contentCategory(idType: NAME, id: "News") {
          allContent {
            edges {
              node {
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
    const eventRes = await wp(`
      query getLatestNews {
        contentCategory(idType: NAME, id: "Event") {
          allContent {
            edges {
              node {
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
    const newsData = newsRes.contentCategory.allContent.edges.map(
      (edge) => edge
    );
    const eventData = eventRes.contentCategory.allContent.edges.map(
      (edge) => edge
    );
    const data = newsData.concat(eventData);
    //();
    return data;
  } catch (error) {
    //(error);
    return;
  }
};
export default getLatestNews;
