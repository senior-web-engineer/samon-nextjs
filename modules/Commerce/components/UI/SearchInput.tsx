import { useContext, useEffect, useState } from 'react';

import Link from 'next/link';
import ProductCategories from '@common/sections/ProductCategories';
import ProductsIndex from '@data/product-search.json';
import SearchContext from '@modules/Commerce/context/SearchContext';
import { motion } from 'framer-motion';
import slug from 'slug';
import { useRouter } from 'next/router';

export default function SearchInput() {
  const router = useRouter();
  const search = useContext(SearchContext);

  return (
    <div className='relative'>
      <button
        className='p-2 rounded bg-black/5 hover:bg-black/10'
        onClick={() => search.toggle()}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          className='w-6 h-6 fill-current'
        >
          <path d='M0 0h24v24H0V0z' fill='none' />
          <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
        </svg>
      </button>
    </div>
  );
}
