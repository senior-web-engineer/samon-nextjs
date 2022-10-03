import { Combobox, Listbox } from '@headlessui/react';
import { useContext, useEffect, useState } from 'react';

import CheckoutContext from '../context/CheckoutContext';
import ErrorMessage from './ErrorMessage';
import { countries } from '@data/countries';

const Billing = () => {
  const { billing } = useContext(CheckoutContext);
  const [countryQuery, setCountryQuery] = useState(
    billing.data.country.name || ''
  );
  const [isValidCountry, setIsValidCountry] = useState(false);
  const handleCountryChange = (value) => {

    const country: any = countries.find(
      (country) => country.name.toLowerCase() === value.toLowerCase()
    );
    if (country) {
      setIsValidCountry(true);
      billing.update('country', country);
    } else {
      setIsValidCountry(false);
    }
    setCountryQuery(value);
  };

  return (
    <div className='p-6 bg-brand-gray'>
      {billing.editing ? (
        <>
          <div>
            <h2 className='mb-5 text-lg'>Billing information</h2>
            <div className='space-y-5'>
              <div className='grid gap-5 lg:grid-cols-[2fr,1fr]'>
                <div className='input-group'>
                  <input
                    value={billing.data.company}
                    onChange={(e) => billing.update('company', e.target.value)}
                    type='text'
                    placeholder='Company'
                  />
                </div>
                <div className='input-group'>
                  <input
                    value={billing.data.vatNum}
                    onChange={(e) => billing.update('vatNum', e.target.value)}
                    type='text'
                    placeholder='VAT number'
                  />
                </div>
              </div>
              <div className='grid gap-5 lg:grid-cols-[1fr,1fr]'>
                <div className='input-group'>
                  <input
                    value={billing.data.first_name}
                    onChange={(e) =>
                      billing.update('first_name', e.target.value)
                    }
                    type='text'
                    placeholder='First name'
                  />
                </div>
                <div className='input-group'>
                  <input
                    value={billing.data.last_name}
                    onChange={(e) =>
                      billing.update('last_name', e.target.value)
                    }
                    type='text'
                    placeholder='Last name'
                  />
                </div>
              </div>
              <div className='grid gap-5 lg:grid-cols-[1fr,1fr]'>
                <div className='input-group'>
                  <input
                    value={billing.data.email}
                    onChange={(e) => billing.update('email', e.target.value)}
                    type='email'
                    placeholder='Email'
                  />
                </div>
                <div className='input-group'>
                  <input
                    value={billing.data.phone}
                    onChange={(e) => billing.update('phone', e.target.value)}
                    type='phone'
                    placeholder='Phone number'
                  />
                </div>
              </div>
              <div className='grid gap-5 lg:grid-cols-[1fr,1fr,1fr]'>
                <div className='input-group'>
                  <input
                    value={billing.data.address_1}
                    onChange={(e) =>
                      billing.update('address_1', e.target.value)
                    }
                    type='text'
                    placeholder='Billing address'
                  />
                </div>
                <div className='input-group'>
                  <input
                    value={billing.data.city}
                    onChange={(e) => billing.update('city', e.target.value)}
                    type='text'
                    placeholder='City'
                  />
                </div>
                <div className='input-group'>
                  <input
                    value={billing.data.state}
                    onChange={(e) => billing.update('state', e.target.value)}
                    type='text'
                    placeholder='State'
                  />
                </div>
              </div>
              <div className='grid gap-5 lg:grid-cols-[1fr,1fr]'>
                <div className='input-group'>
                  <input
                    value={billing.data.postcode}
                    onChange={(e) => billing.update('postcode', e.target.value)}
                    type='text'
                    placeholder='Postal code'
                  />
                </div>
                <div>
                  <div className='w-full '>
                    <div className='flex items-center justify-between input-group'>
                      <input
                        onChange={(event) =>
                          handleCountryChange(event.target.value)
                        }
                        list='countries'
                        placeholder='Country'
                        value={countryQuery}
                        className='w-full bg-transparent outline-none'
                      />
                      {isValidCountry && (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='w-6 h-6 text-green-600 fill-current'
                          viewBox='0 0 24 24'
                        >
                          <path d='M0 0h24v24H0V0z' fill='none' />
                          <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z' />
                        </svg>
                      )}
                    </div>
                    <datalist id='countries'>
                      {countries
                        .filter((country) => {
                          if (countryQuery) {
                            return country.name
                              .toLowerCase()
                              .includes(countryQuery.toLowerCase())
                              ? true
                              : false;
                          } else {
                            return true;
                          }
                        })
                        .map((country) => (
                          <option key={country.code} value={country.name} />
                        ))}
                    </datalist>
                  </div>
                </div>
              </div>
              {billing.data.country.code !== 'SE' &&
                billing.data.country.code !== '' && (
                  <div>
                    <p className='p-4 text-sm bg-black/5'>
                      Since you are requesting a delivery outside of Sweden, you
                      will have to pay the invoice before material will be
                      dispatched. If you are an allready regristered customer
                      with agreements inplace, you can disregard this
                      information.{' '}
                    </p>
                  </div>
                )}
            </div>
          </div>
          <ErrorMessage />
          <div className='mt-10 space-y-3'>
            <button
              onClick={(ev) => billing.continue(ev)}
              className='w-full py-4 btn'
            >
              Continue
            </button>
          </div>
        </>
      ) : (
        <div>
          <div className='flex items-center justify-between mb-5'>
            <h2 className='text-lg '>Billing information</h2>
            <button onClick={(ev) => billing.edit(ev)}>Edit</button>
          </div>
          <div className='grid grid-cols-2 gap-10'>
            <ul>
              <li className='flex items-center justify-between'>
                <p className='flex flex-col'>{billing.data.company}</p>
              </li>
              <li className='flex items-center justify-between'>
                <p className='flex flex-col'>{billing.data.vatNum}</p>
              </li>
              <li className='flex items-center justify-between'>
                <p className='flex flex-col'>{billing.data.address_1}</p>
              </li>
              <li className='flex items-center justify-between'>
                <p className='flex flex-col'>{`${billing.data.postcode}, ${billing.data.city}`}</p>
              </li>
              <li className='flex items-center justify-between'>
                <p className='flex flex-col'>{`${billing.data.state}, ${billing.data.country.name}`}</p>
              </li>
            </ul>
            <ul>
              <li className='flex items-center justify-between'>
                <p className='flex flex-col'>{`${billing.data.first_name} ${billing.data.last_name}`}</p>
              </li>
              <li className='flex items-center justify-between'>
                <p className='flex flex-col'>{billing.data.email}</p>
              </li>
              <li className='flex items-center justify-between'>
                <p className='flex flex-col'>{billing.data.phone}</p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default Billing;
