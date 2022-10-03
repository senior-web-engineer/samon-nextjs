import wp from '@lib/wp/wp';

export default async function getSubCategories(category) {
  try {
    const response = await wp(
      `
        query fetchSubCategories($category: ID!) {
          productCategory(id: $category, idType: SLUG) {
            children(first: 100) {
              edges {
                node {
                  name
                  slug
                  menuOrder
                  description
                  image {
                    mediaItemUrl
                  }
                }
              }
            }
          }
        }
      `,
      {
        variables: {
          category,
        },
      }
    );
    const data = response.productCategory.children.edges
      .map(({ node }) => node)
      .sort((a, b) => a.menuOrder - b.menuOrder);

    return data;
  } catch (error) {
    //(error);
    return;
  }
}
