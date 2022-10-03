import wp from '@lib/wp/wp';

const getDetectorGases = async () => {
  try {
    const response = await wp(`
query fetchDetectorGases {
    productCategory(id: "detectors", idType: SLUG) {
      children {
        nodes {
          name
          slug
        }
      }
    }
  }
`);
    const data = response.productCategory.children.nodes;

    return data;
  } catch (error) {
    console.error('ERROR getDetectorGases ==>', error);
    return false;
  }
};

export default getDetectorGases;
