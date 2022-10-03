export const APPLICATIONS_ALL = `
    query fetchAllApplications {
        allApplication {
            edges {
                node {
                    title
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
`;

export const APPLICATIONS_SLUGS = `
    query fetchAllApplicationSlugs {
        allApplication {
            edges {
                node {
                    slug
                }
            }
        }
    }
`;

export const APPLICATION_SINGLE = `
    query fetchApplication($id: ID!) {
        application(id: $id, idType: SLUG) {
            title
            slug
            featuredImage {
                node {
                    mediaItemUrl
                }
            }
            applicationFields {
                references {
                    ... on Reference {
                      id
                      title
                      referenceFields {
                        information {
                          customervalue
                        }
                      }
                      featuredImage {
                        node {
                          mediaItemUrl
                        }
                      }
                      slug
                    }
                  }
                intro
                hideRecommendedSolutions
                gqlenvironment
                description {
                    title
                    text
                    gases {
                        ... on Gas {
                            title
                            slug
                        }
                    }
                }
                environment {
                    ... on Environment {
                        gqlEnvironmentFields {
                            threeduri
                        }
                    }
                }
                applicableLawsAndRegulations {
                    text
                    title
                  }
                  serviceAndMaintenance {
                    text
                    title
                  }
            }
        }
    }
`;
