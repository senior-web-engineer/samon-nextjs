import { DISTRIBUTOR_SINGLE } from '@queries/distributors';
import Hero from '@common/sections/Hero';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { REFERENCE_SINGLE } from '@queries/reference';
import { flattenObject } from '@utils/helpers';
import wp from 'lib/wp/wp';

const DistributorSinglePage = ({ distributor }) => {
  const ob = flattenObject(distributor);

  return (
    <>
      <NextSeo title={`${ob.title} - Distributors`} />
      <Hero />
      <div className='grid contain grid-cols-[2fr,3fr] gap-20 row'>
        <div className='relative '>
          {ob['featuredImage.node.mediaItemUrl'] && (
            <Image
              src={ob['featuredImage.node.mediaItemUrl']}
              layout='fill'
              objectFit='contain'
              alt={ob.title}
            />
          )}
        </div>
        <div className=''>
          <h1 className='mb-10'>{ob.title}</h1>
          <div className='space-y-5'>
            {ob['distributorFields.information.application'] && (
              <div>
                <strong className='uppercase'>Contact</strong>
                <div>
                  <p>{ob['distributorFields.information.website']}</p>
                  <p>{ob['distributorFields.information.phone']}</p>
                  <p>{ob['distributorFields.information.email']}</p>
                </div>
              </div>
            )}
            {ob['distributorFields.information.address.streetAddress'] && (
              <div>
                <strong className='uppercase'>Location</strong>
                <div>
                  {ob['distributorFields.information.address.streetAddress']}
                </div>
              </div>
            )}
            {ob['distributorFields.information.yearinoperation'] && (
              <div>
                <strong className='uppercase'>Year in operation</strong>
                <div>
                  {new Date().getFullYear() -
                    ob['distributorFields.information.yearinoperation']}
                </div>
              </div>
            )}

            {ob['distributorFields.information.address'] && (
              <div>
                <strong className='uppercase'>Location</strong>
                <div>{ob['distributorFields.information.address.country']}</div>
              </div>
            )}
            {ob['distributorFields.information.yearInOperation'] && (
              <div>
                <strong className='uppercase'>Year in operation</strong>
                <div>{ob['distributorFields.information.yearInOperation']}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default DistributorSinglePage;

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.slug;
  const resolved = await Promise.all([
    wp(DISTRIBUTOR_SINGLE, { variables: { id } }),
  ]);

  const distributor = resolved[0].distributor;

  return {
    props: {
      distributor,
    },
  };
};
