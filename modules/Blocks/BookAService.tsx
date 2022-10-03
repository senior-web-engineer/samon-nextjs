import { AnimatePresence, motion } from 'framer-motion';

import Link from 'next/link';
import { LocationContext } from '@modules/Location/LocationContext';
import sendMail from '@lib/mail/sendMail';
import { useContext } from 'react';
import { useState } from 'react';
import { useCookieConsentState } from '@lib/context/cookieConsent';
import { track_load } from '@lib/lf';

interface BookAServiceProps {
  data: any;
}

const BookAService = ({ data }: BookAServiceProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  //('BookAService =>', data);
  const cookieConsentState = useCookieConsentState()
  return (
    <>
      <div>
        <h3>Book service</h3>
        <p>Book service directly from us or through our distributors.</p>
        <div className='grid gap-5 mt-5 md:flex md:space-x-10'>
          <div>
            <h4>Sweden</h4>
            <button
              onClick={() => setModalOpen(true)}
              className='inline-block px-10 mt-3 btn'
            >
              Book
            </button>
          </div>
          <div className=''>
            <h4>Other countries</h4>
            <Link href='/distributors'>
              <a  onClick={() => cookieConsentState?.lf ? track_load(`http://www.leadforensics.com/distributors`, `Distributors`) : ''}  className='inline-block px-10 mt-3 btn'>Distributors</a>
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && <BookServiceForm hide={setModalOpen} />}
      </AnimatePresence>
    </>
  );
};

export default BookAService;
const BookServiceForm = ({ hide }) => {
  const location = useContext(LocationContext);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!phone || !email) {
      setError('Please fill in all fields');
      return;
    } else {
      setLoading(true);
      setFinished(false);
      setError('');

      const mailRes = await sendMail(
        `Book a service`,
        {
          location,
          phone,
          email,
          message,
        },
        'service@samon.se'
      );
      if (mailRes.statusCode === 202) {
        setLoading(false);
        setFinished(true);
      } else {
        setError('Something went wrong, please try again or contact us.');
        setLoading(false);
        setFinished(false);
      }
    }
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed left-0 z-40 w-screen h-screen -top-7 bg-black/50'
        onClick={() => hide(false)}
      />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className='fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen pointer-events-none'
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
