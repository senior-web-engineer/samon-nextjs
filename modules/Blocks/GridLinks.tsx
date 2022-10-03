import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCookieConsentState } from '@lib/context/cookieConsent';
import { track_load } from '@lib/lf';
interface GridLinksProps {
  data: any;
}

const GridLinks = ({ data }: GridLinksProps) => {
  const router = useRouter();
  const cookieConsentState = useCookieConsentState()
  return (
    <>
      <ul
        id='grid-links'
        data-items={data.links.length}
        className='grid gap-5 pt-0 row'
      >
        {data?.links?.map((link) => {
          const acf = link.gqlPageFields;
          return (
            <li key={link.id} className=''>
              <Link href={`${router.asPath}/${link.slug}`}>
                <a  onClick={() => cookieConsentState?.lf ? track_load(`http://www.leadforensics.com${router.asPath}/${link.slug}`, `${link.title}`) : ''} className='relative block text-white bg-black aspect-w-1 aspect-h-1'>
                  <Image
                    src={
                      acf?.featuredImage?.mediaItemUrl ||
                      acf?.featuredImage?.node?.mediaItemUrl ||
                      '/images/samon-placeholder.jpg'
                    }
                    layout='fill'
                    objectFit='cover'
                    alt={link.title}
                    className='opacity-50'
                  />

                  <div className='absolute top-0 left-0 p-5'>
                    <h2 className='mb-3 text-lg'>{link.title}</h2>
                    <p className='text-sm'>{acf.intro}</p>
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
          );
        })}
      </ul>
    </>
  );
};

export default GridLinks;
