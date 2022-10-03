import Hero from '@common/sections/Hero';
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { getApplications } from '@lib/fetch/getApplications';
import { getEnvironments } from '@lib/fetch/getEnvironments';
import parse from 'html-react-parser';
import { useRouter } from 'next/router';

const Page = ({ applications, environments }) => {
  const router = useRouter();
  const { gas } = router.query;

  return (
    <>
      <NextSeo title='Solutions' />
      <Hero />
      <div className='contain-sm row'>
        <div className='text-center '>
          <h1>Solutions</h1>
          <p></p>
        </div>
        <ul className='grid gap-5 row'>
          {environments.map((item) => (
            <li
              key={item.title}
              className='border p-5 md:p-0 rounded md:border-0 grid gap-10  md:grid-cols-[1fr,150px,2fr]'
            >
              <div className='flex flex-col justify-center order-3 md:order-1'>
                <strong className='flex items-center space-x-5'>
                  <span>Applications</span>
                  <span className='h-[1px] w-full block bg-brand-red' />
                </strong>
                <ul className='mt-2'>
                  {applications.map((x) => {
                    if (x?.applicationFields?.environment) {
                      //(x.applicationFields.environment);
                      if (
                        x?.applicationFields?.environment.some(
                          (e) => e.slug === item.slug
                        )
                      ) {
                        return (
                          <li key={x.slug}>
                            <Link
                              href={`/applications/${x.slug}${
                                gas ? `?gas=${gas}` : ''
                              }`}
                            >
                              <a className='flex items-center space-x-3 group'>
                                <span className='group-hover:underline'>
                                  {x?.title?.includes('Machinery') ||
                                  x?.title?.includes('Cold')
                                    ? x.title.split(' ').splice(0, 2).join(' ')
                                    : x?.title?.includes('Hotels')
                                    ? x.title.split(' ').splice(0, 1).join(' ')
                                    : x.title}
                                </span>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  viewBox='0 0 24 24'
                                  className='w-4 h-4 fill-current text-brand-red'
                                >
                                  <rect fill='none' height='24' width='24' />
                                  <path d='M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z' />
                                </svg>
                              </a>
                            </Link>
                          </li>
                        );
                      }
                    }
                  })}
                </ul>
              </div>
              <figure className='relative order-1 overflow-hidden rounded-full md:order-2 aspect-w-1 aspect-h-1'>
                <Image
                  src={item.featuredImage.node.mediaItemUrl}
                  layout='fill'
                  objectFit='cover'
                  alt={`Image for ${item.title}`}
                />
              </figure>
              <div className='flex flex-col justify-center order-2 md:order-3'>
                <h2 className='text-lg'>{item.title}</h2>
                <p className='text-sm md:text-base'>
                  {item.gqlEnvironmentFields.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default Page;

export const getStaticProps = async () => {
  const applications = await getApplications();
  //('APPLICATIONS =>', applications);
  const environments = await getEnvironments();
  return {
    props: { applications, environments },
  };
};
