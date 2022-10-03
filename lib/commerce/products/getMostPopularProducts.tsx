export default function getMostPopularProducts(products) {
  const popular = products
    ? products?.filter((p) => {
        return p.productTags.edges.some(
          ({ node }) => node.slug === 'most-popular'
        );
      })
    : [];

  return popular;
}
