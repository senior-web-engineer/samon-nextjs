const retrievePaths = (array, key) => {
  const paths = array[key].edges.map(({ node }) => {
    return {
      params: {
        aid: node.slug,
      },
    };
  });
  return paths;
};
export default retrievePaths;
