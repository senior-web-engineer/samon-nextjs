import getAllProducts from './getAllProducts';

const Component = async () => {
  try {
    const allproducts = await getAllProducts();
    const compatible = allproducts.filter((p) => p.product);
    return compatible;
  } catch (error) {
    console.error('ERROR Component ==>', error);
    return false;
  }
};

export default Component;
