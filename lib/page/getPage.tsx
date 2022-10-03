import wp from '@lib/wp/wp';

const getPage = async (slug: string) => {
  try {
    if (!slug) {
      throw 'No slug was provided';
    }

    const response = await wp(
      `
        query getPage($slug: ID!) {
          page(id: $slug, idType: URI) {
            seo {
              title
              metaDesc
            }
            title
            slug
            gqlPageFields {
              intro
              layout {
                settings {
                  background {
                    type
                    image {
                      mediaItemUrl
                    }
                  }
                }
                section {
                  row {
                    column {
                      columnSpan
                      blocks {
                        ... on Page_Gqlpagefields_layout_section_row_column_Blocks_References {
                          fieldGroupName
                          title
                          cases {
                            ... on Reference {
                              id
                              title
                              slug
                              featuredImage {
                                node {
                                  mediaItemUrl
                                }
                              }
                            }
                          }
                        }
                        ... on Page_Gqlpagefields_layout_section_row_column_Blocks_GridLinks {
                          fieldGroupName
                          text
                          links {
                            ... on Page {
                              id
                              title
                              slug
                              gqlPageFields {
                                intro
                                featuredImage {
                                  mediaItemUrl
                                }
                              }
                            }
                          }
                          title
                        }
                        ... on Page_Gqlpagefields_layout_section_row_column_Blocks_Image {
                          fieldGroupName
                          image {
                            mediaItemUrl
                            mediaDetails {
                              width
                              height
                            }
                          }
                          settings {
                            cover
                            aspectRatio
                          }
                        }
                        ... on Page_Gqlpagefields_layout_section_row_column_Blocks_Text {
                          fieldGroupName
                          text
                          settings {
                            orientation
                            color
                          }
                        }
                        ... on Page_Gqlpagefields_layout_section_row_column_Blocks_Quote {
                          author
                          fieldGroupName
                          quote
                        }
                        ... on Page_Gqlpagefields_layout_section_row_column_Blocks_Blurb {
                          fieldGroupName
                          text
                          title
                          orientation
                          image {
                            mediaItemUrl
                          }
                        }
                        ... on Page_Gqlpagefields_layout_section_row_column_Blocks_People {
                          fieldGroupName
                          title
                          people {
                            email
                            name
                            phone
                            title
                            video {
                              mediaItemUrl
                            }
                            image {
                              mediaItemUrl
                            }
                          }
                        }
                        ... on Page_Gqlpagefields_layout_section_row_column_Blocks_Buttons {
                          fieldGroupName
                          buttons {
                            label
                            url
                          }
                          settings {
                            orientation
                          }
                        }
                        ... on Page_Gqlpagefields_layout_section_row_column_Blocks_Testimonial {
                          fieldGroupName
                          name
                          quote
                          title
                          image {
                            mediaItemUrl
                          }
                        }
                        ... on Page_Gqlpagefields_layout_section_row_column_Blocks_JobPositions {
                          fieldGroupName
                          title
                          positions {
                            ... on Jobposition {
                              id
                              title
                              slug
                              featuredImage {
                                node {
                                  mediaItemUrl
                                }
                              }
                            }
                          }
                        }
                        ... on Page_Gqlpagefields_layout_section_row_column_Blocks_Trainings {
                          fieldGroupName
                          trainings {
                            ... on Training {
                              id
                              title
                              slug
                              gqlTrainingFields {
                                shortDescription
                              }
                              featuredImage {
                                node {
                                  mediaItemUrl
                                }
                              }
                            }
                          }
                        }
                        ... on Page_Gqlpagefields_layout_section_row_column_Blocks_BookAService {
                          description
                          fieldGroupName
                          title
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      {
        variables: {
          slug,
        },
      }
    );
    const data = response.page;

    return data;
  } catch (error) {
    console.error('ERROR getPage ==>', error);
    return false;
  }
};

export default getPage;
