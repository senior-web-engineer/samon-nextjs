export const PRODUCT_CATEGORIES_ALL = `
query fetchAllProductCategories {
  productCategories(where: {parent: 0}) {
    edges {
      node {
        name
        slug
        menuOrder
        image {
          mediaItemUrl
        }
        description
      }
    }
  }
}
`;
