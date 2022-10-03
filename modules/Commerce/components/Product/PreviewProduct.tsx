import { AnimatePresence, motion } from 'framer-motion';

import AddToCartButton from '../AddToCardButton';
import Image from 'next/image';
import Link from 'next/link';
import PreviewProductContext from '@modules/Commerce/context/PreviewProductContext';
import ProductDetails from './ProductDetails';
import { useContext } from 'react';

export default function PreviewProduct() {
  const { open, previewItem, togglePreview } = useContext(
    PreviewProductContext
  );
  //('PREVIEW =>', previewItem);

  const slug =
    previewItem &&
    '/products/' +
      previewItem.productCategories.edges
        .map(({ node }) => {
          //('SLUG =>', node);
          return node?.slug ? node.slug : null;
        })
        .join('/') +
      '/' +
      previewItem.slug;
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'tween', ease: 'easeInOut' }}
            key='preview-overlay'
            className='fixed top-0 left-0 z-[99] w-full h-screen bg-black/30 backdrop-blur'
            onClick={() => togglePreview()}
          />
          <motion.aside
            key='product-preview'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'tween', ease: 'easeInOut' }}
            className='fixed z-[100] w-[95%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-[60%] md:p-10 md:py-16 bg-white rounded shadow-xl'
          >
            <button
              onClick={() => togglePreview()}
              className='absolute block p-3 text-white bg-black rounded-full shadow-lg -top-3 -right-3 w-18 h-18'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-8 h-8 fill-current'
                viewBox='0 0 24 24'
              >
                <path d='M0 0h24v24H0V0z' fill='none' />
                <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' />
              </svg>
            </button>
            <section className='grid gap-5 px-5 py-5 md:p-10 md:gap-20 md:grid-cols-2'>
              <figure className='relative aspect-w-16 aspect-h-8 md:aspect-w-1 md:aspect-h-1'>
                {previewItem?.image?.mediaItemUrl && (
                  <Image
                    src={previewItem.image.mediaItemUrl}
                    layout='fill'
                    objectFit='contain'
                    alt={previewItem.name}
                  />
                )}
              </figure>
              <ProductDetails isPreview product={previewItem} />
            </section>
            <div className='pb-10 text-center md:pb-0'>
              <Link href={slug}>
                <a className='flex items-center justify-center space-x-5 text-base font-semibold md:text-xl hover:text-brand-red'>
                  <span>Go to product</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6 fill-current'
                    viewBox='0 0 24 24'
                  >
                    <rect fill='none' height='24' width='24' />
                    <path d='M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z' />
                  </svg>
                </a>
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
