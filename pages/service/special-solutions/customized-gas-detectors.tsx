import { AnimatePresence, motion } from 'framer-motion';
import { Fragment, useContext, useEffect, useState } from 'react';

import Content from '@modules/Blocks/Content';
import Hero from '@common/sections/Hero';
import Image from 'next/image';
import Intro from '@common/sections/Intro';
import Link from 'next/link';
import { LocationContext } from '@modules/Location/LocationContext';
import { NextSeo } from 'next-seo';
import getPage from '@lib/page/getPage';
import parse from 'html-react-parser';
import sendMail from '@lib/mail/sendMail';
import slug from 'slug';
import wp from '@lib/wp/wp';

export const getStaticProps = async (context) => {
  const response = await wp(`
query allGases {
  allGas(first:1000) {
    edges {
      node {
        title
        menuOrder
        gqlGasFields {
          category
        }
      }
    }
  }
}
`);
  const gases = response.allGas.edges.map(({ node }) => {
    return {
      title: node.title,
      menuOrder: node.menuOrder,
      category: node.gqlGasFields.category,
    };
  });
  const gasCategories = gases.map(({ category }) => category);
  let uniqGasCategories = [];
  gasCategories.forEach((cat) => {
    if (!uniqGasCategories.includes(cat)) {
      uniqGasCategories.push(cat);
    }
  });
  const page = await getPage(
    `service/special-solutions/customized-gas-detectors`
  );

  return {
    props: {
      gases,
      gasCategories: uniqGasCategories,
      page,
    },
  };
};

interface CustomizedGastDetectorsProps {
  gases: any[];
  gasCategories: any[];
  page: any;
}

const CustomizedGastDetectors = ({
  gases,
  gasCategories,
  page,
}: CustomizedGastDetectorsProps) => {
  const { intro, layout } = page.gqlPageFields;
  const [gas, setGas] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  useEffect(() => {
    if (formVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [formVisible]);
  const handleOnClick = (gas: string) => {
    setGas(gas);
    setFormVisible(true);
  };

  return (
    <>
      <NextSeo title={`Cutomized Gas Detectors - Service`} />
      <Hero />
      <Intro heading={page.title} body={intro} />
      <Content sections={layout} />

      <div className='grid gap-10 mt-20 md:gap-20 md:grid-cols-2 contain'>
        {gasCategories.map((cat) => {
          return (
            <div key={cat}>
              <h3>{cat}</h3>
              <ul className='flex flex-wrap mt-5'>
                {gases
                  .filter((gas) => gas.category === cat)
                  .sort((a, b) => a.menuOrder - b.menuOrder)
                  .map((gas) => (
                    <li className='mb-2 mr-2 ' key={gas.title}>
                      <button
                        onClick={() => handleOnClick(gas.title)}
                        className='block px-3 py-1 text-black rounded-full hover:bg-brand-red hover:text-white bg-black/10'
                      >
                        {gas.title}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          );
        })}
      </div>
      <AnimatePresence>
        {formVisible ? (
          <CustomizedGasForm
            gas={gas}
            open={formVisible}
            close={setFormVisible}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default CustomizedGastDetectors;

const CustomizedGasForm = ({ gas, open, close }) => {
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState('init');
  const [error, setError] = useState('');
  const [numOfDetectors, setNumOfDetectors] = useState('');
  const [environment, setEnvironment] = useState('');
  const [other, setOther] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const location = useContext(LocationContext);
  const onSubmit = async (event) => {
    event.preventDefault();
    if (!gas) {
      setError('No gas value provided, something went wrong.');
      return;
    }
    if (!email) {
      setError('Please enter your email');
      return;
    }
    if (!phone) {
      setError('Please enter your phone number');
      return;
    }
    if (!output) {
      setError('Please provide us with an output format.');
      return;
    }
    if (!numOfDetectors) {
      setError('Please provide number of detectors.');
      return;
    }
    if (!environment) {
      setError('Please provide the environment for detector.');
      return;
    }
    setError('');
    setStatus('loading');
    const mail = await sendMail(
      `New request: Customized Gas Detecotr [${gas}]`,
      {
        gas,
        output,
        numOfDetectors,
        environment,
        other,
        email,
        phone,
        location,
      }
    );
    if (mail.statusCode !== 202) {
      setError(
        'Something went wrong, please try again or contact us directly.'
      );
      setStatus('idle');
    }
    setStatus('success');
  };

  return (
    <Fragment key='CustomizedGastForm'>
      <motion.div
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key='gas-overlay'
        className='fixed top-0 left-0 z-[9998] w-screen h-screen bg-black/50'
        onClick={() => close(!true)}
      />
      <motion.div
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key='gas-form'
        className='fixed z-[9999] w-[90%] text-xs md:text-base md:w-full max-w-2xl p-5 -translate-x-1/2 -translate-y-1/2 bg-white rounded md:p-10 top-1/2 left-1/2'
      >
        <button
          onClick={() => close(!true)}
          className='absolute flex items-center justify-center w-10 h-10 p-2 bg-black rounded-full -top-4 -right-4'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-full h-full text-white fill-current'
            viewBox='0 0 24 24'
          >
            <path d='M0 0h24v24H0V0z' fill='none' />
            <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' />
          </svg>
        </button>
        {status !== 'success' ? (
          <>
            <div className=''>
              <h3 className='text-base md:text-xl'>
                Request a customized{' '}
                <strong className='underline'>{gas}</strong> detector
              </h3>
              <p className='mt-4'>
                Fill in the form and send us your request for a customized gas
                detector. We will reach out to you as soon as possible.
              </p>
            </div>
            <h4 className='mt-2 text-sm md:text-base md:mt-10'>
              Fill in the form.
            </h4>
            <form onSubmit={(e) => onSubmit(e)} className='mt-3 space-y-5'>
              <div className='grid grid-cols-2 gap-5'>
                <div className='input-group'>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type='email'
                    placeholder='Email'
                  />
                </div>
                <div className='input-group'>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type='text'
                    placeholder='Phone'
                  />
                </div>
              </div>
              <div className='grid gap-5 md:grid-cols-2'>
                <div className='input-group'>
                  <input
                    value={output}
                    onChange={(e) => setOutput(e.target.value)}
                    type='text'
                    placeholder='Output format'
                  />
                </div>
                <div className='input-group'>
                  <input
                    value={numOfDetectors}
                    onChange={(e) => setNumOfDetectors(e.target.value)}
                    type='text'
                    placeholder='Number of detectors'
                  />
                </div>
              </div>

              <div className='grid gap-5'>
                <div className='input-group'>
                  <input
                    value={environment}
                    onChange={(e) => setEnvironment(e.target.value)}
                    type='text'
                    placeholder='Environment'
                  />
                </div>
                <div className='input-group'>
                  <textarea
                    value={other}
                    onChange={(e) => setOther(e.target.value)}
                    placeholder='Other requirements'
                  />
                </div>
              </div>
              <div className='text-center text-brand-red'>
                <p>{error}</p>
              </div>
              <div className='flex justify-center pt-0'>
                <button
                  disabled={status === 'init' ? false : true}
                  type='submit'
                  className='w-[85%] py-4 btn'
                >
                  {status === 'loading' ? 'Sending...' : 'Send your request'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div>
            <h3 className='text-base md:text-xl'>
              We have recieved your request
            </h3>
            <p>
              Thank you for submitting inquiry for a customized gas detector. We
              will get in touch with you as soon as possible.
            </p>
          </div>
        )}
      </motion.div>
    </Fragment>
  );
};
