import wp from '@lib/wp/wp';

export default async function getParentCategory(current) {
  const data = await wp(
    `
      query getParentCategory($category: ID!) {
        productCategory(id: $category, idType: SLUG) {
          name
          ancestors {
            edges {
              node {
                name
                slug
              }
            }
          }
        }
      }
    `,
    {
      variables: {
        category: current,
      },
    }
  );
  const parent = data?.productCategory?.ancestors?.edges?.map(
    ({ node }) => node
  )[0];

  return parent;
}
