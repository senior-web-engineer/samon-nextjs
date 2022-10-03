import { useContext, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import SearchContext from '@modules/Commerce/context/SearchContext';
import slug from 'slug';
import store from 'store';
import useSoldBy from 'store/storeSoldBy';
import { track_load } from '@lib/lf';
import { useCookieConsentState } from '@lib/context/cookieConsent';

export default function ProductsGrid({ products = [], title = '' }) {
  const cookieConsentState = useCookieConsentState()
  const soldByFilter = useSoldBy((state: any) => state.soldByFilter);
  const updateSoldByFilter = useSoldBy(
    (state: any) => state.updateSoldByFilter
  );
  const search = useContext(SearchContext);
  const sorted = products.sort((a: any, b: any) => {
    const aTags = a.productTags.edges.map(({ node }) => node.slug);
    return aTags.includes('most-popular') ? -1 : 1;
  });
  const handleChangeFilterSource = (value: string) => {
    if (value === soldByFilter) {
      updateSoldByFilter(null);
    } else {
      updateSoldByFilter(value);
    }
  };

  useEffect(() => {
  }, [soldByFilter]);
  const activeStyles = `w-4 h-4 border rounded  flex items-center justify-center bg-brand-red border-brand-red`;
  const defaultStyles = `w-4 h-4 border rounded  flex items-center justify-center bg-[#F0F0F0] border-brand-darkgray`;
  return (
    <div id='products' className='contain row'>
      <div className='flex flex-col items-center justify-between pt-0 pb-0 md:flex-row row-sm'>
        <h2>{title.replace('-', ' ')}</h2>
        <div className='flex flex-col md:flex-row'>
          <span className='md:mr-5'>Only show products sold by:</span>
          <div className='flex items-center space-x-3'>
            <button
              className='flex items-center space-x-2'
              onClick={() => handleChangeFilterSource('samon')}
            >
              <div
                className={
                  soldByFilter === 'samon' ? activeStyles : defaultStyles
                }
              >
                {soldByFilter === 'samon' && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-3 h-3 text-white fill-current'
                    viewBox='0 0 24 24'
                  >
                    <path d='M0 0h24v24H0V0z' fill='none' />
                    <path d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z' />
                  </svg>
                )}
              </div>
              <p>Samon</p>
            </button>
            <button
              className='flex items-center space-x-2'
              onClick={() => handleChangeFilterSource('distributor')}
            >
              <div
                className={
                  soldByFilter === 'distributor' ? activeStyles : defaultStyles
                }
              >
                {soldByFilter === 'distributor' && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-3 h-3 text-white fill-current'
                    viewBox='0 0 24 24'
                  >
                    <path d='M0 0h24v24H0V0z' fill='none' />
                    <path d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z' />
                  </svg>
                )}
              </div>
              <p>Distributors</p>
            </button>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-2 md:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 row-sm'>
        {products
          .filter((product) => {
            if (soldByFilter === 'samon') {
              return product?.price ? true : false;
            } else if (soldByFilter === 'distributor') {
              return product?.productFields?.information?.distributors &&
                product.productFields.information.distributors.length > 0
                ? true
                : false;
            } else {
              return true;
            }
          })
          .map((product) => (
            <ProductCard cookie={cookieConsentState?.lf} product={product} key={product.id} />
          ))}
      </div>
    </div>
  );
}
const ProductCard = ({ product, cookie }) => {
  if (!product.href) {
    return null;
  }
  return (
    <Link key={product.id} href={product.href}>
      <a onClick={() => cookie ? track_load(`http://www.leadforensics.com${product.href}`, `${product.name}`) : ''} className='relative block px-2 py-3 text-xs text-center transition-all bg-white rounded shadow-xl cursor-pointer md:px-5 md:py-8 hover:ring-2 ring-brand-red group'>
        {product.isPopular && (
          <span className='absolute z-10 px-3 py-1 text-xs font-bold text-white uppercase rounded-full md:text-sm top-5 left-5 bg-brand-red'>
            Popular
          </span>
        )}
        <div className='relative mb-5 aspect-w-1 aspect-h-1'>
          {product.image?.mediaItemUrl && (
            <Image
              src={product.image.mediaItemUrl}
              layout='fill'
              objectFit='contain'
              alt={`${product.name}`}
            />
          )}
        </div>
        <p>{product?.categories?.length > 0 && product.categories[0].name}</p>
        <h4 className='text-sm md:text-base'>{product.name}</h4>

        {/* {attributes?.length > 0 && (
          <ul className='mt-3'>
            {attributes.map((attr) => (
              <li
                className='text-sm'
                key={attr.name}
              >{`${attr.options[0]} ${attr.name}`}</li>
            ))}
          </ul>
        )} */}
        <div className='flex justify-center mt-5'>
          <div className='flex items-center space-x-3 font-bold group-hover:text-brand-red'>
            <p>See details</p>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className='w-4 h-4 fill-current'
            >
              <rect fill='none' height='24' width='24' />
              <path d='M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z' />
            </svg>
          </div>
        </div>
      </a>
    </Link>
  );
};
