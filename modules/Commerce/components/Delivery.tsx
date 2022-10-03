import CheckoutContext from '../context/CheckoutContext';
import { useContext } from 'react';

interface DeliveryProps {}

const Delivery = ({}: DeliveryProps) => {
  const { delivery, shipping, paymentOptions } = useContext(CheckoutContext);

  return (
    <>
      {shipping.completed && (
        <div className='p-6 bg-brand-gray'>
          <h2 className='mb-5 text-lg'>Delivery</h2>
          <ul className='space-y-3'>
            {delivery?.options
              ?.filter((option) => {
                return option.availableForPaymentMethods.includes(
                  paymentOptions.method.selected.value
                )
                  ? true
                  : false;
              })
              .map((option) => {
                return (
                  <li
                    onClick={(ev) => delivery.update(option)}
                    className={`p-5 bg-white transition-all cursor-pointer  rounded  grid grid-cols-[34px,1fr,32px] gap-5 ${
                      delivery?.selected?.value == option.value
                        ? 'border-brand-red'
                        : ''
                    }`}
                    key={option.value}
                  >
                    <div className='flex items-center'>{option.icon}</div>
                    <div>
                      <strong>
                        {option.label}{' '}
                        {delivery?.cost ? `€${delivery.cost}` : null}
                      </strong>
                      <p>{option.description}</p>
                    </div>
                    <div className='flex items-center'>
                      <figure
                        className={`w-8 h-8 border-2 rounded-full flex items-center justify-center border-black/20 ${
                          delivery.selected?.value === option.value
                            ? 'border-brand-red/100 bg-brand-red'
                            : ''
                        }`}
                      >
                        {delivery?.selected?.value === option.value && (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 text-white fill-current'
                            viewBox='0 0 24 24'
                          >
                            <path d='M0 0h24v24H0V0z' fill='none' />
                            <path d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z' />
                          </svg>
                        )}
                      </figure>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </>
  );
};

export default Delivery;
