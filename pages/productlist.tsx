import { useContext, useEffect, useState } from 'react';

import AddToCartButton from '@modules/Commerce/components/AddToCardButton';
import Hero from '@common/sections/Hero';
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import Price from '@modules/Commerce/components/Product/Price';
import { WishlistContext } from '@modules/Wishlist/context/WishlistContext';
import sendMail from '@lib/mail/sendMail';

interface ProductListPageProps {}

const ProductListPage = ({}: ProductListPageProps) => {
  const wishlist = useContext(WishlistContext);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [csvFile, setCsvFile] = useState('');

  const generateCsv = () => {
    let csvContent = 'Model Number,Product,Categories,Price\r\n';
    const rows = wishlist.items;
    rows.forEach((rowData) => {
      let catStr = '';
      rowData?.productCategories?.edges?.forEach(({ node: cat }, i) => {
        if (i + 1 < rowData.productCategories.edges.length) {
          catStr += cat.name + ' > ';
        } else {
          catStr += cat.name;
        }
      });
      const row = `${rowData.sku},${rowData.name},${catStr},${
        '€' + rowData.price
      }`;
      csvContent += row + '\r\n';
    });

    const encodedString = Buffer.from(csvContent).toString('base64');
    setCsvFile(encodedString);
  };

  const handleEmailList = async () => {
    if (wishlist.items.length > 0 && email) {
      setStatus('sending');
      const mailRes = await sendMail(
        `Here's your product list from Samon`,
        {
          productlist: wishlist.items,
          attachments: [
            {
              content: csvFile,
              filename: 'samon-productlist.csv',
              type: 'text/csv',
              disposition: 'attachment',
            },
          ],
        },
        email
      );
      if (mailRes.statusCode === 202) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    }
  };
  useEffect(() => {
    generateCsv();
  }, [wishlist.items]);
  return (
    <>
      <NextSeo title={`Your product list`} />

      <Hero />
      <div className='grid md:grid-cols-[1fr,1fr] gap-10 contain row'>
        <div>
          <h1 className='mb-5'>Your product list</h1>
          <p>These are products {`you've`} added to your list.</p>
        </div>
        <div className='flex items-center justify-start md:justify-end'>
          {status === 'idle' && (
            <div className='grid w-full grid-cols-1 gap-5'>
              <strong>Send your list to an email</strong>

              <div className='flex items-center'>
                <div className='flex items-center w-full p-2 pl-4 border rounded'>
                  <input
                    type='email'
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    placeholder='Email'
                    className=''
                  />
                  <button
                    onClick={() => handleEmailList()}
                    className={`w-32 border-2 px-0 border-brand-red btn ${
                      wishlist.items.length > 0 && email
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-50 pointer-events-none'
                    }`}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
          {status === 'sending' && (
            <p className='flex items-center space-x-2'>
              <figure className='block w-6 h-6 border-4 rounded-full border-brand-red/40 border-t-brand-red animate-spin' />
              <span>Sending</span>
            </p>
          )}
          {status === 'error' && (
            <p>
              Something went wrong{' '}
              <button className='underline' onClick={() => setStatus('idle')}>
                Try again
              </button>
            </p>
          )}
          {status === 'success' && (
            <p>
              Productlist was sent to {email},{' '}
              <button className='underline' onClick={() => setStatus('idle')}>
                Send another
              </button>
            </p>
          )}
        </div>
      </div>
      {wishlist.items.length > 0 ? (
        <ul className='space-y-2 contain'>
          <li className='hidden md:grid rounded p-4 text-sm even:bg-brand-gray font-semibold grid-cols-[50px,2fr,1fr,2fr,2fr,30px] gap-10'>
            <div></div>
            <div>Product</div>
            <div>Unit price</div>
            <div>Category</div>
            <div>Sold through</div>
          </li>
          {wishlist.items.map((item) => {
            return (
              <li
                className='grid rounded relative p-4 text-sm even:bg-brand-gray md:grid-cols-[50px,2fr,1fr,2fr,2fr,30px] gap-2 md:gap-10'
                key={item.id}
              >
                <figure className='relative hidden md:block aspect-w-1 aspect-h-1 '>
                  {item?.image?.mediaItemUrl ? (
                    <Image
                      src={item?.image?.mediaItemUrl}
                      layout='fill'
                      objectFit='contain'
                      alt={item?.name}
                    />
                  ) : item?.featuredImage?.node?.mediaItemUrl ? (
                    <Image
                      src={item?.featuredImage?.node?.mediaItemUrl}
                      layout='fill'
                      objectFit='contain'
                      alt={item?.name}
                    />
                  ) : null}
                </figure>
                <div className='flex flex-col justify-center'>
                  <p className='text-base font-medium'>
                    {item.quantity || 1}x{' '}
                    <Link href={item.href}>
                      <a className='text-brand-red hover:underline'>
                        {item.name}
                      </a>
                    </Link>
                  </p>
                </div>
                <div className='flex items-center'>
                  <p>
                    <Price price={item.price} />
                  </p>
                </div>
                <div className='flex items-center space-x-2'>
                  {item?.productCategories?.edges?.map(({ node: cat }) => (
                    <>
                      <span key={cat?.name}>{cat?.name}</span>
                      <span className='opacity-50 last:hidden'>/</span>
                    </>
                  ))}
                </div>
                <div className='flex items-center'>
                  {item?.productFields?.information?.distributors?.length >
                  0 ? (
                    <p>
                      Distributor{' '}
                      {item.productFields.information.distributors[0].title}
                    </p>
                  ) : (
                    <div className='flex items-center space-x-5'>
                      <p>Samon</p>
                      <AddToCartButton
                        item={{
                          ...item,
                          image:
                            item?.image?.mediaItemUrl ||
                            item?.featuredImage?.node?.mediaItemUrl ||
                            '',
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className='absolute flex items-center justify-end -translate-y-1/2 top-1/2 right-4'>
                  <button
                    className='p-1 rounded-full md:relative text-brand-red bg-black/5 hover:bg-black/10'
                    onClick={() => wishlist.remove(item.databaseId)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6 h-6 text-black fill-current'
                      viewBox='0 0 24 24'
                    >
                      <path d='M0 0h24v24H0V0z' fill='none' />
                      <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' />
                    </svg>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className='contain'>
          <p>You {`don't`} currently have any products in your list.</p>
        </div>
      )}
    </>
  );
};

export default ProductListPage;
