export default function getAttributes(products: any, type?: string) {
  const attributes = [];
  products?.forEach(
    (product) =>
      product.attributes &&
      product.attributes.edges.forEach(({ node }) => {
        if (node.visible) {
          if (!attributes.find((attr) => attr.label === node.name)) {
            attributes.push({ label: node.name, options: node.options });
          } else {
            const attrIndex = attributes.indexOf(
              attributes.find((attr) => attr.label === node.name)
            );
            attributes[attrIndex].options = [
              ...attributes[attrIndex].options,
              ...node.options,
            ];
          }
        }
      })
  );
  //Remove duplicates
  attributes?.forEach((attr) => {
    const filteredOptions = attr.options.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    attr.options = [...filteredOptions];
  });
  let attr = attributes.filter((attr) => {
    if (attr.label === 'Compatible with') {
      return false;
    }
    return true;
  });
  return attr;
}
