import { APPLICATIONS_SLUGS, APPLICATION_SINGLE } from '@queries/applications';
import { useContext, useEffect, useState } from 'react';

import AddToWishlist from '@modules/Wishlist/components/AddToWishlist';
import CartContext from '@modules/Commerce/context/CartContext';
import CouldntFindASolutionForm from '@modules/Applications/components/forms/CouldntFindASolutionForm';
import { IItem } from '@modules/Commerce/context/CartContext';
import Image from 'next/image';
import Intro from '@common/sections/Intro';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { flattenObject } from '@utils/helpers';
import getDetectorGases from '@lib/commerce/products/getDetectorGases';
import { getGases } from '@lib/fetch/getGases';
import { getReferencesByApplication } from '@queries/reference';
import { getSolutions } from '@lib/fetch/getSolutions';
import parse from 'html-react-parser';
import retrievePaths from '@lib/utils/retrievePaths';
import uniq from 'lodash.uniq';
import { useRouter } from 'next/router';
import wp from '@lib/wp/wp';

const ApplicationPage = ({
  application,
  references,
  solutions,
  gases,
  detectorGases,
}) => {
  const router = useRouter();
  const query = JSON.stringify(router.query);
  const { gas } = JSON.parse(query);
  const { addToCart } = useContext(CartContext);
  const ob = flattenObject(application);

  const [isLarge, setIsLarge] = useState(false);
  const [gasInput, setGasInput] = useState('');

  const [gasSelection, setGasSelection] = useState('');
  const [systemSelection, setSystemSelection] = useState('');
  const [solutionAdded, setSolutionAdded] = useState(false);
  const needsCustomizedSolution = detectorGases.find(
    (gas) =>
      gasSelection.toLowerCase() === gas.name.toLowerCase() ||
      gasSelection.toLowerCase() === gas.slug.toLowerCase() ||
      gasSelection.toLowerCase() !== 'hfc' ||
      gasSelection.toLowerCase() !== 'hfco'
  )
    ? false
    : true;
  const systems = uniq(
    solutions?.map((s) => {
      const system = s.solutionFields.settings.system;
      return system;
    })
  );
  useEffect(() => {
    if (gas) {
      setGasInput(gas);
      setGasSelection(gas);
    }
  }, [gas]);
  const matchingSolution = solutions?.filter((s) => {
    let matchScore = 0;
    const appMatch = s.solutionFields.settings.application.find(
      (app) => app.slug === application.slug
    );

    if (appMatch) {
      const systemMatch =
        s.solutionFields.settings.system.toUpperCase() ===
        systemSelection.toUpperCase();
      const gasMatch = s.solutionFields.settings.gas.find((gas) => {
        if (gas.title.toUpperCase() === gasSelection.toUpperCase()) {
          return true;
        }
      });
      if (appMatch) {
        matchScore++;
      }
      if (systemMatch) {
        matchScore++;
      }
      if (gasMatch) {
        matchScore++;
      }

      if (matchScore >= 3) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  });

  useEffect(() => {
    const match = gases.find(
      (g) => g.title.toUpperCase() === gasInput.toUpperCase()
    );
    if (match) {
      setGasSelection(gasInput);
    } else {
      setGasSelection('');
    }
  }, [gasInput, gases]);

  return (
    <>
      <NextSeo title={`Application: ${application.title} - Solutions`} />
      <div
        className={`transition-all  relative ${
          isLarge ? 'h-screen z-[9999]' : 'h-56 lg:h-96'
        }`}
      >
        <figure
          className={`h-full overflow-hidden ${
            isLarge ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <iframe
            className={`w-full hidden lg:block h-screen`}
            src={ob['applicationFields.gqlenvironment']}
          ></iframe>

          <iframe
            className={`w-full  lg:hidden h-screen ${
              isLarge ? 'block' : 'hidden'
            }`}
            src={ob['applicationFields.gqlenvironment']}
          ></iframe>

          <div className='block w-full h-full lg:hidden'>
            <Image
              src={
                ob['featuredImage.node.mediaItemUrl']
                  ? ob['featuredImage.node.mediaItemUrl']
                  : '/images/placeholder.png'
              }
              layout='fill'
              objectFit='cover'
              alt={'Samon Hero'}
            />
          </div>
        </figure>
        <button
          onClick={() => setIsLarge(!isLarge)}
          className={`block absolute text-xs md:text-sm lg:text-base -translate-x-1/2 translate-y-1/2 btn left-1/2 ${
            isLarge ? 'bottom-10' : 'bottom-0'
          }`}
        >
          {isLarge ? 'Close' : 'Open'} environment
        </button>
      </div>
      <Intro heading={ob['title']} body={ob['applicationFields.intro']} />
      <div className='grid gap-10 lg:grid-cols-2 contain row-sm'>
        <figure className='relative hidden lg:block aspect-w-16 aspect-h-10'>
          <Image
            src={
              ob['featuredImage.node.mediaItemUrl']
                ? ob['featuredImage.node.mediaItemUrl']
                : '/images/placeholder.png'
            }
            layout='fill'
            objectFit='cover'
            alt={'Samon Hero'}
          />
        </figure>
        <div className='flex flex-col justify-center prose'>
          <h2>{ob['applicationFields.description.title']}</h2>
          {ob['applicationFields.description.text'] &&
            parse(ob['applicationFields.description.text'])}
          {application?.applicationFields?.description?.gases && (
            <div className='flex flex-wrap items-center space-x-3'>
              {application?.applicationFields?.description?.gases.map((gas) => {
                const active = `bg-brand-red text-white`;
                const standard = `bg-brand-gray text-black`;
                return (
                  <button
                    className={`block hover:bg-brand-red/50 hover:text-white text-sm w-12 h-12 md:w-16 md:h-16 md:text-base font-bold ${
                      router.query.gas === gas.title ? active : standard
                    }`}
                    key={gas.slug}
                    onClick={() =>
                      router.push(
                        `/applications/${router.query.aid}?gas=${gas.title}`
                      )
                    }
                  >
                    {gas.title}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className='grid gap-10 lg:grid-cols-2 contain row-sm'>
        <div className='prose'>
          <h2>{ob['applicationFields.applicableLawsAndRegulations.title']}</h2>
          {ob['applicationFields.applicableLawsAndRegulations.text'] &&
            parse(ob['applicationFields.applicableLawsAndRegulations.text'])}
        </div>
        <div className='prose'>
          <h2>{ob['applicationFields.serviceAndMaintenance.title']}</h2>
          {ob['applicationFields.serviceAndMaintenance.text'] &&
            parse(ob['applicationFields.serviceAndMaintenance.text'])}
        </div>
      </div>
      {application?.applicationFields?.references &&
        application.applicationFields.references.length > 0 && (
          <div className='contain row'>
            <div className='text-center row-sm'>
              <h2>References</h2>
            </div>
            <div className='grid gap-10 lg:grid-cols-3 row-sm'>
              {application?.applicationFields?.references?.map(
                (item, index) => {
                  if (index < 3) {
                    return (
                      <div className='prose' key={item.id}>
                        <figure className='relative aspect-w-16 aspect-h-10'>
                          <Image
                            src={item.featuredImage.node.mediaItemUrl}
                            layout='fill'
                            objectFit='cover'
                            alt={`Reference - ${item.title}`}
                          />
                        </figure>
                        <h3>{item.title}</h3>
                        <strong>Customer value</strong>
                        <div className='mb-5 line-clamp-2'>
                          {item?.referenceFields?.information?.customervalue &&
                            parse(
                              item.referenceFields.information.customervalue
                            )}
                        </div>
                        <Link href={'/references/' + item.slug}>
                          <a className='btn'>Read more</a>
                        </Link>
                      </div>
                    );
                  }
                }
              )}
            </div>
          </div>
        )}
      {application?.applicationFields?.hideRecommendedSolutions ? null : (
        <>
          <div className='bg-brand-gray'>
            <form
              id='recommended-solution'
              className='grid gap-10 contain row lg:grid-cols-2'
            >
              <div>
                <h3 className='mb-10 lg:text-3xl'>
                  What do you want to detect?
                </h3>
                <input
                  onChange={(e) => setGasInput(e.target.value)}
                  className='w-full !h-11 p-0 !normal-case bg-transparent border-b-2 border-black'
                  placeholder='Choose a gas'
                  value={gasInput}
                  type='text'
                  list='gases'
                />
                <datalist id='gases' className='uppercase'>
                  {gases.map((gas) => {
                    return <option key={gas.title} value={gas.title} />;
                  })}
                </datalist>
              </div>
              <div>
                <h3 className='mb-10 lg:text-3xl'>
                  Single or multipoint system?
                </h3>
                <select
                  onChange={(e) => setSystemSelection(e.target.value)}
                  className='w-full bg-transparent h-11'
                >
                  <option value=''>Choose a system</option>
                  {systems.map((item) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
            </form>
            <div className='pt-0 text-center row'>
              {matchingSolution.length > 0 ? (
                <div>
                  <button
                    onClick={(e) => {
                      let solution = document.getElementById('solution');
                      e.preventDefault();
                      solution &&
                        solution.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        });
                    }}
                    className='btn'
                  >
                    View solution
                  </button>
                </div>
              ) : gasSelection && systemSelection ? (
                <div className=' contain'>
                  <CouldntFindASolutionForm
                    gas={gasSelection}
                    system={systemSelection}
                  />
                </div>
              ) : (
                <p className='w-[90%] mx-auto'>
                  Can&apos;t find the gas or system you&apos;re looking for?
                  Please{' '}
                  <a
                    href='#'
                    onClick={(e) => {
                      let cta = document.getElementById('footer-cta');
                      e.preventDefault();
                      cta &&
                        cta.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        });
                    }}
                    className='underline'
                  >
                    contact us
                  </a>{' '}
                  and we&apos;ll find a solution for you.
                </p>
              )}
            </div>
          </div>

          {matchingSolution?.length > 0 && (
            <div className='pb-0 row contain'>
              <div id='solution' className='text-center'>
                <h2>Recommended solution</h2>
                {matchingSolution.length > 0 ? (
                  <p className='mt-5'>{`This is our recommended solution for detecting ${gasSelection} with a ${systemSelection}`}</p>
                ) : (
                  <p className='mt-5 '>
                    Choose a gas and system above to find recommended solutions.
                  </p>
                )}
                {matchingSolution?.length > 0 &&
                  matchingSolution.map((solution) => {
                    return (
                      <div
                        key={solution.title}
                        className='grid gap-10 text-left lg:grid-cols-2 row'
                      >
                        <div
                          className='order-1 lg:order-0'
                          key={solution.title}
                        >
                          <ul className='even:bg-black/10'>
                            <li className='grid grid-cols-[1fr,2fr,1fr] text-xs font-bold text-white uppercase bg-black lg:grid-cols-4 lg:text-base'>
                              <p className='px-2 py-2 lg:px-4 lg:py-3'>Color</p>
                              <p className='hidden px-2 py-2 lg:px-4 lg:py-3 lg:block'>
                                Article nr
                              </p>
                              <p className='px-2 py-2 lg:px-4 lg:py-3'>
                                Product
                              </p>
                              <p className='px-2 py-2 text-right lg:px-4 lg:py-3'>
                                Quantity
                              </p>
                            </li>

                            {solution?.solutionFields?.recommendedProducts?.products?.map(
                              ({ product, quantity }) => {
                                return (
                                  <li
                                    className='grid grid-cols-[1fr,2fr,1fr] text-xs font-bold uppercase lg:text-base lg:grid-cols-4 '
                                    key={product?.name}
                                  >
                                    <span className='flex items-center px-2 py-2 lg:px-4 lg:py-3'>
                                      <figure className='w-5 h-5 border-2 border-white rounded-full shadow bg-brand-red' />
                                    </span>
                                    <span className='items-center hidden px-2 py-2 lg:flex lg:px-4 lg:py-3'>
                                      <p>{product?.sku}</p>
                                    </span>
                                    <span className='block px-2 py-2 lg:hidden lg:px-4 lg:py-3'>
                                      <span className='font-normal lg:px-4 lg:py-3'>
                                        <p className='font-bold'>
                                          {product?.name}
                                        </p>
                                        <span>
                                          {product?.productCategories?.edges?.map(
                                            ({ node: cat }) => (
                                              <span key={cat.name}>
                                                {cat.name}
                                              </span>
                                            )
                                          )}
                                        </span>
                                        <p>{product?.sku}</p>
                                      </span>
                                    </span>
                                    <span className='hidden leading-tight lg:block lg:px-4 lg:py-3'>
                                      <p>{product?.name}</p>
                                      <span className='text-sm font-normal'>
                                        {product?.productCategories?.edges?.map(
                                          ({ node: cat }) => (
                                            <span key={cat.name}>
                                              {cat.name}
                                            </span>
                                          )
                                        )}
                                      </span>
                                    </span>
                                    <span className='flex items-center justify-end px-2 py-2 text-right lg:px-4 lg:py-3'>
                                      {quantity}
                                    </span>
                                  </li>
                                );
                              }
                            )}
                          </ul>
                          <div className='grid mt-5 lg:grid-cols-2'>
                            <div className='flex flex-col items-start text-sm'>
                              {/* <Link href='/productlist'>
                                <a className='inline-block font-bold underline hover:text-brand-red'>
                                  Email yourself the list
                                </a>
                              </Link> */}
                            </div>
                            <div className='flex justify-center mt-5 lg:mt-0 lg:justify-end'>
                              <AddToWishlist item={solution.products} />
                            </div>
                          </div>
                        </div>
                        <div className='relative order-0 lg:order-1 aspect-w-16 aspect-h-12'>
                          {solution?.featuredImage?.node?.mediaItemUrl && (
                            <Image
                              src={solution.featuredImage.node.mediaItemUrl}
                              layout='fill'
                              objectFit='contain'
                              alt={`Solution - ${solution.title}`}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </>
      )}
      <div className='py-20 bg-white section'>
        <div className='grid gap-10 md:grid-cols-[200px,2fr] max-w-[900px] mx-auto'>
          <figure className='relative aspect-w-1 aspect-h-1'>
            <Image
              src='/images/samon-detectors.png'
              layout='fill'
              objectFit='contain'
              alt='Samon detector'
            />
          </figure>
          <div className='flex items-center justify-start'>
            {!gasSelection ? (
              <div className='p-10 '>
                <h2 className='mb-5'>Browse our gas detectors</h2>
                <Link href={`/products/detectors`}>
                  <a className='btn'>Browse now</a>
                </Link>
              </div>
            ) : needsCustomizedSolution ? (
              <div className='p-10 '>
                <h2 className='mb-5'>Customized {gasSelection} detector</h2>
                <Link href='/service/special-solutions/customized-gas-detectors'>
                  <a className='btn'>Read more</a>
                </Link>
              </div>
            ) : (
              <div className='p-10 '>
                <h2 className='mb-5'>Browse our {gasSelection} detectors</h2>
                <Link
                  href={`/products/detectors/${
                    gasSelection.toLowerCase() === 'hfo' ||
                    gasSelection.toLowerCase() === 'hfc'
                      ? 'hfc-hfo'
                      : gasSelection.toLowerCase()
                  }`}
                >
                  <a className='btn'>Browse now</a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ApplicationPage;
export const getStaticPaths = async () => {
  const pathsData = await wp(APPLICATIONS_SLUGS);
  const paths = retrievePaths(pathsData, 'allApplication');

  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps = async (context) => {
  const aid = context.params.aid;

  if (
    aid === 'rd' ||
    aid === 'turnkey-installation' ||
    aid === 'system-design'
  ) {
    return {
      notFound: true,
    };
  }
  const response = await wp(APPLICATION_SINGLE, { variables: { id: aid } });

  const application = response.application;
  const references = await getReferencesByApplication(aid);
  const solutions = await getSolutions();
  const gases = await getGases();
  const detectorGases = await getDetectorGases();

  return {
    props: { application, references, solutions, gases, detectorGases },
  };
};
