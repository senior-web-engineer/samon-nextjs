import { Fragment, useContext } from 'react';

import AddToCartButton from '../AddToCardButton';
import AddToWishlist from '@modules/Wishlist/components/AddToWishlist';
import Link from 'next/link';
import { Listbox } from '@headlessui/react';
import { LocationContext } from '@modules/Location/LocationContext';
import Price from './Price';
import { WishlistContext } from '@modules/Wishlist/context/WishlistContext';
import slug from 'slug';
import uniq from 'lodash.uniq';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface IProductDetails {
  product: any;
  hasCompatibleProducts?: any;
  isPreview?: boolean;
}
export default function ProductDetails({
  product,
  hasCompatibleProducts,
  isPreview,
}: IProductDetails) {
  const router = useRouter();
  const location = useContext(LocationContext);
  const wishlist = useContext(WishlistContext);
  const [maxVisibleDistributors, setMaxVisibleDistributors] = useState(2);
  const [selectedCountry, setSelectedCountry] = useState(
    location.country || ''
  );

  const hasDistributor = product?.productFields?.information?.distributors;

  const availableCountries = uniq(
    product?.productFields?.information?.distributors?.map(
      (dis) => dis?.distributorFields?.information?.address?.country
    )
  );

  return (
    <div className='flex flex-col justify-center text-xl'>
      <h1 className='text-2xl md:text-4xl'>{product.name}</h1>
      <small>
        SKU: {product.sku}
        {!router.asPath.includes('spare-parts') && (
          <>
            {' - '}
            <Link href={`/service/spare-parts?modelNum=${product.sku}`}>
              <a className='underline'>Find spareparts</a>
            </Link>
          </>
        )}
      </small>
      {product?.productFields?.documents?.length > 0 && (
        <ul className='mt-5'>
          {product?.productFields?.documents?.map((doc) =>
            doc?.file?.mediaItemUrl ? (
              <li key={doc?.name}>
                <a
                  target='_blank'
                  rel='noreferrer'
                  href={doc?.file?.mediaItemUrl || '#'}
                  className='flex items-center cursor-pointer group'
                >
                  <figure className='mr-3'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      className='w-4 h-4 fill-current text-black/60'
                    >
                      <path d='M0 0h24v24H0V0z' fill='none' />
                      <path d='M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z' />
                    </svg>
                  </figure>
                  <span className=' group-hover:underline'>{doc?.name}</span>
                  <span className='px-1 ml-3 text-sm font-semibold uppercase rounded text-black/60 bg-black/10'>
                    {doc?.file?.mimeType?.split('/')[1]}
                  </span>
                </a>
              </li>
            ) : null
          )}
        </ul>
      )}
      <ul className='mt-3 md:mt-10'>
        {product?.attributes?.edges?.map(({ node: attr }) => {
          if (
            attr?.label.toLowerCase() !== 'model numbers' &&
            attr?.label.toLowerCase() !== 'compatible with' &&
            attr?.label.toLowerCase() !== 'accessories'
          ) {
            return (
              <li
                className='text-xs py-[5px] md:py-2 max-w-[400px] border-b last:border-b-0'
                key={attr?.label}
              >
                {attr?.options?.map((option) => (
                  <span
                    className='flex items-center justify-between '
                    key={option}
                  >
                    <strong className='uppercase'>{attr?.label}:</strong>
                    <span className='font-semibold uppercase'>{option}</span>
                  </span>
                ))}
              </li>
            );
          } else {
            return null;
          }
        })}
      </ul>
      {product.price && (
        <p className='mt-5 text-2xl md:mt-10'>
          <strong>
            <Price price={product.price} />
          </strong>
        </p>
      )}
      {product.price && (
        <div className='grid gap-2 md:gap-5 mt-2 md:mt-5 md:grid-cols-[1fr,1fr]'>
          <AddToCartButton
            large
            item={{
              databaseId: product.databaseId,
              name: product.name,
              quantity: 1,
              price: product.price,
              image: product?.image?.mediaItemUrl,
              href: product.href,
            }}
          />
          <AddToWishlist item={[{ ...product, quantity: 1 }]} />
        </div>
      )}

      {!isPreview && hasDistributor && (
        <div className='mt-2 text-base rounded md:mt-5 '>
          <div className='grid md:grid-cols-[2fr,1fr] gap-5'>
            <div className='flex items-center'>
              <strong className='block w-full'>
                This product is{product.price ? ' also ' : ' '}sold through a
                distributor:
              </strong>
            </div>
            <div>
              <select
                onChange={(e) => setSelectedCountry(e.target.value)}
                name='country'
                className='w-full text-sm'
                defaultValue={selectedCountry}
              >
                <option value={selectedCountry ? selectedCountry : ''}>
                  {selectedCountry
                    ? selectedCountry
                    : 'Select your prefered country'}
                </option>
                {availableCountries
                  .filter((country) =>
                    selectedCountry ? selectedCountry !== country : true
                  )
                  .map((country) => (
                    <option key={country}>{country}</option>
                  ))}
              </select>
            </div>
          </div>

          <ul className='mt-3 space-y-2'>
            {hasDistributor
              .sort((a, b) => {
                return a?.distributorFields?.information?.address?.country.toLowerCase() ===
                  selectedCountry.toLowerCase()
                  ? -1
                  : 1;
              })
              .map((distributor, index) => {
                const numDistributors = hasDistributor.length;
                if (index < maxVisibleDistributors) {
                  return (
                    <Fragment key={distributor.id}>
                      <li className='flex items-center justify-between p-3 pr-5 rounded bg-brand-gray lea'>
                        <div className='space-x-3'>
                          <span className='font-semibold'>
                            {
                              distributor?.distributorFields?.information
                                ?.address?.country
                            }
                            <small className='block font-normal'>
                              {distributor.title}
                            </small>
                          </span>
                        </div>
                        <div>
                          {distributor?.distributorFields?.information
                            ?.website && (
                            <a
                              target='_blank'
                              rel='noreferrer'
                              className='font-semibold text-brand-red'
                              href={
                                distributor.distributorFields.information
                                  .website
                              }
                            >
                              Visit
                            </a>
                          )}
                        </div>
                      </li>
                      {index + 1 === maxVisibleDistributors && (
                        <li className='flex justify-center'>
                          <button
                            onClick={() =>
                              setMaxVisibleDistributors((prev) => prev + 2)
                            }
                            className='btn'
                          >
                            Show more
                          </button>
                        </li>
                      )}
                    </Fragment>
                  );
                }
              })}
          </ul>
        </div>
      )}
      {hasCompatibleProducts && (
        <div className='mt-5 md:mt-10'>
          <p className='p-4 mb-5 text-lg leading-tight border rounded border-brand-darkgray'>
            <strong className='block mb-2'>Please note:</strong>
            <span>
              This product is not functional without a{' '}
              <a
                href='#'
                onClick={(e) => {
                  let compatible = document.getElementById(
                    'compatible-products'
                  );
                  e.preventDefault();
                  compatible &&
                    compatible.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                }}
                className='inline-block underline'
              >
                connected device
              </a>
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
