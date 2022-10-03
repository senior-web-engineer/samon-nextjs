export const CONTENT_CATEGORY_SLUGS = `
query fetchAllContentCategorySlugs {
    allContentCategory {
        edges {
            node {
                slug
            }
        }
    }
}
`;
