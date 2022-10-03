import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();
const auth = Buffer.from(
  process.env.CMS_GRAPHQL_AUTH_USER + ':' + process.env.CMS_GRAPHQL_AUTH_PASS
).toString('base64');

const wp = async (query, options) => {
  const hasVariables = options?.variables ? true : false;

  try {
    const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        query,
        variables: options?.variables,
      }),
    });

    const data = await response.json();

    if (!data.data) {
      throw 'ERROR';
    }
    return data.data;
  } catch (error) {
    //('WP GRAPQL ERROR =>', error);
    throw error;
  }
};

const prebuild = async () => {
  try {
    // const response = await wp(`
    //   query getAllPositions {
    //     allJobposition {
    //       edges {
    //         node {
    //           title
    //           featuredImage {
    //             node {
    //               mediaItemUrl
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // `);
    // const data = response.allJobposition.edges.map(({ node }) => node);
    // fs.writeFileSync('./data/static-job-openings.json', JSON.stringify(data));
  } catch (error) {
    return;
  }
};
prebuild();
