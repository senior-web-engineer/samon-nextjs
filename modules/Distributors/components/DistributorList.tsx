import DistributorListItem from './DistributorListItem';
import { useState } from 'react';

const DistributorList = ({ items }) => {
  const [input, setInput] = useState('');

  return (
    <>
      <div className='pt-10 contain-sm'>
        <input
          type='text'
          value={input}
          placeholder='Search name or country'
          onChange={(e) => setInput(e.target.value)}
          className='p-4 border rounded'
        />
      </div>
      <ul className='grid gap-5 overflow-hidden md:gap-5 contain row-sm sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {items
          .filter((item) => {
            if (!input) {
              return true;
            }
            if (
              item.title.toLowerCase().includes(input.toLowerCase()) ||
              item.distributorFields.information.address.country
                .toLowerCase()
                .includes(input.toLowerCase()) ||
              item.distributorFields.information.address.streetAddress
                .toLowerCase()
                .includes(input.toLowerCase())
            ) {
              return true;
            }
            return false;
          })
          .map((item) => (
            <DistributorListItem key={item.id} item={item} />
          ))}
      </ul>
    </>
  );
};
export default DistributorList;
