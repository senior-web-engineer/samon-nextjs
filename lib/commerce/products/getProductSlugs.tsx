import wp from '@lib/wp/wp';

const getProductSlugs = async () => {
  try {
    const response = await wp(`
query getAllProductSlugs {
    products(first: 1000) {
      nodes {
        slug
        productCategories {
          nodes {
            slug
            ancestors {
              nodes {
                slug
              }
            }
          }
        }
      }
    }
  }
`);
    const data = response.products.nodes
      .map((node) => {
        const category = node.productCategories.nodes.find(
          (node) => !node.ancestors
        );
        const subcategory = node.productCategories.nodes.find(
          (node) => node.ancestors
        );

        return {
          params: {
            product: node.slug,
            category: category?.slug || '',
            subcategory: subcategory?.slug || '',
          },
        };
      })
      .filter(({ params }) => params.category && params.subcategory);

    return data;
  } catch (error) {
    console.error('ERROR getProductSlugs ==>', error);
    return false;
  }
};

export default getProductSlugs;
