import uniq from 'lodash.uniq';
import { useEffect } from 'react';
import { useState } from 'react';
const DistributorFilter = ({ allItems, filteredItems, setFilteredItems }) => {
  const [application, setApplication] = useState('');
  const [gas, setGas] = useState('');
  const [solution, setSolution] = useState('');

  const allApplications = uniq(
    allItems.map((item) => item.distributorFields.information.application)
  );
  const allSolution = uniq(
    allItems.map((item) => item.distributorFields.information.solution)
  );
  const resetFilter = () => {
    setApplication('');
    setSolution('');
    setGas('');
  };

  const updateFilteredItems = () => {
    const updatedList = allItems.filter((item) => {
      if (!application && !gas && !solution) {
        return true;
      } else {
        let filterCount = 0;
        let matchCount = 0;
        if (application) {
          filterCount++;
          if (item.distributorFields.information.application === application) {
            matchCount++;
          } else {
          }
        }
        if (solution) {
          filterCount++;
          if (item.distributorFields.information.solution === solution) {
            matchCount++;
          } else {
          }
        }

        return matchCount === filterCount ? true : false;
      }
    });
    setFilteredItems(updatedList);
  };
  useEffect(() => {
    updateFilteredItems();
  }, [application, gas, solution]);
  return (
    <div className='contain row-sm'>
      <div className='flex items-center justify-between'>
        <strong className='uppercase'>Filter:</strong>
        <div className='grid grid-cols-3 gap-5'>
          <select onChange={(e) => setApplication(e.target.value)}>
            <option value=''>All applications</option>
            {allApplications.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select>
            <option>Gas 1</option>
            <option>Gas 2</option>
            <option>Gas 3</option>
            <option>Gas 4</option>
          </select>
          <select onChange={(e) => setSolution(e.target.value)}>
            <option value=''>All solutions</option>
            {allSolution.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => resetFilter()}
          className='px-4 py-2 text-white uppercase rounded-full font-display bg-brand-red'
        >
          Reset filter
        </button>
      </div>
    </div>
  );
};
export default DistributorFilter;
