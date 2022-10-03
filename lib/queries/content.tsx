export const CONTENT_ALL = `
query fetchAllContent {
    allContent(first: 100) {
        edges {
            node {
              title
              slug
              featuredImage {
                  node {
                      mediaItemUrl
                  }
              }
              contentFields {
                  settings {
                      type {
                          name
                          slug
                        id
                      }
                  }
              }
            }
          }
      }
  }
`;

export const CONTENT_CATEGORY = `
query fetchAllContentByCategory($id: ID!) {
    contentCategory(id: $id, idType: SLUG) {
        id
        name
        description
        allContent(first:100) {
            edges {
                node {
                    title
                    slug
                    
                    featuredImage {
                        node {
                            mediaItemUrl
                        }
                    }
                    contentFields {
                        settings {
                            type {
                                name
                                slug
                              id
                            }
                        }
                    }
                }
            }
        }
    }
}
`;

export const CONTENT_CATEGORIES = `
query fetchAllContentCategories {
    allContentCategory {
        edges {
            node {
                slug
                name
            }
        }
    }
}
`;

export const CONTENT_SINGLE = `
    query fetchContentBySlug($id: ID!) {
        content(id: $id, idType: SLUG) {
            id
            title
            featuredImage {
                node {
                    mediaItemUrl
                }
            }
            date
            contentFields {
                files {
                    name
                    file {
                      title
                      mediaItemUrl
                    }
                  }
                summary
                settings {
                    visibility
                    type {
                        name
                        slug
                    }
                }
            }
        }
    }
`;
