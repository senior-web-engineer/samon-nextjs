import { useEffect, useState } from 'react';

export default function useFilteredProducts(initialProducts) {
  const [products, setProducts] = useState(initialProducts);
  const [filters, setFilters] = useState([]);

  const resetProducts = () => {
    setProducts(initialProducts);
  };
  useEffect(() => {
    const a = [...initialProducts];
    if (filters.length > 0) {
      const matches = a.filter((product) => {
        let maxScore = filters.length;
        let score = 0;

        const values = filters.map((item) => item.value);
        const attributes = product?.attributes?.edges?.map(({ node }) => {
          return node.options[0];
        });

        const match = values.every((el) => attributes?.includes(el));
        if (match) {
          return true;
        } else {
          return false;
        }
      });
      setProducts([...matches]);
    } else {
      setProducts([...initialProducts]);
    }
  }, [filters]);

  const updateFilter = (value) => {
    let a = [...filters];
    //Check if filter is already active
    const typeExists = a.some(
      (filterItem) => filterItem.filter === value.filter
    );
    const valueExists = a.some(
      (filterItem) =>
        filterItem.filter === value.filter && filterItem.value === value.value
    );

    if (valueExists) {
      //If already active, fitler out all other filters and update state
      const b = a.filter((filterItem) => filterItem.value !== value.value);
      setFilters([...b]);
    } else if (typeExists) {
      //If new value but same type, remove the old type and add new value
      const c = a.filter((filterItem) => filterItem.filter !== value.filter);
      setFilters([...c, value]);
    } else {
      //If not active just add new filter
      setFilters([...a, value]);
    }
  };
  return { products, updateFilter, resetProducts, filters };
}
