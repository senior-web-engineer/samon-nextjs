import { useContext, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import SearchContext from '@modules/Commerce/context/SearchContext';
import { match } from 'node:assert';
import { motion } from 'framer-motion';
import productsData from '@data/product-search.json';
import { useRouter } from 'next/router';
import { track_load } from '@lib/lf';
import { useCookieConsentState } from '@lib/context/cookieConsent';

interface SearchProps {}

const Search = ({}: SearchProps) => {
  const search = useContext(SearchContext);
  const products: any = productsData;
  const router = useRouter();
  useEffect(() => {
    if (search.open) {
      search.toggle();
    }
  }, [router.asPath]);
  const matchingProducts = products.map((p, i) => {
    let matchscore = 0;
    if (p?.name?.toLowerCase().includes(search.value.toLowerCase())) {
      matchscore += 4;
    }
    if (
      p.productTags.edges.length > 0 &&
      p.productTags.edges.some(({ node }) => node.slug === 'most-popular')
    ) {
      matchscore++;
    }
    if (!search.value) {
      return {
        ...p,
        relevance: matchscore,
      };
    }

    const searchArray = search.value.toLowerCase().split(' ');
    for (let str of searchArray) {
      if (p.name.toLowerCase().includes(str)) {
        matchscore++;
      }
      p.productCategories.edges.some(({ node }) => {
        if (node.name.toLowerCase().includes(str)) {
          matchscore++;
        }
      });
    }
    const searchArrayTwo = search.value.toLowerCase().split('-');
    for (let str of searchArrayTwo) {
      if (p.name.toLowerCase().includes(str)) {
        matchscore++;
      }
      p.productCategories.edges.some(({ node }) => {
        if (node.name.toLowerCase().includes(str)) {
          matchscore++;
        }
      });
    }

    return {
      ...p,
      relevance: matchscore,
    };
  });
  useEffect(() => {
    if (search.open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [search.open]);
  //('PRODUCTS =>', products);
  const cookieConsentState = useCookieConsentState()
  return (
    <>
      {search.open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='top-0 left-0 w-screen h-screen z-[99] bg-black/60 fixed'
            onClick={() => search.toggle()}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='fixed top-10 md:top-20 left-1/2 -translate-x-1/2   bg-white rounded-lg z-[100] w-full max-w-[90%] md:max-w-2xl'
          >
            <button
              onClick={() => search.toggle()}
              className='absolute p-2 text-white bg-black rounded-full -top-4 -right-4 z-[101]'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5 fill-current'
                viewBox='0 0 24 24'
              >
                <path d='M0 0h24v24H0V0z' fill='none' />
                <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' />
              </svg>
            </button>
            <div className='p-5 pb-5 md:p-10'>
              <h3>Search</h3>
              <p>Search for products on Samon</p>
              <input
                autoFocus
                value={search.value}
                onChange={(ev) => search.update(ev.target.value)}
                className='w-full px-4 py-3 mt-5 border rounded bg-brand-gray'
                placeholder='Start typing'
              />
            </div>
            <div className='p-5 pt-0 md:px-10 md:pb-10'>
              <ul className='space-y-3 text-sm md:text-base'>
                {matchingProducts
                  .sort((a, b) => {
                    if (a.relevance < b.relevance) {
                      return 1;
                    } else {
                      return -1;
                    }
                  })
                  .map((p, i) => {
                    if (i < 5) {
                      return (
                        <li>
                          <Link href={p.href}>
                            <a onClick={() => cookieConsentState?.lf ? track_load(`http://www.leadforensics.com${p.href}`, `search image`) : ''} className='flex items-center space-x-3'>
                              <figure className='relative block w-8 h-8 md:w-12 md:h-12 bg-brand-gray'>
                                {p?.image?.mediaItemUrl && (
                                  <Image
                                    src={p.image.mediaItemUrl}
                                    layout='fill'
                                    objectFit='cover'
                                    alt='search image'
                                  />
                                )}
                              </figure>

                              <div className='flex flex-col justify-center leading-tight'>
                                <p className='space-x-5 font-medium'>
                                  <span>{p.name}</span>
                                  <span>
                                    {p.productTags.edges
                                      .filter(
                                        ({ node }) =>
                                          node.slug === 'most-popular'
                                      )
                                      .map(({ node }) => (
                                        <span
                                          className='px-2 py-1 text-xs text-white rounded-full bg-brand-red'
                                          key={node.name}
                                        >
                                          {node.name === 'Most popular'
                                            ? 'Popular'
                                            : node.name}
                                        </span>
                                      ))}
                                  </span>
                                </p>
                                <small className='space-x-1 opacity-60'>
                                  {p.categories.map(({ node: cat }, index) => {
                                    return (
                                      <>
                                        <span>{cat.name}</span>
                                        <span className='opacity-50 last:hidden'>
                                          /
                                        </span>
                                      </>
                                    );
                                  })}
                                </small>
                              </div>
                            </a>
                          </Link>
                        </li>
                      );
                    }
                  })}
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Search;
