import Content from '@modules/Blocks/Content';
import Hero from '@common/sections/Hero';
import Image from 'next/image';
import Intro from '@common/sections/Intro';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import getPage from '@lib/page/getPage';
export const getStaticProps = async (context) => {
  const page = await getPage('service');
  return { props: { page } };
};
const services = [
  {
    heading: 'Service and maintenance',
    text: 'Senes supermarket, industry, marine, hotels/offices, ice rinks, dairy, butchers, garage and many more',
    href: '/service/maintenance',
    image: '/images/samon-placeholder.jpg',
  },
  {
    heading: 'Special Solutions',
    text: 'Senes supermarket, industry, marine, hotels/offices, ice rinks, dairy, butchers, garage and many more',
    href: '/service/special-solutions',
    image: '/images/samon-placeholder.jpg',
  },
  {
    heading: 'Spare parts',
    text: 'Senes supermarket, industry, marine, hotels/offices, ice rinks, dairy, butchers, garage and many more',
    href: '/service/spare-parts',
    image: '/images/samon-placeholder.jpg',
  },
  {
    heading: 'Trainings',
    text: 'Senes supermarket, industry, marine, hotels/offices, ice rinks, dairy, butchers, garage and many more',
    href: '/service/trainings',
    image: '/images/samon-placeholder.jpg',
  },
];
const Page = ({ page }) => {
  const acf = page.gqlPageFields;
  return (
    <>
      <NextSeo title={page?.seo?.title} description={page?.seo?.metaDesc} />
      <Hero />
      <Intro heading={page.title} body={acf.intro} />
      <Content sections={acf.layout} />
      {/* <ul className='grid gap-5 pt-0 md:grid-cols-2 xl:grid-cols-4 contain row'>
        {services.map((service) => (
          <li key={service.href} className=''>
            <Link href={service.href}>
              <a className='relative block text-white bg-black aspect-w-1 aspect-h-1'>
                <Image
                  src={service.image}
                  layout='fill'
                  objectFit='cover'
                  alt={service.heading}
                  className='opacity-50'
                />
                <div className='absolute top-0 left-0 p-5'>
                  <h2 className='mb-3 text-lg'>{service.heading}</h2>
                  <p className='text-sm'>{service.text}</p>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    className='absolute w-8 h-8 fill-current bottom-5 right-5'
                  >
                    <rect fill='none' height='24' width='24' />
                    <path d='M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z' />
                  </svg>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul> */}
    </>
  );
};
export default Page;
