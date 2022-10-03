import wp from '@lib/wp/wp';
import { SeoFragment } from '../seo/lib/get-seo';

export const REFERENCE_ALL = `
query fetchAllReference {
    allReference {
      edges {
        node {
            id
            title
            slug
            featuredImage {
                node {
                    mediaItemUrl
                }
            }
            referenceFields {
                information {
                  gases {
                    ... on Gas {
                      title
                    }
                  }
                    address {
                        latitude
                        longitude
                        city
                        country
                    }
                    application {
                      ... on Application {
                        title
                        slug
                      }
                    }
                    customervalue
                    solution
                    yearinoperation
                }
            }
        }
      }
    }
  }
`;

export const REFERENCE_SINGLE = `
  query fetchSingleReferenceByID($id: ID!) {
      reference(id: $id, idType: SLUG) {
        title
        ${SeoFragment}
        featuredImage {
            node {
                mediaItemUrl
            }
        }
        referenceFields {
          gallery {
            mediaItemUrl
          }
            information {
                customervalue
                solution
                application {
                  ... on Application {
                    title
                  }
                }
                gases {
                  ... on Gas {
                    title
                  }
                }
                yearinoperation
                address {
                    country
                }
            }
        }
      }
  }
`;

export const getReferencesByApplication = async (application: string) => {
  try {
    const response = await wp(
      `
        query fetchReferencesByApplication {
          allReference {
            edges {
              node {
                id
                title
                slug
                featuredImage {
                  node {
                    mediaItemUrl
                  }
                }
                referenceFields {
                  information {
                    customervalue
                    application {
                      ... on Application {
                        id
                        title
                        slug
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      { variables: { application } }
    );

    const data = response.allReference.edges
      .map(({ node }) => node)
      .filter((node) => {
        const slug = node.referenceFields.information.application[0].slug;
        if (slug === application) {
          return node;
        }
      });

    return data;
  } catch (error) {}
};
