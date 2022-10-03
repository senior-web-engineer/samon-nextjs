import { useContext, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import PreviewProductContext from '@modules/Commerce/context/PreviewProductContext';
import uniq from 'lodash.uniq';

export default function CompatibleProducts({ product, compatibleProducts }) {
  const [count, setCount] = useState(3);
  const { togglePreview } = useContext(PreviewProductContext);
  const [filter, setFilter] = useState('');
  const increment = 3;
  const handleGasFilter = (gas) => {
    if (filter === gas) {
      setFilter('');
    } else {
      setFilter(gas);
    }
  };
  const gases = uniq(
    compatibleProducts
      .filter((p) =>
        p?.categories?.find(({ node }) => node.ancestors) ? true : false
      )
      .map((p) => {
        const cat = p.categories.find((cat) => cat.node.ancestors);
        return cat.node.name;
      })
  );

  if (!compatibleProducts || compatibleProducts.length < 1) {
    return null;
  }
  return (
    <div id='compatible-products' className='pb-10 bg-brand-gray row'>
      <div className='contain'>
        <h2>Compatible with {product.name}</h2>
        <div className='flex flex-wrap items-center mt-5 space-x-3'>
          {gases.map((gas) => {
            const standard = `bg-white`;
            const active = `bg-brand-red text-white`;
            return (
              <button
                className={`px-3 mb-2 py-1 rounded font-semibold ${
                  filter === gas ? active : standard
                }`}
                onClick={() => handleGasFilter(gas)}
                key={gas}
              >
                {gas}
              </button>
            );
          })}
        </div>
        <ul className='grid gap-5 mt-10 md:grid-cols-2 lg:grid-cols-3'>
          {compatibleProducts
            .filter((p) => {
              if (!filter) {
                return true;
              } else {
                return p?.categories?.find((cat) => cat?.node?.name === filter);
              }
            })
            .map((p, index) => {
              if (index < count) {
                return (
                  <li
                    className='grid bg-white p-5 rounded shadow-lg grid-cols-[100px,1fr] gap-5'
                    key={p.name}
                  >
                    <figure className='relative aspect-w-1 aspect-h-1'>
                      <Image
                        src={p.image.mediaItemUrl}
                        layout='fill'
                        objectFit='contain'
                        alt={p.name}
                      />
                    </figure>
                    <div>
                      <h3>{p.name}</h3>
                      <button onClick={() => togglePreview(p)}>Show</button>
                    </div>
                  </li>
                );
              } else {
                return null;
              }
            })}
        </ul>
        {compatibleProducts.length > count && (
          <div className='mt-10 text-center'>
            <button
              className='btn'
              onClick={() => setCount((prev) => prev + increment)}
            >
              Show more
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
