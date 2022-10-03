import CartContext from '../context/CartContext';
import Image from 'next/image';
import Price from './Product/Price';
import SubmitOrder from './SubmitOrder';
import { useContext } from 'react';

const MinimalCart = () => {
  const { items, decrementQuantity, incrementQuantity } =
    useContext(CartContext);

  return (
    <div>
      <div>
        <ul className='bg-brand-gray'>
          <li className='p-5 border-b'>
            <h2 className='text-lg'>Your items</h2>
          </li>
          {items.map((item) => (
            <li key={item.id} className='grid gap-5 grid-cols-[46px,1fr] p-5'>
              <figure className='relative'>
                {item.image && (
                  <Image
                    src={item.image}
                    layout='fill'
                    objectFit='cover'
                    alt={`Product image for ${item.name}`}
                  />
                )}
              </figure>
              <div className='flex items-center justify-between'>
                <span>
                  {item.name} <br />
                  <small>
                    <Price price={item.price} />
                  </small>
                </span>{' '}
                <span className='flex items-center justify-between space-x-2'>
                  <button
                    className='text-black/20 hover:text-black/50'
                    onClick={() => decrementQuantity(item.id)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-5 h-5 fill-current'
                      viewBox='0 0 24 24'
                    >
                      <path d='M0 0h24v24H0V0z' fill='none' />
                      <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z' />
                    </svg>
                  </button>
                  <span>x{item.quantity}</span>
                  <button
                    className='text-black/20 hover:text-black/50'
                    onClick={() => incrementQuantity(item.id)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-5 h-5 fill-current'
                      viewBox='0 0 24 24'
                    >
                      <path d='M0 0h24v24H0V0z' fill='none' />
                      <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z' />
                    </svg>
                  </button>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <SubmitOrder />
    </div>
  );
};
export default MinimalCart;
