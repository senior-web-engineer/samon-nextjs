import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function CategorySection({
  title = 'Categories',
  categories = [],
  parent = '',
  noGradient = false,
}) {
  const [screenCount, setScreenCount] = useState(6);
  const increment = 6;
  if (!categories.length) {
    return null;
  }
  return (
    <div className=''>
      <div className='contain'>
        {/* <div className='pb-0 row-sm'>
          <h2>{title.replace('-', ' ')}</h2>
        </div> */}
        <div className='grid grid-cols-2 gap-3 md:gap-5 md:grid-cols-3 row-sm'>
          {categories.map(
            (category, index) =>
              index < screenCount && (
                <CategoryCard
                  parent={parent}
                  key={category.slug + index}
                  category={category}
                />
              )
          )}
        </div>
      </div>
      {screenCount < categories.length && (
        <div
          style={{
            background: noGradient
              ? 'white'
              : 'linear-gradient(180deg, rgba(255,255,255,1) 50%, rgba(240,240,240,1) 50%)',
          }}
          className='text-center '
        >
          <button
            onClick={() => setScreenCount((prev) => prev + increment)}
            className='px-4 py-2 font-semibold text-white rounded-full bg-brand-red'
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
}
const CategoryCard = ({ category, parent }) => {
  const slug = `/products/${
    parent ? `${parent}/${category.slug}` : category.slug
  }`;
  return (
    <Link scroll={true} href={slug}>
      <a className='px-3 py-4 md:px-5 group hover:ring-2 transition-all ring-brand-red rounded md:py-6 bg-brand-gray grid lg:grid-cols-[1fr,100px] gap-3 '>
        <div className='flex flex-col justify-between'>
          <div>
            <h3 className='mb-3 text-base'>{category.name}</h3>
            <p className='hidden text-sm md:block text-black/80'>
              {category.description}
            </p>
          </div>
          <div className='mt-2 md:mt-5'>
            <div className='flex items-center space-x-3 text-xs font-bold group-hover:text-brand-red'>
              <p>Explore</p>
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
        </div>

        <div className='relative hidden lg:block'>
          {category?.image?.mediaItemUrl && (
            <Image
              src={category.image.mediaItemUrl}
              layout='fill'
              objectFit='contain'
              alt={`${category.name}`}
            />
          )}
        </div>
      </a>
    </Link>
  );
};
