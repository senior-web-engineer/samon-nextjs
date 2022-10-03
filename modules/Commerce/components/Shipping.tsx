import { useContext, useState } from 'react';

import CheckoutContext from '../context/CheckoutContext';
import ErrorMessage from './ErrorMessage';
import { countries } from '@data/countries';

const Shipping = () => {
  const { step, shipping, billing } = useContext(CheckoutContext);

  const [countryQuery, setCountryQuery] = useState(
    shipping.data.country.name || billing.data.country.name || ''
  );
  const [isValidCountry, setIsValidCountry] = useState(false);
  const handleCountryChange = (value) => {
    const country: any = countries.find(
      (country) => country.name.toLowerCase() === value.toLowerCase()
    );
    if (country) {
      setIsValidCountry(true);
      shipping.update('country', country);
    } else {
      setIsValidCountry(false);
    }
    setCountryQuery(value);
  };
  return (
    <>
      {billing.completed && (
        <div className='p-6 bg-brand-gray'>
          {shipping.editing ? (
            <>
              <div>
                <h2 className='mb-5 text-lg'>Shipping information</h2>
                <div className='space-y-5'>
                  <div className='grid gap-5 lg:grid-cols-[1fr,1fr]'>
                    <div className='input-group'>
                      <input
                        value={shipping.data.first_name}
                        onChange={(e) =>
                          shipping.update('first_name', e.target.value)
                        }
                        type='text'
                        placeholder='First name'
                      />
                    </div>
                    <div className='input-group'>
                      <input
                        value={shipping.data.last_name}
                        onChange={(e) =>
                          shipping.update('last_name', e.target.value)
                        }
                        type='text'
                        placeholder='Last name'
                      />
                    </div>
                  </div>
                  <div className='grid gap-5 lg:grid-cols-[1fr,1fr,1fr]'>
                    <div className='input-group'>
                      <input
                        value={shipping.data.address_1}
                        onChange={(e) =>
                          shipping.update('address_1', e.target.value)
                        }
                        type='text'
                        placeholder='Shipping address'
                      />
                    </div>
                    <div className='input-group'>
                      <input
                        value={shipping.data.city}
                        onChange={(e) =>
                          shipping.update('city', e.target.value)
                        }
                        type='text'
                        placeholder='City'
                      />
                    </div>
                    <div className='input-group'>
                      <input
                        value={shipping.data.state}
                        onChange={(e) =>
                          shipping.update('state', e.target.value)
                        }
                        type='text'
                        placeholder='State'
                      />
                    </div>
                  </div>
                  <div className='grid gap-5 lg:grid-cols-[1fr,1fr]'>
                    <div className='input-group'>
                      <input
                        value={shipping.data.postcode}
                        onChange={(e) =>
                          shipping.update('postcode', e.target.value)
                        }
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
                </div>
              </div>
              <ErrorMessage />
              <div className='mt-10 space-y-3'>
                <button
                  onClick={(ev) => shipping.continue(ev)}
                  className='w-full py-4 btn'
                >
                  Continue
                </button>
              </div>
            </>
          ) : (
            <div>
              <div className='flex items-center justify-between mb-5'>
                <h2 className='text-lg '>Shipping information</h2>
                <button onClick={(ev) => shipping.edit(ev)}>Edit</button>
              </div>
              <div className='grid grid-cols-2 gap-10'>
                <ul>
                  <li className='flex items-center justify-between'>
                    <p className='flex flex-col'>{shipping.data.address_1}</p>
                  </li>
                  <li className='flex items-center justify-between'>
                    <p className='flex flex-col'>{`${shipping.data.postcode}, ${shipping.data.city}`}</p>
                  </li>
                  <li className='flex items-center justify-between'>
                    <p className='flex flex-col'>{`${shipping.data.state}, ${shipping.data.country.name}`}</p>
                  </li>
                </ul>
                <ul>
                  <li className='flex items-center justify-between'>
                    <p className='flex flex-col'>{`${shipping.data.first_name} ${shipping.data.last_name}`}</p>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default Shipping;
