import Hero from '@common/sections/Hero';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { REFERENCE_SINGLE } from '@queries/reference';
import { flattenObject } from '@utils/helpers';
import { useState } from 'react';
import wp from 'lib/wp/wp';

const ReferenceSinglePage = ({ reference }) => {
  return (
    <>
      <NextSeo title={`${reference?.title} - References`} />
      <Hero />
      <div className='grid contain md:grid-cols-[2fr,3fr] gap-20 row'>
        <div className='relative md:h-full'>
          {reference?.featuredImage?.node?.mediaItemUrl && (
            <Gallery reference={reference} />
          )}
        </div>
        <div className='prose'>
          <h1>{reference?.title}</h1>
          <div className='space-y-5'>
            <div>
              <strong className='uppercase'>Application</strong>
              <p className='mt-0 space-x-2'>
                {reference?.referenceFields?.information?.application?.map(
                  (application) => (
                    <span key={application?.title}>{application?.title}</span>
                  )
                )}
                {reference?.referenceFields?.information?.gases?.map((gas) => (
                  <span
                    className='inline-block px-3 rounded bg-brand-gray'
                    key={gas?.title}
                  >
                    {gas?.title}
                  </span>
                ))}
              </p>
            </div>
            <div>
              <strong className='uppercase'>Solution</strong>{' '}
              <p className='mt-0'>
                {reference?.referenceFields?.information?.solution}
              </p>
            </div>
            <div>
              <strong className='uppercase'>Customer value</strong>{' '}
              <p className='mt-0'>
                {reference?.referenceFields?.information?.customervalue}
              </p>
            </div>
            <div>
              <strong className='uppercase'>Location</strong>{' '}
              <p className='mt-0'>
                {reference?.referenceFields?.information?.address?.country}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ReferenceSinglePage;

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.slug;
  const resolved = await Promise.all([
    wp(REFERENCE_SINGLE, { variables: { id } }),
  ]);
  const reference = resolved[0].reference;
  if (!reference) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      reference,
    },
  };
};

const Gallery = ({ reference }) => {
  let imgSrcs =
    reference?.referenceFields?.gallery?.map((item) => item.mediaItemUrl) || [];

  let images =
    imgSrcs.length > 0
      ? [reference.featuredImage.node.mediaItemUrl, ...imgSrcs]
      : [reference.featuredImage.node.mediaItemUrl];
  const [image, setImage] = useState(images[0]);
  return (
    <div>
      <div className='relative aspect-w-1 aspect-h-1'>
        {image && <Image src={image} layout='fill' objectFit='cover' />}
      </div>
      <div className='grid grid-cols-3 gap-2 mt-2 sm:grid-cols-5'>
        {images.length > 1 &&
          images?.map((img) => (
            <button
              onClick={() => setImage(img)}
              className='aspect-w-1 aspect-h-1'
              key={img}
            >
              <Image src={img} layout='fill' objectFit='cover' />
            </button>
          ))}
      </div>
    </div>
  );
};
