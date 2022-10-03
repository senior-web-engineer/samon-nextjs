import { PRODUCT_CATEGORIES_ALL } from '@queries/products';
import wp from '../wp/wp';
export const fetchSortedProductCategories = async () => {
  try {
    const response = await wp(PRODUCT_CATEGORIES_ALL);
    const edges = response.productCategories.edges;
    const sorted = edges
      .filter(({ node }) => !node.slug.includes('shipping'))
      .sort((a, b) => {
        if (a.node.menuOrder > b.node.menuOrder) {
          return 1;
        } else {
          return -1;
        }
      });
    return sorted;
  } catch (error) {
    console.error('ERROR =>', error);
    return;
  }
};
