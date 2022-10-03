import { AnimatePresence, motion } from 'framer-motion';
import {
  fetchAllSpareParts,
  retrieveModelNumbersFromProducts,
} from '@lib/fetch/spareParts';
import { useContext, useEffect, useState } from 'react';

import AddToCartButton from '@modules/Commerce/components/AddToCardButton';
import BookAService from '@modules/Blocks/BookAService';
import CartContext from '@modules/Commerce/context/CartContext';
import Content from '@modules/Blocks/Content';
import Hero from '@common/sections/Hero';
import Image from 'next/image';
import Intro from '@common/sections/Intro';
import Link from 'next/link';
import { LocationContext } from '@modules/Location/LocationContext';
import { NextSeo } from 'next-seo';
import PreviewProductContext from '@modules/Commerce/context/PreviewProductContext';
import RelatedProducts from '@modules/Commerce/components/Product/RelatedProducts';
import getAccessories from '@lib/commerce/products/getAccessories';
import getPage from '@lib/page/getPage';
import getProducts from '@lib/fetch/getProducts';
import parse from 'html-react-parser';
import sendMail from '@lib/mail/sendMail';
import { useRouter } from 'next/dist/client/router';

const Page = ({ spareParts, modelNumbers, products, accessories, page }) => {
  const { togglePreview } = useContext(PreviewProductContext);
  const router = useRouter();
  const { addToCart } = useContext(CartContext);
  const query = JSON.stringify(router.query);
  const { modelNum } = JSON.parse(query);
  const [modelNumInput, setModelNumInput] = useState(modelNum || '');
  const [openBookService, setOpenBookService] = useState(false);

  const acf = page.gqlPageFields;
  useEffect(() => {
    if (modelNum) {
      setModelNumInput(modelNum.toLowerCase());

      let container = document.getElementById('spare-parts');

      container &&
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [modelNum]);
  const matchingParts = spareParts.filter((x) => {
    let match = false;

    if (!x.attributes) {
      return match;
    }
    x.attributes.edges.forEach(({ node }) => {
      if (node.options.includes(modelNumInput)) {
        match = true;
      }
    });
    return match;
  });
  const matchingProduct = products.filter((x) => {
    return x?.sku?.toLowerCase() === modelNumInput?.toLowerCase();
  });
  const productAccessories = accessories.filter((accessory) => {
    if (matchingProduct.length > 0 && matchingProduct[0]?.attributes?.edges) {
      for (let attrEdge of matchingProduct[0].attributes.edges) {
        let attr = attrEdge.node;
        if (attr.label === 'Accessories') {
          if (attr.options.includes(accessory.sku)) {
            return true;
          }
        }
      }
    }
    return false;
  });
  return (
    <>
      <NextSeo title={page.seo.title} description={page.seo.metaDesc} />
      <Hero />
      <Intro
        heading={page.title}
        body='Include all segments using large cooling systems for food preservation, dairy, butchers, healthcare, manufacturing companies and ice rinks.'
      />
      <Content sections={acf.layout} />
      <div className='bg-brand-gray'>
        <div
          id='spare-parts'
          className='grid gap-20 lg:grid-cols-2 contain row'
        >
          <div>
            <h2 className='mb-5'>Find your spare part</h2>
            <p className='mb-3'>
              Enter your model number and find the right spare part for you
              unit.
            </p>
            <p>You can find your model number on the back of your device.</p>
            <form className='mt-10 '>
              <input
                type='text'
                placeholder='Enter your model number'
                className='py-3 font-bold !placeholder-black/30 border-b-2 border-black'
                list='modelNumbers'
                value={modelNumInput}
                onChange={(e) => setModelNumInput(e.target.value)}
              />
              <datalist id='modelNumbers' className='uppercase'>
                {modelNumbers.map((num) => (
                  <option key={num} value={num} />
                ))}
              </datalist>
            </form>
            {matchingProduct.length > 0 && (
              <div className='mt-10 border-black/10 bg-white p-3 grid gap-5 grid-cols-[1fr,2fr]'>
                <figure className='bg-white aspect-w-1 aspect-h-1'>
                  {matchingProduct[0]?.image?.mediaItemUrl && (
                    <Image
                      src={matchingProduct[0].image.mediaItemUrl}
                      layout='fill'
                      objectFit='contain'
                      alt={`Product image for ${matchingProduct[0].name}`}
                    />
                  )}
                </figure>
                <div className='flex flex-col items-start justify-center'>
                  <h3 className='text-lg '>{matchingProduct[0].name}</h3>
                  <p className='mb-3 text-brand-darkgray'>
                    {matchingProduct[0]?.sku}
                  </p>
                  <p className='text-sm'>
                    {parse(matchingProduct[0]?.shortDescription)}
                  </p>
                  <button onClick={() => togglePreview(matchingProduct[0])}>
                    View product
                  </button>
                </div>
              </div>
            )}
          </div>
          <div>
            {matchingParts.length > 0 ? (
              <>
                <h2 className='mb-10'>
                  Spare parts for{' '}
                  <span className='inline-block px-2 py-1 text-lg uppercase align-middle rounded-full bg-black/10'>
                    {modelNumInput}
                  </span>
                </h2>
                <ul className='space-y-5'>
                  {matchingParts.map((part) => {
                    return (
                      <li
                        className='grid gap-5 grid-cols-[100px,1fr]'
                        key={part.id}
                      >
                        <figure className='relative aspect-w-1 aspect-h-1'>
                          {part?.image?.mediaItemUrl && (
                            <Image
                              src={part.image.mediaItemUrl}
                              layout='fill'
                              objectFit='cover'
                              alt={part.name}
                            />
                          )}
                        </figure>
                        <div>
                          <h3>{part.name}</h3>
                          <div className='text-xs lg:text-sm'>
                            {part.shortDescription &&
                              parse(part.shortDescription)}
                          </div>
                          <p className='mt-3'>${part.price}</p>
                          <AddToCartButton
                            item={{
                              ...part,
                              image: part?.image?.mediaItemUrl || part?.image,
                            }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              matchingParts.length === 0 &&
              modelNumInput !== '' && (
                <div>
                  No matching parts for {modelNumInput}. Please contact
                  order@samon.se for further help.
                </div>
              )
            )}
          </div>
        </div>
      </div>
      {productAccessories?.length > 0 && (
        <RelatedProducts
          product={matchingProduct.length > 0 ? matchingProduct[0] : []}
          accessories={productAccessories}
        />
      )}
      <div className='text-center text-white bg-brand-red'>
        <div className='py-20 contain'>
          <h2 className='text-3xl'>
            Do you want to be sure you meet the regulations? Let us help you.
          </h2>
          <p>Book service directly from us or through our distributors.</p>
          <div className='grid max-w-md gap-10 mx-auto mt-10 md:grid-cols-2'>
            <div>
              <strong className='block'>Sweden</strong>
              <button
                onClick={() => setOpenBookService(true)}
                className='inline-block px-10 mt-3 border-2 border-white btn'
              >
                Book
              </button>
            </div>
            <div>
              <strong className='block'>Other countries</strong>
              <Link href={'/distributors'}>
                <a className='inline-block px-10 mt-3 border-2 border-white btn'>
                  Distributors
                </a>
              </Link>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {openBookService && <BookServiceForm hide={setOpenBookService} />}
        </AnimatePresence>
      </div>
    </>
  );
};
export default Page;

export const getStaticProps = async () => {
  const products = await getProducts();
  const accessories = await getAccessories();
  const spareParts = await fetchAllSpareParts();
  const modelNumbers = retrieveModelNumbersFromProducts(products);
  const page = await getPage('service/spare-parts');

  return {
    props: { spareParts, modelNumbers, products, page, accessories },
  };
};

const BookServiceForm = ({ hide }) => {
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const location = useContext(LocationContext);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!phone || !email) {
      setError('Please fill in all fields');
      return;
    } else {
      setLoading(true);
      setError('');

      const mailRes = await sendMail(
        `Book a service`,
        {
          phone,
          email,
          message,
          location,
        },
        'service@samon.se'
      );
      if (mailRes.statusCode === 202) {
        setFinished(true);
        setLoading(false);
      } else {
        setError('Something went wrong, please try again or contact us.');
        setFinished(false);
        setLoading(false);
      }
    }
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed top-0 left-0 z-40 w-screen h-screen bg-black/50'
        onClick={() => hide(false)}
      />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className='fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen text-black pointer-events-none'
      >
        <motion.div className='relative flex flex-col justify-center w-full max-w-lg p-10 mx-5 text-center bg-white rounded-lg shadow-lg pointer-events-auto'>
          {finished ? (
            <div className='flex flex-col items-center justify-center'>
              <span className='block p-3 rounded-full bg-brand-red'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5 text-white fill-current'
                  viewBox='0 0 24 24'
                >
                  <path d='M0 0h24v24H0V0z' fill='none' />
                  <path d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z' />
                </svg>
              </span>
              <p className='mt-5'>
                All done! We will get in touch with you as soon as possible.
              </p>
              <button className='mt-10 btn' onClick={() => hide(false)}>
                Close
              </button>
            </div>
          ) : loading ? (
            <div className='flex flex-col items-center justify-center'>
              <span className='block border-4 rounded-full border-brand-gray w-14 h-14 border-t-brand-red animate-spin' />
              <p className='mt-5'>Submitting your request</p>
            </div>
          ) : (
            <>
              <h3>Book service</h3>
              <p>
                Book service directly through Samon. We will contact you with
                further information.
              </p>
              <form onSubmit={(event) => handleSubmit(event)}>
                <div className='grid grid-cols-2 gap-5 my-10'>
                  <div className='input-group'>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type='phone'
                      placeholder='Phone'
                    />
                  </div>
                  <div className='input-group'>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type='email'
                      placeholder='Email'
                    />
                  </div>
                  <div className='col-span-2 input-group'>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder='Message'
                      className='w-full h-full outline-none'
                    />
                  </div>
                </div>
                {error && <p className='py-2 text-brand-red'>{error}</p>}
                <div className='flex flex-col justify-center'>
                  <button type='submit' className='btn'>
                    Submit
                  </button>
                  <small className='mt-3'>
                    By pressing submit you accept our terms and conditions
                  </small>
                </div>
              </form>
            </>
          )}
          <button
            onClick={() => hide(false)}
            className='absolute p-3 bg-black rounded-full shadow -top-3 -right-3'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 text-white fill-current'
              viewBox='0 0 24 24'
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </>
  );
};
