import { useContext, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import PreviewProductContext from '@modules/Commerce/context/PreviewProductContext';

export default function RelatedProducts({ accessories, product }) {
  const { togglePreview } = useContext(PreviewProductContext);
  const [count, setCount] = useState(3);
  const increment = 3;
  const related = product?.related?.edges?.map(({ node }) => node);
  const accessoryIds =
    product?.attributes?.edges?.find(({ node }) => node.label === 'Accessories')
      ?.node?.options || [];

  if (!accessoryIds || accessoryIds.length < 1) {
    return null;
  }
  return (
    <div className='bg-brand-gray row'>
      <div className='contain'>
        <h2>Related products</h2>
        <ul className='grid gap-5 mt-10 md:grid-cols-2 lg:grid-cols-3'>
          {accessories
            ?.filter((p) => {
              if (accessoryIds.includes(p.sku)) {
                return true;
              } else {
                return false;
              }
            })
            ?.map((p, index) => {
              if (index < count) {
                return (
                  <li
                    className='grid bg-white rounded shadow-xl p-5 grid-cols-[100px,1fr] gap-5'
                    key={p.name}
                  >
                    <figure className='relative aspect-w-1 aspect-h-1'>
                      {p?.image?.mediaItemUrl && (
                        <Image
                          src={p?.image?.mediaItemUrl}
                          layout='fill'
                          objectFit='contain'
                          alt={p.name}
                        />
                      )}
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
        {accessoryIds?.length > count && (
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
