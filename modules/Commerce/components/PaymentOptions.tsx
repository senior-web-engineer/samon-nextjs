import CheckoutContext from '../context/CheckoutContext';
import { useContext } from 'react';

const paymentOptions = [
  {
    label: 'Invoice',
    value: 'invoice',
    description: 'Far far away, behind the word mountains.',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        className='w-12 h-12 fill-current'
      >
        <path d='M0,0h24v24H0V0z' fill='none' />
        <g>
          <path d='M19.5,3.5L18,2l-1.5,1.5L15,2l-1.5,1.5L12,2l-1.5,1.5L9,2L7.5,3.5L6,2v14H3v3c0,1.66,1.34,3,3,3h12c1.66,0,3-1.34,3-3V2 L19.5,3.5z M15,20H6c-0.55,0-1-0.45-1-1v-1h10V20z M19,19c0,0.55-0.45,1-1,1s-1-0.45-1-1v-3H8V5h11V19z' />
          <rect height='2' width='6' x='9' y='7' />
          <rect height='2' width='2' x='16' y='7' />
          <rect height='2' width='6' x='9' y='10' />
          <rect height='2' width='2' x='16' y='10' />
        </g>
      </svg>
    ),
  },
];
export default function PaymentOptions() {
  const { step, paymentOptions, shipping } = useContext(CheckoutContext);
  return (
    <>
      {shipping.completed && paymentOptions.editing ? (
        <div className='p-6 bg-brand-gray'>
          <h2 className='mb-5 text-lg'>Payment</h2>
          <ul className='space-y-3'>
            {paymentOptions.options.map((option) => (
              <li
                key={option.value}
                onClick={() => paymentOptions.method.update(option)}
                className={`p-5  bg-white transition-all cursor-pointer  rounded  grid grid-cols-[34px,1fr,32px] gap-5`}
              >
                <div className='flex items-center'>{option.icon}</div>
                <div>
                  <strong>{option.label}</strong>
                  <p>{option.description}</p>
                </div>
                <div className='flex items-center'>
                  <figure
                    className={`w-8 h-8 border-2 rounded-full flex items-center justify-center border-black/20 ${
                      paymentOptions?.method?.selected?.value === option.value
                        ? 'border-brand-red/100 bg-brand-red'
                        : ''
                    }`}
                  >
                    {paymentOptions?.method?.selected?.value ===
                      option.value && (
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
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );

  return null;
}
