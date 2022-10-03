import Image from 'next/image';
import Link from 'next/link';
import parse from 'html-react-parser';
import { translateColor } from '../../utils/colors';

import { track_load } from '@lib/lf';
import { useCookieConsentState } from '@lib/context/cookieConsent';
const ProductCategories = ({ heading, items, bg }) => {
  const cookieConsentState = useCookieConsentState()
  return (
    <div className={`row ${translateColor(bg)}`}>
      <div className='text-center row-sm contain'>
        <h2 className=''>{heading}</h2>
      </div>
      <div className='grid gap-2 md:grid-cols-2 md:gap-5 lg:grid-cols-3 row-sm contain'>
        {items &&
          items.map(({ node: item }, index) => {
            
            const imageSrc = item?.image?.mediaItemUrl;
            if (index < 6) {
              return (
                <Link key={item + index} href={`/products/${item.slug}`}>
                  <a
                    onClick={() => cookieConsentState?.lf ? track_load(`http://www.leadforensics.com/products/${item.slug}`, `${item.name}`) : ''}
                    className={`group aspect-w-1 aspect-h-1 md:aspect-w-16 md:aspect-h-12 bg-white relative overflow-hidden rounded-sm }`}
                  >
                    {imageSrc && (
                      <Image
                        src={imageSrc}
                        layout='fill'
                        objectFit='cover'
                        className='transition-all group-hover:scale-105'
                        alt={item.name}
                      />
                    )}

                    <span className='absolute top-0 left-0 z-10 w-full h-full bg-black/50' />
                    <div className='z-20 p-3 text-white md:p-5 lg:p-10'>
                      <h3 className='mb-2 '>{item.name}</h3>
                      <div className='text-sm md:text-base'>
                        {item.description && parse(item.description)}
                      </div>
                      <span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          className='absolute w-8 h-8 transition-all fill-current bottom-5 group-hover:right-5 right-10'
                        >
                          <rect fill='none' height='24' width='24' />
                          <path d='M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z' />
                        </svg>
                      </span>
                    </div>
                  </a>
                </Link>
              );
            }
          })}
      </div>
    </div>
  );
};
export default ProductCategories;
