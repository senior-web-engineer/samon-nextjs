import flatten from 'lodash.flatten';
import uniq from 'lodash.uniq';
import { useEffect } from 'react';
import { useState } from 'react';
const ReferenceFilter = ({ allItems, filteredItems, setFilteredItems }) => {
  const [application, setApplication] = useState('');
  const [gas, setGas] = useState('');
  const [solution, setSolution] = useState('');

  const allApplications = uniq(
    allItems.map(
      (item) => item.referenceFields.information.application[0].title
    )
  );
  const allSolution = uniq(
    allItems.map((item) => item.referenceFields.information.solution)
  );
  const allGas = flatten(
    uniq(
      allItems.map(
        (item) =>
          item.referenceFields.information.gases &&
          item.referenceFields.information.gases.map((gas) => gas.title)
      )
    )
  ).filter((item) => item);
  //(allGas);
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
          if (
            item.referenceFields.information.application.some(
              (item) => item.title === application
            )
          ) {
            matchCount++;
          } else {
          }
        }
        if (solution) {
          filterCount++;
          if (item.referenceFields.information.solution === solution) {
            matchCount++;
          } else {
          }
        }
        if (gas) {
          filterCount++;

          if (
            item.referenceFields.information.gases.some(
              (item) => item.title === gas
            )
          ) {
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
      <div className='grid text-center md:text-left gap-3 md:grid-cols-[1fr,2fr,1fr]'>
        <strong className='flex items-center uppercase'>Filter:</strong>
        <div className='grid gap-5 md:grid-cols-3'>
          <select
            value={application}
            onChange={(e) => setApplication(e.target.value)}
          >
            <option value=''>All applications</option>
            {allApplications.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select value={gas} onChange={(e) => setGas(e.target.value)}>
            <option value=''>All gas</option>
            {allGas.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
          >
            <option value=''>All solutions</option>
            {allSolution.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='flex justify-end'>
          <button
            onClick={() => resetFilter()}
            className='px-4 py-2 text-white uppercase rounded-full font-display bg-brand-red'
          >
            Reset filter
          </button>
        </div>
      </div>
    </div>
  );
};
export default ReferenceFilter;
