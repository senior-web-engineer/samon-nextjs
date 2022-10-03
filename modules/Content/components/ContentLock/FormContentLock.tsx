import { useEffect, useState } from 'react';

import Button from '@common/ui/Buttons/Button';
import Hero from '@common/sections/Hero';
import expirePlugin from 'store/plugins/expire';
import { flattenObject } from '@utils/helpers';
import store from 'store';
import { useRouter } from 'next/router';

store.addPlugin(expirePlugin);
const FormContentLock = ({ post }) => {
  const router = useRouter();
  const flatPost = flattenObject(post);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [company, setCompany] = useState('');
  const [existingCustomer, setExistingCustomer] = useState('');
  const [interestedInProducts, setInterestedInProducts] = useState('');
  const [interestedInApplications, setInterestedInApplications] = useState('');
  const [error, setError] = useState('');
  const category = router.asPath.split('/')[1];

  const [isSubmitted, setIsSubmitted] = useState(
    store.get(`unlocked:${category}`) || false
  );
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!firstName) {
      setError('Please fill in your first name');
      setIsLoading(false);
      return;
    }
    if (!lastName) {
      setError('Please fill in your last name');
      setIsLoading(false);
      return;
    }
    if (!email) {
      setError('Please fill in your email');
      setIsLoading(false);
      return;
    }
    if (!country) {
      setError('Please fill in the country fields');
      setIsLoading(false);
      return;
    }
    if (!existingCustomer) {
      setError("Please enter if you're an exisiting customer");
      setIsLoading(false);
      return;
    }
    if (!interestedInProducts) {
      setError("Please fill in if you're interested in Samon products");
      setIsLoading(false);
      return;
    }
    if (!interestedInApplications) {
      setError('Please check the application that interesests you');
      setIsLoading(false);
      return;
    }
    if (
      firstName &&
      lastName &&
      email &&
      country &&
      existingCustomer &&
      interestedInApplications &&
      interestedInProducts
    ) {
      //Fake api request
      await new Promise((resolve) => setTimeout(resolve, 500));
      //
      const ob = {
        name: {
          first: firstName,
          last: lastName,
        },
        email,
        country,
        company,
        existingCustomer,
        interestedInProducts,
        interestedInApplications,
      };
      const res = await fetch('/api/mail/content-access', {
        method: 'POST',
        body: JSON.stringify(ob),
      });
      store.set(`unlocked:${category}`, true, new Date().getTime() + 1800000);
      setIsSubmitted(true);
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className='px-10 py-20 mb-20 rounded bg-brand-gray contain'>
        <div className='text-center '>
          <h2 className=''>
            Download {flatPost.title}{' '}
            {flatPost['contentFields.settings.type.name']}
          </h2>
        </div>
        <div className='mt-10'>
          {!isSubmitted ? (
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className='grid gap-10 md:grid-cols-2'>
                <div className='space-y-4'>
                  <h3 className='mb-5 '>Contact information</h3>
                  <div className='input-group'>
                    <input
                      type='text'
                      placeholder='First name *'
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className='input-group'>
                    <input
                      type='text'
                      placeholder='Last name *'
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className='input-group'>
                    <input
                      type='email'
                      placeholder='Email *'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className='input-group'>
                    <input
                      type='text'
                      placeholder='Country *'
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                  <div className='input-group'>
                    <input
                      type='text'
                      placeholder='Company'
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                </div>
                <div className='space-y-8'>
                  <div className='options-group'>
                    <h3>Are you an existing customer?</h3>
                    <span className='radio-group'>
                      <input
                        type='radio'
                        name='existing-customer'
                        value='yes'
                        onChange={(e) => setExistingCustomer(e.target.value)}
                      />
                      <label htmlFor='yes'>Yes</label>
                    </span>
                    <span className='radio-group'>
                      <input
                        type='radio'
                        name='existing-customer'
                        value='no'
                        onChange={(e) => setExistingCustomer(e.target.value)}
                      />
                      <label htmlFor='no'>No</label>
                    </span>
                  </div>
                  <div className='options-group'>
                    <h3>Are you interested in Samon products?</h3>
                    <span className='radio-group'>
                      <input
                        type='radio'
                        name='products-interested'
                        value='yes'
                        onChange={(e) =>
                          setInterestedInProducts(e.target.value)
                        }
                      />
                      <label htmlFor='yes'>Yes</label>
                    </span>
                    <span className='radio-group'>
                      <input
                        type='radio'
                        name='products-interested'
                        value='no'
                        onChange={(e) =>
                          setInterestedInProducts(e.target.value)
                        }
                      />
                      <label htmlFor='no'>No</label>
                    </span>
                  </div>
                  <div className='options-group'>
                    <h3>What application interests you?</h3>
                    <span className='radio-group'>
                      <input
                        type='radio'
                        name='application-interested'
                        value='commercial-refrigeration'
                        onChange={(e) =>
                          setInterestedInApplications(e.target.value)
                        }
                      />
                      <label htmlFor='commercial-refrigeration'>
                        Commercial refrigeration
                      </label>
                    </span>
                    <span className='radio-group'>
                      <input
                        type='radio'
                        name='application-interested'
                        value='marine'
                        onChange={(e) =>
                          setInterestedInApplications(e.target.value)
                        }
                      />
                      <label htmlFor='marine'>Marine</label>
                    </span>
                    <span className='radio-group'>
                      <input
                        type='radio'
                        name='application-interested'
                        value='hvac'
                        onChange={(e) =>
                          setInterestedInApplications(e.target.value)
                        }
                      />
                      <label htmlFor='hvac'>HVAC</label>
                    </span>
                    <span className='radio-group'>
                      <input
                        type='radio'
                        name='application-interested'
                        value='industrial-refrigeration'
                        onChange={(e) =>
                          setInterestedInApplications(e.target.value)
                        }
                      />
                      <label htmlFor='industrial-refrigeration'>
                        Industrial refrigeration
                      </label>
                    </span>
                  </div>
                </div>
              </div>
              <div className='pt-5 font-bold text-center text-red-500 color'>
                {error}
              </div>
              <div className='flex flex-col justify-center mt-5 text-center'>
                <div className='mb-5'>
                  <p className='max-w-4xl mx-auto text-xs leading-relaxed'>
                    Samon needs the contact information you provide to us to
                    contact you about our products and services. You may
                    unsubscribe from these communications at anytime. For
                    information on how to unsubscribe, as well as our privacy
                    practices and commitment to protecting your privacy, check
                    out our Privacy Policy. By clicking submit below, you
                    consent to allow Samon to store and process the personal
                    information submitted above to provide you the content
                    requested.
                  </p>
                </div>

                <Button type='submit'>
                  {isLoading ? 'Sending' : 'Download'}
                </Button>
              </div>
            </form>
          ) : (
            <ul className='space-y-3'>
              {post.contentFields.files.map((file) => (
                <li key={file.name}>
                  <a
                    className='flex flex-col items-center justify-between w-full px-3 py-2 font-bold border-2 border-black rounded md:px-5 md:py-3 md:flex-row'
                    href={file.file.mediaItemUrl}
                    target='_blank'
                    download
                    rel='noopener noreferrer'
                  >
                    <p className='mb-3 md:mb-0'>{file.name}</p>
                    <Button icon>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        className='w-6 h-6 text-white fill-current'
                      >
                        <g>
                          <rect fill='none' height='24' width='24' />
                        </g>
                        <g>
                          <path d='M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M17,11l-1.41-1.41L13,12.17V4h-2v8.17L8.41,9.59L7,11l5,5 L17,11z' />
                        </g>
                      </svg>
                      <p>Download</p>
                    </Button>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
export default FormContentLock;
