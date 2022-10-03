import Image from 'next/image';
import Link from 'next/link';
import slug from 'slug';
import useSoldBy from 'store/storeSoldBy';
import { useCookieConsentState } from '@lib/context/cookieConsent';
import { track_load } from '@lib/lf';
export default function MostPopular({
  title = 'Most popular products',
  products = [],
}) {
  const soldByFilter = useSoldBy((state: any) => state.soldByFilter);
  return (
    <div className='pb-0 contain row-sm'>
      <div className='pt-10 row-sm'>
        <h2>{`${title.replace('-', ' ')}`}</h2>
      </div>
      <div
        className={`grid gap-5 ${
          products.length < 3
            ? 'md:grid-cols-2'
            : 'md:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {products
          ?.filter((p) => {
            if (!soldByFilter) {
              return true;
            }
            if (soldByFilter === 'samon' && p.price) {
              return true;
            }
            if (
              soldByFilter === 'distributor' &&
              p?.productFields?.information?.distributors?.length > 0
            ) {
              return true;
            }
            return false;
          })
          .map(
            (product: any, index) =>
              index < 3 && <ProductCard key={product.id} product={product} />
          )}
      </div>
    </div>
  );
}

const ProductCard = ({ product }) => {
  if (!product.href) {
    return null;
  }
  const cookieConsentState = useCookieConsentState()
  return (
    <Link href={product.href}>
      <a onClick={() => cookieConsentState?.lf ? track_load(`http://www.leadforensics.com${product.href}`, `${product.categories[0].name} - ${product.name}`) : ''} className='block p-5 bg-white rounded shadow-lg group hover:ring-2 ring-brand-red'>
        <div className='grid grid-cols-[1fr,1fr] gap-5'>
          <div className='flex flex-col justify-between'>
            <div className='mb-10'>
              {product?.categories?.length > 0 && (
                <strong>{product.categories[0].name}</strong>
              )}
              <h3>{product.name}</h3>

              {/* {attributes?.length > 0 && (
                <ul className='mt-3'>
                  {attributes.map((attr) => (
                    <li
                      className='text-sm'
                      key={attr.name}
                    >{`${attr.options[0].toUpperCase()} ${attr.name}`}</li>
                  ))}
                </ul>
              )} */}
              <p>{product?.description}</p>
            </div>
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
          <div className='relative aspect-w-1 aspect-h-1'>
            {' '}
            {product?.image?.mediaItemUrl && (
              <Image
                src={product.image.mediaItemUrl}
                alt={`${product.name} - Samon`}
                layout='fill'
                objectFit='contain'
              />
            )}
          </div>
        </div>
      </a>
    </Link>
  );
};
