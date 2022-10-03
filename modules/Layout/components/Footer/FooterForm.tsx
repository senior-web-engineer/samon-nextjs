import { useContext, useEffect, useState } from 'react';

import Button from '@common/ui/Buttons/Button';
import FloatContext from '@modules/Layout/context/FloatContext';
import { LocationContext } from '@modules/Location/LocationContext';
import sendMail from '@lib/mail/sendMail';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';

const FooterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const location = useContext(LocationContext);

  const { inView, ref } = useInView();
  const { toggleFloater } = useContext(FloatContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && phone) {
      setIsLoading(true);
      const mailRes = await sendMail(
        `New lead for Samon`,
        {
          email: email,
          phone: phone,
          message: message,
          location,
        },
        null
      );
      if (mailRes.statusCode === 202) {
        setIsSubmitted(true);
        setEmail('');
        setPhone('');
        setMessage('');
      }
      //('MAIL RESPONSE =>', mailRes);

      setIsLoading(false);
    }
  };
  useEffect(() => {
    toggleFloater(!inView);
  }, [inView]);

  useEffect(() => {
    setIsSubmitted(false);
  }, [router.asPath]);
  if (!isSubmitted) {
    return (
      <form
        ref={ref}
        className='grid max-w-3xl gap-5 mx-auto mt-5 md:grid-cols-[2fr,1fr]'
        onSubmit={(e) => handleSubmit(e)}
      >
        <div>
          <div className='grid grid-cols-2 gap-5'>
            <div className='input-group'>
              <input
                type='email'
                placeholder='E-mail'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className='input-group'>
              <input
                type='phone'
                placeholder='Phone'
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </div>
          </div>
          <div>
            <div className='input-group'>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Message'
              />
            </div>
          </div>
        </div>
        <div>
          <Button type='submit'>
            {isLoading ? 'Sending' : 'Get in touch'}
          </Button>
        </div>
      </form>
    );
  } else {
    return (
      <div className='mt-10'>
        <strong>
          Thank you for your message, we will get back to you shortly.
        </strong>
      </div>
    );
  }
};
export default FooterForm;
